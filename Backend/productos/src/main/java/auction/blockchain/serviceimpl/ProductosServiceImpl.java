package auction.blockchain.serviceimpl;

import auction.blockchain.entities.Productos;
import auction.blockchain.repositories.ProductosDao;
import auction.blockchain.service.IProductosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductosServiceImpl implements IProductosService {

    @Autowired
    private ProductosDao productosDao;

    @Override
    public Productos getProductoById(Long id) {
        return productosDao.findById(id).orElse(null);
    }

    @Override
    public Productos createProducto(Productos producto) {
        return productosDao.save(producto);
    }

    @Override
    public Productos updateProducto(Long id, Productos producto) {
        if (productosDao.existsById(id)) {
            producto.setId(id);
            return productosDao.save(producto);
        }
        return null;
    }

    @Override
    public boolean deleteProducto(Long id) {
        if (productosDao.existsById(id)) {
            productosDao.deleteById(id);
            return true;
        }
        return false;
    }
}
