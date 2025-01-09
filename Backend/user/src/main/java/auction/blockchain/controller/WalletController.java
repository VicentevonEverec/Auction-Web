package auction.blockchain.controller;

import auction.blockchain.entities.User;
import auction.blockchain.service.IWalletHistoryService;
import auction.blockchain.serviceimpl.DatabaseServiceImpl;
import auction.blockchain.dto.Wallet;
import auction.blockchain.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class WalletController
{
    @Autowired
    private DatabaseServiceImpl databaseServiceImpl;

    @Autowired
    private IUserService userService;

    @Autowired
    private IWalletHistoryService walletHistoryService;

    @PostMapping("/check-wallet")
    public ResponseEntity<String> comprobarDireccionCartera(@RequestBody String walletAddress)
    {
        // Comprobamos que la dirección de la cartera del usuario no esté ya registrada
        if (databaseServiceImpl.checkWalletAddress(walletAddress))
        {
            System.out.println("Dirección de cartera encontrada en la base de datos.");
            System.out.println("Devolviendo cartera actual del usuario...");

            String dni = null;
            dni = databaseServiceImpl.dniAsociado(walletAddress);

            if (dni == null) {
                // En caso de ser null, es porque esta puede no ser la dirección de cartera actual del usuario
                // Por lo tanto, buscamos la dirección de cartera actual del usuario
                dni = walletHistoryService.findUserDniByWalletAddress(walletAddress);
            }

            // Obtenemos el usuario y devolvemos su cartera actual
            User usuario = userService.encontrarUsuarioPorDni(dni);

            return ResponseEntity.ok(usuario.getWalletAddress()); // Código 200 para OK
        } else {
            System.out.println("Dirección de cartera no encontrada en la base de datos.");
            return ResponseEntity.status(404).body("Dirección de cartera no encontrada en la base de datos."); // Código 404 para Not Found
        }
    }

    @GetMapping("wallet-history/{walletAddress}")
    public ResponseEntity<List<String>> recuperarHistorialCarteras(@PathVariable String walletAddress)
    {
        String dni = databaseServiceImpl.dniAsociado(walletAddress);
        // Mostramos por consola el DNI del usuario
        System.out.println("Buscando historial de carteras para el DNI: " + dni);

        try {
            // Comprobamos si existe historial de carteras para el DNI
            List<String> history = databaseServiceImpl.walletHistory(dni, walletAddress);

            if (history != null) {
                System.out.println("Historial de carteras encontrado en la base de datos.");
                System.out.println("Historial: " + String.join(", ", history));

                return ResponseEntity.ok(history); // Código 200 para OK
            } else {
                System.out.println("Historial de carteras no encontrado en la base de datos.");
                return ResponseEntity.notFound().build(); // Código 404 para Not Found
            }
        } catch (Exception e) {
            System.out.println("Error al buscar el historial de carteras: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Código 500 para Internal Server Error
        }
    }

    @PostMapping("/addWallet")
    public ResponseEntity<String> anadirDireccionCartera(@RequestBody Wallet wallet)
    {
        // Obtenemos el usuario actual
        String idUsuario = null;
        User usuario = userService.findByWalletAddress(wallet.getCurrentWallet());

        if (usuario == null) {
            // Buscamos al usuario en el historial de carteras
            System.out.println("Buscando en el historial de carteras...");
            idUsuario = walletHistoryService.findUserDniByWalletAddress(wallet.getCurrentWallet());
        } else {
            idUsuario = usuario.getDni();
        }

        if(wallet.getWalletAddress().equals(wallet.getCurrentWallet()))
        {
            System.out.println("La dirección de cartera es la misma que la actual.");
            return ResponseEntity.status(409).body("La dirección de cartera es la misma que la actual."); // Código 409 para Conflict
        }

        // Comprobamos que la dirección de la cartera del usuario no esté ya registrada
        if (databaseServiceImpl.checkWalletAddress(wallet.getWalletAddress()))
        {
            System.out.println("Dirección de cartera encontrada en la base de datos.");
            databaseServiceImpl.reinsertWalletHistory(wallet.getWalletAddress(), idUsuario);
        } else {
            databaseServiceImpl.insertWalletHistory(wallet.getWalletAddress(), idUsuario);
        }

        return ResponseEntity.ok("Dirección de cartera añadida a la cuenta."); // Código 200 para OK
    }

    @PostMapping("/deleteWallet")
    public ResponseEntity<String> eliminarDireccionCartera(@RequestBody Wallet wallet)
    {
        // Dirección de cartera a eliminar
        System.out.println("Dirección de cartera a eliminar: " + wallet.getWalletAddress());

        // Obtenemos el DNI del usuario actual
        String dni = userService.findByWalletAddress(wallet.getCurrentWallet()).getDni();

        // Comprobamos que la dirección de la cartera del usuario esté ya registrada en el historial de carteras
        if (databaseServiceImpl.checkWalletHistory(wallet.getWalletAddress(), dni))
        {
            System.out.println("Dirección de cartera encontrada en la base de datos.");

            databaseServiceImpl.deleteWalletHistory(wallet.getWalletAddress(), dni);

            return ResponseEntity.ok("Dirección de cartera eliminada de la cuenta."); // Código 200 para OK
        } else {
            System.out.println("Dirección de cartera no encontrada en la base de datos.");
            return ResponseEntity.status(409).body("La dirección de cartera no se encuentra añadida a tu cuenta."); // Código 409 para Conflict
        }
    }

    @PostMapping("/changeWallet")
    public ResponseEntity<String> cambiarDireccionCartera(@RequestBody Wallet wallet)
    {
        // Dirección de cartera a cambiar
        System.out.println("Dirección de cartera actual: " + wallet.getCurrentWallet());

        // Dirección de cartera que pasará a ser la actual
        System.out.println("Dirección de cartera nueva: " + wallet.getWalletAddress());

        // Obtenemos el DNI del usuario actual
        String dni = userService.findByWalletAddress(wallet.getCurrentWallet()).getDni();

        // Comprobamos que la dirección de la cartera del usuario esté ya registrada en el historial de carteras
        if (databaseServiceImpl.checkWalletHistory(wallet.getWalletAddress(), dni))
        {
            System.out.println("Dirección de cartera encontrada en la base de datos.");

            databaseServiceImpl.changeCurrentWallet(wallet.getWalletAddress(),wallet.getCurrentWallet(), dni);

            return ResponseEntity.ok("Dirección de cartera cambiada en la cuenta."); // Código 200 para OK
        } else {
            System.out.println("Dirección de cartera no encontrada en la base de datos.");
            return ResponseEntity.status(409).body("La dirección de cartera no se encuentra añadida a tu cuenta."); // Código 409 para Conflict
        }
    }
}
