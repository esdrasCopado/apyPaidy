const Direction = require('../database/direction'); // Corrected to use the model
const UserDirections = require('../database/userDirection');
const User = require('../database/user');

const createDirection = async (newDirection) => {
    try {
        const { userID, city, StreetNumber, StreetName, State, ZIPCode, Country, Neighborhood, DeliveryInstructions } = newDirection;

        // Fetch user by ID
        const client = await User.findById(userID);
        if (!client) {
            console.error('Usuario no encontrado');
            return; // Early return if user not found
        }

        // Create and save a new Direction instance
        const direction = new Direction({
            city,
            StreetNumber,
            StreetName,
            State,
            ZIPCode,
            Country,
            Neighborhood,
            DeliveryInstructions
        });
        await direction.save();

        // Fetch or create UserDirections for the user
        let userDirections = await UserDirections.findOne({ user: client._id });
        if (!userDirections) {
            // If not found, create a new UserDirections instance
            userDirections = new UserDirections({ user: client._id, directions: [] });
        }

        // Add the new direction to the UserDirections document
        userDirections.directions.push({ directio: direction._id });
        await userDirections.save();
        return true; // Success
    } catch (error) {
        console.error('Error al crear dirección:', error.message);
        return false; // Failure
    }
};


const getAllDirections = () => {
  return;
};

const getOneDirection = async (userID) => {
    try {
        // Fetch UserDirections document for the given user ID
        const userDirections = await UserDirections.findOne({ user: userID });

        if (!userDirections) {
            console.error('Usuario no encontrado');
            return null; // Early return if user directions not found
        }

        // Use Promise.all to fetch all directions concurrently
        const directions = await Promise.all(userDirections.directions.map(async ({ directio }) => {
            return await Direction.findById(directio); // Fetch each direction by its ID
        }));

        return directions; // Return the array of direction documents
    } catch (err) {
        console.error('Error al obtener las direcciones:', err.message);
        return null;
    }
};




const deleteDirection = () => {
  return;
};
const updateDirection = () => {
  return;
};

module.exports = { getAllDirections, getOneDirection, createDirection, deleteDirection, updateDirection };