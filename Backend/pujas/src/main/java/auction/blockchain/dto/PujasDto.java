package auction.blockchain.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class PujasDto {

    private Long id;
    private String usuarioDni;
    private Long idProducto;
    private BigDecimal monto;
    private Date fechaPuja;
    private String walletAddress;

}
