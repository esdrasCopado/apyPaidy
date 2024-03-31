const directionService=require('../services/directionService');

const getAllDirections=(req,res)=>{
    const getAllDirections=directionService.getAllDirections();
    res.send('hello world');
};
const getOneDirection = async (req, res) => {
    try {
        const directionId = req.params.directionID;
        const direction = await directionService.getOneDirection(directionId);
        if (direction) {
            res.status(200).json({ status: 'OK', data: direction });
        } else {
            res.status(404).json({ status: 'Error', message: 'Dirección no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener la dirección:', error.message);
        res.status(500).json({ status: 'Error', message: 'Error al obtener la dirección' });
    }
};


const createDirection = async (req, res) => {
    try {
        const { user, StreetNumber, StreetName, State, ZIPCode, Country, Neighborhood, DeliveryInstructions } = req.body;
        // Validación de campos
        if (!user || !StreetNumber || !StreetName || !State || !ZIPCode || !Country || !Neighborhood || !DeliveryInstructions) {
            return res.status(400).json({ status: 'Error', message: 'Faltan campos requeridos' });
        }

        const newDirection = {
            user,
            StreetNumber,
            StreetName,
            State,
            ZIPCode,
            Country,
            Neighborhood,
            DeliveryInstructions
        };

        const createdDirection = await directionService.createDirection(newDirection);

        res.status(201).json({ status: 'OK', data: createdDirection });
    } catch (error) {
        res.status(500).json({ status: 'Error', message: 'Error al crear dirección' });
    }
};
const deleteDirection=(req,res)=>{
     directionService.deleteDirection(req.params.directionID);
};
const updateDirection=(req,res)=>{
    const updateDirection=directionService.updateDirection(req.params.directionID)
    res.send(`Update direction ${req.params.directionID}`);
};

module.exports = {getAllDirections, getOneDirection, createDirection, deleteDirection, updateDirection};