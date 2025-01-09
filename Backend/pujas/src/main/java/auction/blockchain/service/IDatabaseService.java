package auction.blockchain.service;

import java.util.Date;

public interface IDatabaseService {

    public String checkDatabaseConnection();

    public void actualizarPrecioProducto(String idProducto, String monto, String montoEUR, Date fechaPuja);

    public Long obtenerIdUsuario(String walletUsuario);
}
