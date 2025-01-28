package auction.blockchain.serviceimpl;

import java.util.List;

import org.springframework.stereotype.Service;

import auction.blockchain.dto.ProductoDto;
import auction.blockchain.service.ICarritoService;
@Service
public class CarritoServiceiml implements ICarritoService {

    @Override
    public List<ProductoDto> obtenerCarrito(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'obtenerCarrito'");
    }

    @Override
    public void agregarProductoAlCarrito(Long productoId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'agregarProductoAlCarrito'");
    }

    @Override
    public void eliminarProductoDelCarrito(Long productoId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'eliminarProductoDelCarrito'");
    }

}
