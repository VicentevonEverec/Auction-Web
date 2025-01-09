package auction.blockchain.serviceimpl;

import auction.blockchain.service.IDatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class DatabaseServiceImpl implements IDatabaseService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public String checkDatabaseConnection() {
        try {
            // Realiza una consulta simple a la base de datos para verificar la conexión
            jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            return "Conexión exitosa";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error al conectar con la base de datos";
        }
    }

    @Override
    public void actualizarPrecioProducto(String idProducto, String monto, String montoEUR, Date fechaPuja) {
        try {
            jdbcTemplate.update("UPDATE productos SET Precio_Actual = ?, Ultima_Puja = ? WHERE ID_Producto = ?",
                    montoEUR, fechaPuja, idProducto);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public Long obtenerIdUsuario(String walletUsuario) {
        try {
            return jdbcTemplate.queryForObject("SELECT id FROM user WHERE wallet_address = ?",
                    new Object[]{walletUsuario}, Long.class);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}

