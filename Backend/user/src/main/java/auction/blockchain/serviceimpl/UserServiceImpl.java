package auction.blockchain.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import auction.blockchain.entities.User;
import auction.blockchain.repositories.UserDao;
import auction.blockchain.service.IUserService;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserDao userDao;

    @Override
    @Transactional(readOnly = true)
    public User findByWalletAddress(String walletAddress) {
        return userDao.findByWalletAddress(walletAddress);
    }

    @Override
    @Transactional
    public User saveUser(User user) {
        return userDao.save(user);  // Método para guardar un usuario en la base de datos.
    }

    @Override
    @Transactional(readOnly = true)
    public User findByDni(String dni) {
        return userDao.findUserByDni(dni); // Método para encontrar un usuario por su DNI.
    }

    @Override
    @Transactional
    public void updateWalletAddress(String wallet, String dni) {
        userDao.updateWalletAddress(wallet, dni);  // Actualiza la dirección de la cartera de un usuario.
    }

    @Override
    @Transactional
    public void updatePassword(String password, String dni) {
        User user = userDao.findUserByDni(dni);
        if (user != null) {
            user.setPassword(password); // Asumimos que la contraseña está en texto plano. En una implementación real, deberías encriptar la contraseña.
            userDao.save(user); // Guardamos el usuario con la nueva contraseña.
        }
    }

    @Override
    @Transactional
    public void guardarUsuario(User usuario) {
        // Este método ahora delega la acción de guardar al método `saveUser`
        saveUser(usuario);
    }

    @Override
    @Transactional(readOnly = true)
    public User buscarEmail(String email) {
        return userDao.findUserByEmail(email); // Método para encontrar un usuario por su DNI.
    }

    }

 
