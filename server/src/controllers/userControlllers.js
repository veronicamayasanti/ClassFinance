import {
    checkEmailExists,
    registerUserservice,
    loginUserService,
    getAllUserService,
    getTotalUserCount,
    updateUserService,
    deleteUserService
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

// Update user
export const updateUserController = async (req, res) => {
    const userId = req.params.id; // Get user ID from URL parameters
    const { name, phone_number, email, grade_id } = req.body;  // Get updated user data from request body
    try {
        // Log the data received to ensure it is valid
        console.log("Data received for update:", req.body);

        // Check if the new email already exists for a different user
        const emailExists = await checkEmailExists(email);
        if (emailExists) {
            return res.status(400).json({ error: "Email already exists for another user." });
        }

        const updatedUser = await updateUserService(userId, name, phone_number, email, grade_id); // Call service to update user
        res.json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ error: 'error in updateUserController', message: error.message });
    }
}

// Delete user
export const deleteUserController = async (req, res) => {
    const userId = req.params.id; // Get user ID from URL parameters

    try {
        await deleteUserService(userId); // Call service to delete user
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'error in deleteUserController', message: error.message });
    }
}