package auction.blockchain.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import auction.blockchain.entities.WalletHistory;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface WalletHistoryDao extends JpaRepository<WalletHistory, Long> {

    @Query(value = "SELECT user_dni FROM wallet_history w WHERE w.wallet_address = :address", nativeQuery = true)
    public String findUserDniByWalletAddress(String address);

    @Modifying
    @Query(value = "DELETE FROM wallet_history WHERE wallet_address = :wallet AND user_dni = :dni", nativeQuery = true)
    public void deleteByWalletAddressAndUserDni(@Param("wallet") String wallet, @Param("dni") String dni);

    @Modifying
    @Query(value = "INSERT INTO wallet_history (wallet_address, user_dni) VALUES (:wallet, :dni)", nativeQuery = true)
    public void insertWalletHistory(String wallet, String dni);
}
