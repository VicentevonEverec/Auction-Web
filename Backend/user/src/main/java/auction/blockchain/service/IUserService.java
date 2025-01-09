package auction.blockchain.service;

import auction.blockchain.entities.User;

public interface IUserService {

    public User findByWalletAddress(String walletAddress);

    public User guardarUsuario(User user);

    public User encontrarUsuarioPorDni(String dni);

    public void updateWalletAddress(String wallet, String dni);
}
