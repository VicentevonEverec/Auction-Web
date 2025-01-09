package auction.blockchain.serviceimpl;

import auction.blockchain.entities.User;
import auction.blockchain.repositories.UserDao;
import auction.blockchain.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserDao userDao;

    @Override
    public User findByWalletAddress(String walletAddress) {
        return userDao.findByWalletAddress(walletAddress);
    }

    @Override
    @Transactional
    public User guardarUsuario(User user) {
        return userDao.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public User encontrarUsuarioPorDni(String dni) {
        return userDao.findUserByDni(dni);
    }

    @Override
    @Transactional
    public void updateWalletAddress(String wallet, String dni) {
        userDao.updateWalletAddress(wallet, dni);
    }
}
