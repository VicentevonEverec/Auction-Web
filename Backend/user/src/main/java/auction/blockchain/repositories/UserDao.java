package auction.blockchain.repositories;

import auction.blockchain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends JpaRepository<User, Long> {

    public User findByWalletAddress(String walletAddress);

    public User findUserByDni(String dni);

    @Modifying
    @Query(value = "UPDATE user SET wallet_address = :wallet WHERE dni = :dni", nativeQuery = true)
    public void updateWalletAddress(String wallet, String dni);
}
