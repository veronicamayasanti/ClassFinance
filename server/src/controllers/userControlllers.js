import {
    checkEmailExists,
    registerUserservice,
    loginUserService,
    getAllUserService
} from "../services/userSevices.js";


// register user
export const registerUserController = async (req, res) => {

    try{
        const emailExists = await checkEmailExists(req.body.email);
        if (emailExists) {
            return res.status(400).json({error: "email is already"});
        }

       await registerUserservice(req.body);
       res.status(201).json({message: 'register user success'})
   }catch (error) {
       res.status(500).json(error, error.message = "error in controller")

   }
}

//login user
export const loginUserController = async (req, res) => {
    try{
        const admin = await loginUserService(req.body.email, req.body.password);
        const {password, ...userWithoutPassword} = admin;
        res.json(userWithoutPassword)
    }catch (error){
        res.status(401).json({error: error.message});
    }
}

// get all user
export const getAllUserController = async (req, res) => {
    try{
        const users = await getAllUserService();
        const usersWithoutPassword = users.map(({ password, ...rest }) => rest);
        res.json(usersWithoutPassword);
    }catch (error){
        res.status(500).json('error in getallusercontroller' + error.message)
    }
}