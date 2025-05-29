import {
    createOperatorService
} from "../service/operatorService.js";

export const createOperatorController = async (req, res) => {
    try{
        await createOperatorService(req.body);
        res.status(201).json({message: 'Create account operator success'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}