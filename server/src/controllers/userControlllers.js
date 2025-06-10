import {
    checkEmailExists,
    registerUserservice,
    loginUserService,
    getAllUserService,
    getTotalUserCount
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
    const limit = req.query.limit ? parseInt(req.query.limit) : 2; // Set default to 2
    const page = req.query.page ? parseInt(req.query.page) : 1; // Default to 1 if not provided
    const searchTerm = req.query.search || ''; // Get search term
    const offset = (page - 1) * limit;

    try {
        const [users, totalCount] = await Promise.all([
            getAllUserService(offset, limit, searchTerm), // Fetch only limited users now
            getTotalUserCount() // Fetch total count of users
        ]);

        const usersWithoutPassword = users.map(({ password, ...rest }) => rest);
        const totalPages = Math.ceil(totalCount / limit); // Calculate total pages

        res.json({
            page,
            totalPages,
            limit,
            users: usersWithoutPassword,
        });

    } catch (error) {
        res.status(500).json({ error: 'error in getAllUserController', message: error.message });
    }
}
