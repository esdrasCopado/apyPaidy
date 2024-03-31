const userShema = require('../database/user')
const cartSchema = require('../database/cart');


const getAllUsers =()=>{}
const getOneUser = async (idUser)=>{
    try{
        const user =await userShema.findById(idUser);
        if(user){
            return user;
        }else{
            return false;
        }
    }catch(e){
        console.error(e.message)
        return false;
    }
}
const signIn = async (email) => {
    try {
        const user = await userShema.findOne({ email: email });
        
        if (user) {
            return user;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};

const createUser = async (userReq)=>{
    try{
    const {name,email,password} = userReq;

    const user = new userShema({
        name,
        email,
        password,
        role:'user'
    })
    await user.save();
    if(!createCar(user)){
        return "failed to create user cart"
    }
    return true;
}catch(error){
    return error;
}
}
async function createCar(userCart){
    try{
        const cart = new cartSchema({
            user:userCart
        })
        const result=await cart.save();
        console.log(result);
        return true;
    }catch(error){
        console.log(error);
        return false;
    }

}
const emailDuplicate= async (email)=>{
    try{
        const user = await userShema.findOne({email:email});
        if(user){
            return true;
        }else{
            return false;
        }
    }catch(error){
        console.log(error)
    }
}
const singUser = async (email,password)=>{
    try{
        const user = await userShema.findOne({email:email});
        if(user){
            if(user.password === password){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }catch(error){
        console.log(error)
    }
}
const updateUser =()=>{}
const deleteUser =()=>{}

module.exports = {getAllUsers, signIn, createUser, updateUser, deleteUser,singUser,emailDuplicate,getOneUser};