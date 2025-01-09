package auction.blockchain.serviceimpl;

import auction.blockchain.entities.User;
import auction.blockchain.service.IDatabaseService;
import auction.blockchain.service.IUserService;
import auction.blockchain.service.IWalletHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DatabaseServiceImpl implements IDatabaseService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private IWalletHistoryService walletHistoryService;

    @Autowired
    private IUserService userService;

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

    // Introducimos un método para comprobar la inserción de un usuario en la base de datos
    @Override
    public String insertUser(User user)
    {
        try {
            jdbcTemplate.update("INSERT INTO user (name, surname, email, dni, wallet_address) VALUES (?, ?, ?, ?, ?)", user.getName(), user.getSurname(), user.getEmail(), user.getDni(), user.getWalletAddress());
            return "Usuario insertado correctamente";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error al insertar el usuario";
        }
    }

    @Override
    public boolean checkUser(String dni) {
        try {
            // Realiza una consulta simple a la base de datos para verificar la conexión
            jdbcTemplate.queryForObject("SELECT 1 FROM user WHERE dni = ?", Integer.class, dni);
            return true;
        } catch (EmptyResultDataAccessException e) {
            // EmptyResultDataAccessException se lanza si no se encuentra ningún resultado
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean checkWalletAddress(String walletAddress)
    {
        System.out.println("Buscando en la base de datos: " + walletAddress);

        try {
            // Buscamos en la base de datos la dirección de la cartera
            jdbcTemplate.queryForObject("SELECT 1 FROM user WHERE wallet_address = ?", Integer.class, walletAddress);
            return true;
        } catch (EmptyResultDataAccessException e) {
            // EmptyResultDataAccessException se lanza si no se encuentra ningún resultado
            // En cuyo caso buscamos en la tabla de historial de carteras
        try {
                jdbcTemplate.queryForObject("SELECT 1 FROM wallet_history WHERE wallet_address = ?", Integer.class, walletAddress);
                return true;
            } catch (EmptyResultDataAccessException e2) {
                // EmptyResultDataAccessException se lanza si no se encuentra ningún resultado
                return false;
            } catch (Exception e2) {
                e2.printStackTrace();
                return false;
            }
        }
    }

    @Override
    public String dniAsociado(String walletAddress)
    {
        try {
            // Buscamos en la base de datos la dirección de la cartera
            return jdbcTemplate.queryForObject("SELECT dni FROM user WHERE wallet_address = ?", String.class, walletAddress);
        } catch (EmptyResultDataAccessException e) {
            // EmptyResultDataAccessException se lanza si no se encuentra ningún resultado
            // Buscamos al usuario en el historial de carteras
            System.out.println("Buscando en el historial de carteras...");
            return walletHistoryService.findUserDniByWalletAddress(walletAddress);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<String> walletHistory(String dni, String walletAddress) {
        try {
            List<String> walletHistory = jdbcTemplate.query(
                    "SELECT wallet_address FROM wallet_history WHERE user_dni = ?" +
                            " AND wallet_address != ? AND carteraActiva = 1",
                    (resultSet, rowNum) -> resultSet.getString("wallet_address"), dni, walletAddress);

            return walletHistory;
            }

        catch (EmptyResultDataAccessException ignored) {
                // Mostramos un mensaje de error si no se encuentra ningún resultado
                System.out.println("No se ha encontrado ningún historial de carteras");

                return null;
            }
    }

    @Override
    public String insertWalletHistory(String walletAddress, String dni)
    {
        try {
            jdbcTemplate.update("INSERT INTO wallet_history (wallet_address, user_dni) VALUES (?, ?)", walletAddress, dni);
            return "Historial de carteras insertado correctamente";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error al insertar el historial de carteras";
        }
    }

    @Override
    public boolean checkWalletHistory(String walletAddress, String dni)
    {
        try {
            // Buscamos en la base de datos la dirección de la cartera
            jdbcTemplate.queryForObject("SELECT 1 FROM wallet_history WHERE wallet_address = ? AND user_dni = ?", Integer.class, walletAddress, dni);
            return true;
        } catch (EmptyResultDataAccessException e) {
            // EmptyResultDataAccessException se lanza si no se encuentra ningún resultado
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public String deleteWalletHistory(String walletAddress, String dni)
    {
        try {
            jdbcTemplate.update("UPDATE wallet_history SET carteraActiva = false WHERE wallet_address = ? AND user_dni = ?", walletAddress, dni);
            return "Historial de carteras eliminado correctamente";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error al eliminar el historial de carteras";
        }
    }

    @Override
    public String changeCurrentWallet(String newWalletAddress, String currentWalletAddress, String dni)
    {
        try {
            userService.updateWalletAddress(newWalletAddress, dni);

            return "Historial de carteras actualizado correctamente";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error al realizar el cambio de cartera";
        }
    }

    @Override
    public String reinsertWalletHistory(String walletAddress, String dni)
    {
        try {
            jdbcTemplate.update("UPDATE wallet_history SET carteraActiva = true WHERE wallet_address = ? AND user_dni = ?", walletAddress, dni);
            return "Historial de carteras añadido correctamente";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error al eliminar el historial de carteras";
        }
    }
}

