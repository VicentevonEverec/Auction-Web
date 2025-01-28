package auction.blockchain.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import auction.blockchain.dto.ProductoDto;
import auction.blockchain.service.ICarritoService;


@RestController
@RequestMapping("/carrito")
public class CarritoController {

    @Autowired
    private ICarritoService carritoService;

    @GetMapping("/{id}")
    public ResponseEntity<List<ProductoDto>> getCarrito(@PathVariable Long id) {
        List<ProductoDto> carrito = carritoService.obtenerCarrito(id);
        return new ResponseEntity<>(carrito, HttpStatus.OK);
    }
    

}
