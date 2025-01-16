package auction.blockchain.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import auction.blockchain.entities.User;

@Repository
public interface UserDao extends JpaRepository<User, Long> {

    // Método para encontrar un usuario por la dirección de la cartera
    public User findByWalletAddress(String walletAddress);

    // Método para encontrar un usuario por su DNI
    public User findUserByDni(String dni);

    public User findUserByEmail(String email);

    

    // Actualización de la dirección de la cartera de un usuario dado su DNI
    @Modifying
    @Query(value = "UPDATE user SET wallet_address = :wallet WHERE dni = :dni", nativeQuery = true)
    public void updateWalletAddress(String wallet, String dni);  // Asegúrate de que el nombre de la tabla coincida con el de tu base de datos.

}
