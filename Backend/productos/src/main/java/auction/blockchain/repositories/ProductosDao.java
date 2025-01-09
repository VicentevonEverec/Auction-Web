package auction.blockchain.repositories;

import auction.blockchain.entities.Productos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductosDao extends JpaRepository<Productos, Long> {
}
