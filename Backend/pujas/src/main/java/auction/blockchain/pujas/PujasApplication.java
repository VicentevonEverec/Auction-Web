package auction.blockchain.pujas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"auction.blockchain"})
@EntityScan(basePackages = {"auction.blockchain.entities"})
@EnableJpaRepositories(basePackages = {"auction.blockchain.repositories"})
public class PujasApplication {

	public static void main(String[] args) {SpringApplication.run(PujasApplication.class, args);}
}
