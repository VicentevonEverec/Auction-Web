package auction.blockchain.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "user")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String surname;
    private String email;
    private String dni;
    private String walletAddress;

    public User() {
    }

    public User(String name, String surname, String email, String dni, String walletAddress) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.dni = dni;
        this.walletAddress = walletAddress;
    }
}

