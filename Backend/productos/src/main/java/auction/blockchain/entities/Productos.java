package auction.blockchain.entities;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "productos")
@Data
public class Productos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Producto")
    private Long id;

    @Column(name = "Nombre", nullable = false)
    private String nombre;

    @Column(name = "Descripcion")
    private String descripcion;

    @Column(name = "Estado")
    private String estado;

    @Column(name = "Categoria")
    private String categoria;

    @Column(name = "Precio_Inicial")
    private BigDecimal precioInicial;

    @Column(name = "Precio_Actual")
    private BigDecimal precioActual;

    @Column(name = "Fecha_Inicio_Subasta")
    private Date fechaInicioSubasta;

    @Column(name = "Fecha_Final_Subasta")
    private Date fechaFinalSubasta;

    @Column(name = "ID_Vendedor")
    private Long idVendedor;

    @Column(name = "ID_Comprador")
    private Long idComprador;

    @Column(name = "Estado_Subasta")
    private String estadoSubasta;

    @Column(name = "Imagen_Producto")
    private String imagenProducto;

    @Column(name = "Ultima_Puja ")
    private Date ultimaPuja;
}
