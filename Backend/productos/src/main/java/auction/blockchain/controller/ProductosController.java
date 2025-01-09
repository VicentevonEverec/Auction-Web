package auction.blockchain.controller;

import auction.blockchain.dto.ProductoDto;
import auction.blockchain.entities.Productos;
import auction.blockchain.service.IDatabaseService;
import auction.blockchain.service.IProductosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/productos")
public class ProductosController {

    @Autowired
    private IProductosService productosService;

    @Autowired
    private IDatabaseService databaseService;

    @GetMapping("/database")
    public ResponseEntity<String> checkConnection() {
        String connection = databaseService.checkDatabaseConnection();
        return new ResponseEntity<>(connection, HttpStatus.OK);
    }

    @GetMapping("/listaProductos")
    public ResponseEntity<List<ProductoDto>> getAllProductos() {
        List<ProductoDto> productos = databaseService.obtenerProductos();
        return new ResponseEntity<>(productos, HttpStatus.OK);
    }

    @GetMapping("/detallesProducto/{id}")
    public ResponseEntity<ProductoDto> getProductoById(@PathVariable Long id) {
        ProductoDto producto = databaseService.obtenerProductoPorId(id);
        return producto != null ? new ResponseEntity<>(producto, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Productos> createProducto(@RequestBody Productos producto) {
        Productos createdProducto = productosService.createProducto(producto);
        return new ResponseEntity<>(createdProducto, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Productos> updateProducto(@PathVariable Long id, @RequestBody Productos producto) {
        Productos updatedProducto = productosService.updateProducto(id, producto);
        return updatedProducto != null ?
                new ResponseEntity<>(updatedProducto, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProducto(@PathVariable Long id) {
        boolean deleted = productosService.deleteProducto(id);
        return deleted ?
                new ResponseEntity<>(HttpStatus.NO_CONTENT) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
