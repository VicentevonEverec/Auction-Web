package auction.blockchain.service;

import auction.blockchain.dto.DatosPujaDto;

import java.util.Date;

public interface IPujasService {
    public void guardarPuja(DatosPujaDto datosPujaDto, Long idUsuario);

    public Date obtenerUltimaFechaPuja(Long productoId);
}
