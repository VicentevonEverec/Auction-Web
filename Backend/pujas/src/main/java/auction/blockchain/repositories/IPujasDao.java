package auction.blockchain.repositories;

import auction.blockchain.entities.Pujas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;

public interface IPujasDao extends JpaRepository<Pujas, Long> {

    @Query(value = "SELECT MAX(Fecha_Puja) FROM pujas WHERE id_producto = ?1", nativeQuery = true)
    public Date obtenerUltimaFechaPuja(Long productoId);
}
