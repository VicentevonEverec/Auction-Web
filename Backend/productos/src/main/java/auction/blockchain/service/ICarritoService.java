package auction.blockchain.service;

import java.util.List;

import auction.blockchain.dto.ProductoDto;

public interface ICarritoService {
    List<ProductoDto> obtenerCarrito(Long id);
    
    void agregarProductoAlCarrito(Long productoId);

    void eliminarProductoDelCarrito(Long productoId);

}
