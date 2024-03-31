const Direction  = require('../database/direction')

const getAllDirections = () => {
  return;
};
const getOneDirection = (directionID) => {
    try {
        // Parse the directionID string to extract the username
        const userID = directionID.split('=')[1];

        // Assuming Direction is your Mongoose model
        const direction = Direction.find({ user: userID });

        if (direction) {
            return direction;
        } else {
            return null;
        }
    } catch (err) {
        console.error('Error al obtener la dirección:', err.message);
        return null;
    }
};


const createDirection = async (newDirection) => {
    try {
        const { user, StreetNumber, StreetName, State, ZIPCode, Country, Neighborhood, DeliveryInstructions } = newDirection;
        // Crea una nueva instancia de dirección utilizando el modelo
        const direction = new Direction({
            user,
            StreetNumber,
            StreetName,
            State,
            ZIPCode,
            Country,
            Neighborhood,
            DeliveryInstructions
        });
        
       
        await direction.save();
        console.error('Se guardo correctamente');
    } catch (error) {
        console.error('Error al crear dirección:', error.message);

    }
};

const deleteDirection = () => {
  return;
};
const updateDirection = () => {
  return;
};

module.exports = { getAllDirections, getOneDirection, createDirection, deleteDirection, updateDirection };