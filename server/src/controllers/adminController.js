import {
    loginAdminService
} from "../services/adminService.js";

export const loginAdminController = async (req, res) => {
    try{
        const admin = await loginAdminService(req.body.email, req.body.password);
        const {password, ...admminWithoutPassword} = admin;
        res.json(admminWithoutPassword)
    }catch (error){
        res.status(401).json({error: error.message});
    }
}