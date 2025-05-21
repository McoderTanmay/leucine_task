import { ServerDataSource } from "../data-source";
import { Request } from "../entities/RequestEntity";

const RequestRepo = ServerDataSource.getRepository(Request);

export const createRequest = async(req, res)=>{
    try {
        const { accessType, reason} = req.body;
        const status = "Pending";
        RequestRepo.create({accessType, reason, status});
        await RequestRepo.save();
        res.status(201).json({message:"Request successfully created"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const manageRequest = async(req, res) => {
    try {
        const {id} = req.params;
        const { status } = req.body;
        const request = RequestRepo.findOneBy({id});
        if(!request){
            return res.status(404).json({message: "Request bot found"});
        }
        request.status = status;
        await RequestRepo.save();
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}