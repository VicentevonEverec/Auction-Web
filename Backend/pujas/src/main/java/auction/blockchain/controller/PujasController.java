package auction.blockchain.controller;

import auction.blockchain.dto.DatosPujaDto;
import auction.blockchain.service.IDatabaseService;
import auction.blockchain.service.IPujasService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@RequestMapping("/auction")
public class PujasController {

    @Autowired
    private IDatabaseService databaseService;

    @Autowired
    private IPujasService pujasService;

    @GetMapping("/database")
    public ResponseEntity<String> checkConnection() {
        String connection = databaseService.checkDatabaseConnection();
        return new ResponseEntity<>(connection, HttpStatus.OK);
    }

    @PostMapping("/pujar")
    public ResponseEntity<String> pujar(@RequestBody DatosPujaDto datosPujaDto) {
        // Mostramos los datos de la puja
        System.out.println("Monto: " + datosPujaDto.getMonto());
        System.out.println("MontoEUR: " + datosPujaDto.getMontoEUR());
        System.out.println("IdProducto: " + datosPujaDto.getIdProducto());
        System.out.println("WalletUsuario: " + datosPujaDto.getWalletUsuario());
        String jsonResponse = "";
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            // Obtenemos el id del usuario a través de su wallet
            Long idUsuario = databaseService.obtenerIdUsuario(datosPujaDto.getWalletUsuario());

            // Llamamos al servicio para guardar la puja
            pujasService.guardarPuja(datosPujaDto, idUsuario);
            // Una vez guardada la puja actualizamos el precio del producto
            databaseService.actualizarPrecioProducto(datosPujaDto.getIdProducto(), datosPujaDto.getMonto(),
                    datosPujaDto.getMontoEUR(), datosPujaDto.getFechaPuja());

            jsonResponse = objectMapper.writeValueAsString("Puja guardada correctamente");
        } catch (Exception e) {
            System.out.println("Error al guardar la puja: " + e.getMessage());
            return new ResponseEntity<>("Error al guardar la puja", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(jsonResponse, HttpStatus.OK);
    }

    @GetMapping("/nuevas-pujas/{productoId}")
    public ResponseEntity<Boolean> obtenerNuevasPujas(@PathVariable Long productoId, @RequestParam String ultimaFechaProducto) {

        System.out.println("Comprobando si hay nuevas pujas...");
        // Convertimos el String a Date
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S");
        Date ultimaFechaProductoDate = null;
        try {
            ultimaFechaProductoDate = formatter.parse(ultimaFechaProducto);
        } catch (Exception e) {
            System.out.println("Error al convertir la fecha: " + e.getMessage());
            return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // Recogemos de las pujas la fecha de la última puja del producto
        Date ultimaFechaPuja = pujasService.obtenerUltimaFechaPuja(productoId);

        if (ultimaFechaPuja != null && ultimaFechaProductoDate != null) {
            // Comparamos las fechas
            if (ultimaFechaPuja.after(ultimaFechaProductoDate)) {
                System.out.println("Hay nuevas pujas, actualizando producto...");
                return new ResponseEntity<>(true, HttpStatus.OK);
            }
        }

        return new ResponseEntity<>(false, HttpStatus.OK);
    }
}
