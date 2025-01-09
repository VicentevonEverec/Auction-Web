package auction.blockchain.entities;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "pujas")
@Data
public class Pujas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Puja")
    private Long id;

    @Column(name = "ID_Producto")
    private Long idProducto;

    @Column(name = "ID_Usuario")
    private Long idUsuario;

    @Column(name = "Monto")
    private BigDecimal monto;

    @Column(name = "Fecha_Puja")
    private Date fechaPuja;

    @Column(name = "Wallet_Address")
    private String walletAddress;

}
