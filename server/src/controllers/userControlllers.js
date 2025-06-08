import {
    checkEmailExists,
    registerUserservice
} from "../services/userSevices.js";


export const registerUserController = async (req, res) => {
   const {name, phone_number, email, password, role_id, grade_id} = req.body;

    try{
        const emailExists = await checkEmailExists(email);
        if (emailExists) {
            return res.status(400).json({error: "email is already"});
        }

       await registerUserservice(req.body);
       res.status(201).json({message: 'register user success'})
   }catch (error) {
       res.status(500).json(error, error.message = "error in controller")

   }
}
