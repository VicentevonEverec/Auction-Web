package auction.blockchain.serviceimpl;

import auction.blockchain.dto.DatosPujaDto;
import auction.blockchain.entities.Pujas;
import auction.blockchain.repositories.IPujasDao;
import auction.blockchain.service.IPujasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Date;

@Service
public class PujasServiceImpl implements IPujasService {

    @Autowired
    private IPujasDao pujasDao;

    @Override
    public void guardarPuja(DatosPujaDto datosPujaDto, Long idUsuario) {
        // Creamos la puja
        Pujas puja = new Pujas();

        puja.setIdUsuario(idUsuario);

        // Convertimos el String a BigDecimal para asignarlo a la puja
        puja.setMonto(new BigDecimal(datosPujaDto.getMonto()));

        // Convertimos el String a Long para asignarlo a la puja
        puja.setIdProducto(Long.parseLong(datosPujaDto.getIdProducto()));

        // Asignamos el wallet del usuario a la puja
        puja.setWalletAddress(datosPujaDto.getWalletUsuario());

        // Establecemos la fecha de la puja
        Calendar calendar = Calendar.getInstance();
        puja.setFechaPuja(calendar.getTime());
        datosPujaDto.setFechaPuja(puja.getFechaPuja());

        // Guardamos la puja
        pujasDao.save(puja);
    }

    @Override
    public Date obtenerUltimaFechaPuja(Long productoId) {
        return pujasDao.obtenerUltimaFechaPuja(productoId);
    }
}
