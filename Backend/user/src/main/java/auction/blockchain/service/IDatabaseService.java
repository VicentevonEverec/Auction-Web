package auction.blockchain.service;

import auction.blockchain.entities.User;

import java.util.List;

public interface IDatabaseService {

    public String checkDatabaseConnection();
    public String insertUser(User user);

    public boolean checkUser(String dni);

    public boolean checkWalletAddress(String walletAddress);

    public String dniAsociado(String walletAddress);

    public List<String> walletHistory(String dni, String walletAddress);

    public String insertWalletHistory(String walletAddress, String dni);

    public boolean checkWalletHistory(String walletAddress, String dni);

    public String deleteWalletHistory(String walletAddress, String dni);

    public String changeCurrentWallet(String currentWalletAddress, String newWalletAddress, String dni);

    public String reinsertWalletHistory(String walletAddress, String dni);
}
