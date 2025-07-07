import {
    checkEmailExists,
    registerUserservice,
    loginUserService,
    getAllUserService,
    getUserByIdService,
    getUsersByRoleService,
    getUsersByGradeService,
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
    const roleId = req.query.roleId ? parseInt(req.query.roleId) : null; // Parse roleId as integer
    const gradeId = req.query.gradeId ? parseInt(req.query.gradeId) : null; // Parse gradeId as integer
    const offset = (page - 1) * limit;

    try {
        const { users, totalCount } = await getAllUserService(offset, limit, searchTerm, roleId, gradeId);
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
};

// Get user by ID
export const getUserByIdController = async (req, res) => {
    const userId = req.params.id; // Ambil ID dari parameter URL

    try {
        const user = await getUserByIdService(userId); // Panggil service untuk mendapatkan pengguna
        const {password, ...userByIdWithoutPassword} = user;
        res.json(userByIdWithoutPassword);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(404).json({ error: error.message });
    }
}

// Get users by role_id
export const getUsersByRoleController = async (req, res) => {
    const roleId = req.params.roleId; // Ambil roleId dari parameter URL

    try {
        const users = await getUsersByRoleService(roleId); // Panggil service untuk mendapatkan pengguna
        // Sembunyikan password dari hasil
        const usersWithoutPassword = users.map(({ password, ...rest }) => rest); // Menggunakan destructuring untuk menghapus password

        res.json(usersWithoutPassword); // Kirim kembali data pengguna tanpa password
    } catch (error) {
        console.error("Error fetching users by role:", error);
        res.status(500).json({ error: error.message });
    }
}

// Get users by grade_id
export const getUsersByGradeController = async (req, res) => {
    const gradeId = req.params.gradeId; // Ambil roleId dari parameter URL

    try {
        const users = await getUsersByGradeService(gradeId); // Panggil service untuk mendapatkan pengguna
        // Sembunyikan password dari hasil
        const usersWithoutPassword = users.map(({ password, ...rest }) => rest); // Menggunakan destructuring untuk menghapus password

        res.json(usersWithoutPassword); // Kirim kembali data pengguna tanpa password
    } catch (error) {
        console.error("Error fetching users by role:", error);
        res.status(500).json({ error: error.message });
    }
}

// Update user
export const updateUserController = async (req, res) => {
    const userId = req.params.id; // Get user ID from URL parameters
    const { name, phone_number, email, grade_id } = req.body;  // Get updated user data from request body
    try {
        // Dapatkan user saat ini dari database
        const currentUser = await getUserByIdService(userId);

        // Cek apakah email yang di-input baru berbeda dari email yang saat ini
        if (currentUser.email !== email) {
            const emailExists = await checkEmailExists(email);
            if (emailExists) {
                return res.status(400).json({ error: "Email already exists for another user." });
            }
        }

        await updateUserService(userId, name, phone_number, email, grade_id); // Call service to update user
        res.json({ message: 'User updated successfully', user: req.body });
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

