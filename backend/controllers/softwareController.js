import { Software } from "../entities/SoftwareEntity.js";
import { ServerDataSource } from "../data-source";

const softwareRepo = ServerDataSource.getRepository(Software);

const addSoftware = async(req, res)=>{
    try {
        const { name, description, accessLevels } = req.body;
        softwareRepo.create({name, description, accessLevels});
        await softwareRepo.save();
        res.status(201).json({message: "software successfully created"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export { addSoftware }