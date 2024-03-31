const userService = require('../services/userService');
const bcrypt = require('bcrypt');
const saltRounds=10;



const getAllUsers=(req,res)=>{
    res.send("Get all users");
}
const getOneUser=async (req,res)=>{
    try{
        const userId=req.params.userID;
        
        const user=await userService.getOneUser(userId);
        if(user){
            res.status(200).json({status:'OK', data:user});
        }else{
            res.status(403).json({status:'Error', message:'user not found'});
        }
    }catch(err){
        res.status(403).json({status:'Error', message:err.message});
    }
};

const emailDuplicate= async (req,res)=>{
    try {
        const {email}=req.body;
        if(!email){
            return res.status(403).json({status:'Error', message:'error required fields'});
        }
        const user=await userService.emailDuplicate(email);
        if(user==true){
            return res.status(403).json({status:'Error', message:'email already exists'});
        }else{
            return res.status(200).json({status:'OK', message:user});
        }
    }catch (e) {
        return res.status(403).json({status:'Error', message:"Error checking email",error:e.message});
    }
};
async function hashUserPassword(password) {
    return await bcrypt.hash(password, saltRounds);
}

async function createUser(req, res) {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ status: 'Error', message: 'Campos requeridos faltantes' });
        }

        // Validar el formato del email (puedes utilizar expresiones regulares u otras técnicas de validación)
        // Si el email no es válido, devuelve una respuesta de error

        const hashedPassword = await hashUserPassword(password);
        const newUser = { name, email, password: hashedPassword, role };
        const user = await userService.createUser(newUser);

        if (user) {
            res.status(200).json({ status: 'OK', message: 'Usuario creado exitosamente' });
        } else {
            return res.status(500).json({ status: 'Error', message: 'Error al crear el usuario' });
        }
    } catch (error) {
        console.error('Error al crear usuario:', error);
        return res.status(500).json({ status: 'Error', message: 'Error interno del servidor' });
    }
}

async function signInUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: 'Error', message: 'Campos requeridos faltantes' });
        }

        const user = await userService.signIn(email);
        if (!user) {
            return res.status(403).json({ status: 'Error', message: 'Error al iniciar sesión. Usuario no encontrado.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            return res.status(200).json({ status: 'OK', message: user._id });
        } else {
            return res.status(403).json({ status: 'Error', message: 'Error al iniciar sesión. Credenciales incorrectas.' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return res.status(500).json({ status: 'Error', message: 'Error interno del servidor' });
    }
}

const updateUser=(req,res)=>{};
const deleteUser=(req,res)=>{};

module.exports = {getAllUsers, getOneUser, createUser, updateUser, deleteUser,emailDuplicate, signInUser};