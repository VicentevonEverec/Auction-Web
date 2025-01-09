package auction.blockchain.serviceimpl;

import auction.blockchain.repositories.WalletHistoryDao;
import auction.blockchain.service.IWalletHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class WalletHistoryServiceImpl implements IWalletHistoryService {

    @Autowired
    private WalletHistoryDao walletHistoryDao;

    @Override
    @Transactional(readOnly = true)
    public String findUserDniByWalletAddress(String address) {
        return walletHistoryDao.findUserDniByWalletAddress(address);
    }

    @Override
    @Transactional
    public void deleteByWalletAddressAndUserDni(String wallet, String dni) {
        walletHistoryDao.deleteByWalletAddressAndUserDni(wallet, dni);
    }

    @Override
    @Transactional
    public void insertWalletHistory(String wallet, String dni) {
        walletHistoryDao.insertWalletHistory(wallet, dni);
    }
}
