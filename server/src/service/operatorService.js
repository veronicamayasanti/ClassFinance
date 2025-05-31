import {
    createOperatorModel,
    loginOperatorModel
} from "../models/operatorModels.js";
import bcrypt from "bcrypt";


export const createOperatorService = async (operatorData) => {
    const {name, grade, username, password} = operatorData;
    const hashedPassword = await bcrypt.hash(password, 10);
    return await createOperatorModel(name, grade, username, hashedPassword)
};

export const loginOperatorService = async (username, password) => {
    const results = await loginOperatorModel(username);
    if (results.length === 0) throw new Error('username not found');

    const korlasdb = results[0]
    const validPassword = await bcrypt.compare(password, korlasdb.password);
    if (!validPassword) throw  new Error('Invalid credentials');

    return korlasdb
}