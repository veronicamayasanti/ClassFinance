import {
    createOperatorService,
    loginOperatorService
} from "../services/operatorService.js";

export const createOperatorController = async (req, res) => {
    try{
        await createOperatorService(req.body);
        res.status(201).json({message: 'Create account operator success'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const loginOperatorController = async (req, res) => {
    try{
        const korlas = await  loginOperatorService(req.body.username, req.body.password);
        const {password, ...korlasWithoutPassword} = korlas;
        res.json(korlasWithoutPassword)
    }catch (error){
        res.status(401).json({error: error.message});
    }
}