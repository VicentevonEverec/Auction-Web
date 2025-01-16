package auction.blockchain.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import auction.blockchain.dto.LoginDto;
import auction.blockchain.entities.User;
import auction.blockchain.service.IDatabaseService;
import auction.blockchain.service.IUserService;
import auction.blockchain.service.IWalletHistoryService;

@RestController
@RequestMapping("/api")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private IDatabaseService databaseService;

    @Autowired
    private IUserService userService;

    @Autowired
    private IWalletHistoryService walletHistoryService;

    @GetMapping("/health")
    public String checkHealth() {
        logger.info("Health check endpoint called.");
        return "La aplicación está en funcionamiento"; 
    }

    @PostMapping("/register")
    public ResponseEntity<String> agregarUsuario(@RequestBody User usuario) {
        logger.info("Iniciando el proceso de registro para el usuario: {}", usuario);

        // Convertimos la dirección de la cartera a minúsculas para asegurarnos de que no haya problemas
        usuario.setWalletAddress(usuario.getWalletAddress().toLowerCase());

        // Validamos los datos del usuario
        if (usuario.getName().isEmpty() || usuario.getSurname().isEmpty() || usuario.getDni().isEmpty() || usuario.getEmail().isEmpty() || usuario.getPassword().isEmpty()) {
            logger.warn("Faltan datos del usuario: {}", usuario);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Faltan datos del usuario");
        }

        // Comprobamos si el usuario ya está registrado
        if (databaseService.checkUser(usuario.getDni())) {
            logger.warn("El usuario con DNI {} ya está registrado.", usuario.getDni());
            return ResponseEntity.status(HttpStatus.CONFLICT).body("El usuario ya está registrado");
        }

        // Comprobamos si la dirección de la cartera está registrada
        if (databaseService.checkWalletAddress(usuario.getWalletAddress())) {
            logger.warn("La dirección de la cartera {} ya está registrada.", usuario.getWalletAddress());
            return ResponseEntity.status(HttpStatus.CONFLICT).body("La dirección de la cartera ya está registrada");
        }

        try {
            // Guardamos al usuario en la base de datos
            userService.guardarUsuario(usuario);
            logger.info("Usuario registrado con éxito: {}", usuario);
            return ResponseEntity.ok("Usuario registrado con éxito");
        } catch (Exception e) {
            logger.error("Error al registrar el usuario: {}", usuario, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al registrar el usuario");
        }
    }

    @GetMapping("recover-user-data/{walletAddress}")
    public ResponseEntity<String> recuperarDatosUsuario(@PathVariable String walletAddress) {
        logger.info("Buscando usuario con la dirección de cartera: {}", walletAddress);

        // Convertimos la dirección de la cartera a minúsculas
        walletAddress = walletAddress.toLowerCase();

        // Comprobamos si la dirección de la cartera existe en la base de datos
        if (databaseService.checkWalletAddress(walletAddress)) {
            logger.info("Dirección de cartera encontrada en la base de datos: {}", walletAddress);

            User usuario = userService.findByWalletAddress(walletAddress);
            if (usuario == null) {
                logger.info("No se encontró usuario con la dirección de la cartera, buscando en el historial...");
                String idUsuario = walletHistoryService.findUserDniByWalletAddress(walletAddress);
                usuario = userService.findByDni(idUsuario);
            }

            logger.info("Datos del usuario encontrados: {}", usuario);
            return ResponseEntity.ok(usuarioToJsonString(usuario));
        } else {
            logger.warn("Dirección de cartera no encontrada en la base de datos: {}", walletAddress);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Dirección de cartera no encontrada en la base de datos.");
        }
    }

    private String usuarioToJsonString(User usuario) {
        // Convertimos el objeto Usuario a JSON
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.writeValueAsString(usuario);
        } catch (JsonProcessingException e) {
            logger.error("Error al convertir el usuario a JSON: {}", usuario, e);
            return "";
        }
    }

    @PostMapping("/login")
public ResponseEntity<String> login(@RequestBody LoginDto loginDto) {
    logger.info("Iniciando el proceso de inicio de sesión para el usuario con correo: {}", loginDto.getEmail());

    // Validamos que los campos no estén vacíos
    if (loginDto.getEmail().isEmpty() || loginDto.getPassword().isEmpty()) {
        logger.warn("Faltan datos para iniciar sesión: {}", loginDto);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Correo electrónico o contraseña vacíos.");
    }

    // Intentamos encontrar al usuario con el correo electrónico
    User buscaUser = userService.buscarEmail(loginDto.getEmail());

    if (buscaUser == null) {
        logger.warn("Usuario no encontrado con el correo: {}", loginDto.getEmail());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error en el incio de sesion");
    }

    // Verificamos si la contraseña es correcta (asegúrate de tener un método para validar la contraseña)
    if (!buscaUser.getPassword().equals(loginDto.getPassword())) {
        logger.warn("Contraseña incorrecta para el usuario: {}", loginDto.getEmail());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Contraseña incorrecta.");
    }

    String wallet = buscaUser.getWalletAddress();   
    System.out.println("Encuentra la cartera");


    // Si las credenciales son correctas, devolvemos un mensaje de éxito
    logger.info("Inicio de sesión exitoso para el usuario: {}", loginDto.getEmail());
    return ResponseEntity.ok(wallet);
}

}
