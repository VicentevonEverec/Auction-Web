package auction.blockchain.service;

import auction.blockchain.dto.ProductoDto;
import auction.blockchain.entities.Productos;

import java.util.List;

public interface IDatabaseService {

    public String checkDatabaseConnection();

    public List<ProductoDto> obtenerProductos();

    public ProductoDto obtenerProductoPorId(Long id);
}
