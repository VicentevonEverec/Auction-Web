package auction.blockchain.service;

import auction.blockchain.entities.User;

public interface IUserService {

    // Buscar un usuario por su dirección de cartera
    public User findByWalletAddress(String walletAddress);

    // Guardar un nuevo usuario en la base de datos
    public User saveUser(User user);

    // Buscar un usuario por su DNI
    public User findByDni(String dni);

    // Actualizar la dirección de la cartera de un usuario
    public void updateWalletAddress(String wallet, String dni);

    // Actualizar la contraseña de un usuario
    public void updatePassword(String password, String dni);

    public void guardarUsuario(User usuario);

    public User buscarEmail(String email);

   
    
}
