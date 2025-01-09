package auction.blockchain.service;

public interface IWalletHistoryService {

    public String findUserDniByWalletAddress(String address);

    public void deleteByWalletAddressAndUserDni(String wallet, String dni);

    public void insertWalletHistory(String wallet, String dni);
}
