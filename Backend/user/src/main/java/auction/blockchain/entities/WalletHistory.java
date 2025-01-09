package auction.blockchain.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "wallet_history")
@Data
public class WalletHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_dni")
    private String userDni;

    @Column(name = "wallet_address")
    private String walletAddress;

    @Column(name = "carteraActiva")
    private boolean carteraActiva;
}
