package auction.blockchain.dto;

import java.util.List;

public class LoginDto {
   
        private String email;
        private String password;
        private List <Long> idProductos;
    
       
        public String getPassword() {
            return password;
        }
    
        public void setPassword(String password) {
            this.password = password;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }
    }

