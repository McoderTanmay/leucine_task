import { Software } from "../entities/SoftwareEntity.js";
import { ServerDataSource } from "../data-source.js";

const softwareRepo = ServerDataSource.getRepository(Software);

const addSoftware = async(req, res)=>{
    try {
        const { name, description, accessLevels } = req.body;
        const newSoftware = softwareRepo.create({name, description, accessLevels});
        await softwareRepo.save(newSoftware);
        res.status(201).json({message: "software successfully created"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
const getAllSoftwares = async (req, res)=>{
    try {
        const softwares = await softwareRepo.find();
        res.status(201).json({data:softwares});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
export { addSoftware, getAllSoftwares }