package auction.blockchain.dto;

import lombok.Data;

import java.util.Date;

@Data
public class DatosPujaDto {

    private String monto;
    private String montoEUR;
    private String idProducto;
    private String walletUsuario;
    private Date fechaPuja;

}
