pragma solidity ^0.8.7;

error Puja__NotEnoughETHEntered();

contract Puja {

    struct DetallesPuja {
        address pujador;
        uint256 idProducto;
        uint256 monto;
        uint256 montoEUR;
    }

    // Establecemos el precio del trámite de puja a 0.00001 ether
    uint256 private precioTramitePuja = 0.00001 ether;
    // Creamos un array con las carteras de los usuarios que han pujado
    address payable[] private pujadores;
    bool private pujaFinalizada;
    address payable private ganador;
    DetallesPuja[] private detallesPujas;

    

    event PujaRealizada(address indexed pujador, uint256 idProducto, uint256 monto, uint256 montoEUR);
    event GanadorEstablecido(address indexed _ganador);

    function pujarPorProducto(uint256 idProducto, uint256 monto, uint256 montoEUR, uint256 saldo) public payable {
        if (saldo < precioTramitePuja) {
            revert Puja__NotEnoughETHEntered();
        }

        detallesPujas.push(DetallesPuja({
            pujador: msg.sender,
            idProducto: idProducto,
            monto: monto,
            montoEUR: montoEUR
        }));

        pujadores.push(payable(msg.sender));
        emit PujaRealizada(msg.sender, idProducto, monto, montoEUR);
    }

    function establecerGanadorPuja() external {
        require(!pujaFinalizada, "La puja ya ha sido finalizada");
        require(pujadores.length > 0, "No hay pujadores");
        
        uint256 indiceGanador = generadorAleatorio() % pujadores.length;
        ganador = pujadores[indiceGanador];
        pujaFinalizada = true;
        emit GanadorEstablecido(ganador);
    }

    function generadorAleatorio() private view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, pujadores.length)));
    }

    function getPrecioTramitePuja() public view returns (uint256) {
        return precioTramitePuja;
    }

    function getGanador() public view returns (address) {
        require(pujaFinalizada, "La puja no ha finalizado");
        return ganador;
    }
 }
