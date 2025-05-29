import {
    createOperatorModel
} from "../models/operatorModels.js";


export const createOperatorService =async (operatorData) => {
    const {name, password} = operatorData;
    return await createOperatorModel(name, password)
}