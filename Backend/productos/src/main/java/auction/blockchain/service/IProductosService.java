package auction.blockchain.service;

import auction.blockchain.entities.Productos;

import java.util.List;
import java.util.Optional;

public interface IProductosService {

    public Productos getProductoById(Long id);

    public Productos createProducto(Productos producto);

    public Productos updateProducto(Long id, Productos producto);

    public boolean deleteProducto(Long id);
}
