import { ServerDataSource } from "../data-source.js";
import { Request } from "../entities/RequestEntity.js";
import { User } from "../entities/User.js";
import { Software } from "../entities/SoftwareEntity.js";

const RequestRepo = ServerDataSource.getRepository(Request);
const UserRepo = ServerDataSource.getRepository(User);
const SoftwareRepo = ServerDataSource.getRepository(Software);

export const createRequest = async (req, res) => {
  try {
    const { softwareId, accessType, reason } = req.body;

    const userId = req.user.id;

    const user = await UserRepo.findOneBy({ id: userId });
    const software = await SoftwareRepo.findOneBy({ id: softwareId });

    if (!user || !software) {
      return res.status(404).json({ message: "User or Software not found" });
    }

    const status = "Pending";

    const newRequest = RequestRepo.create({
      user,
      software,
      accessType,
      reason,
      status,
    });

    await RequestRepo.save(newRequest);

    res.status(201).json({ message: "Request successfully created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const manageRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const request = await RequestRepo.findOne({
      where: { id: parseInt(id) },
      relations: ["user", "software"],
    });

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = status;
    await RequestRepo.save(request);

    res.status(200).json({ message: "Request status updated successfully" });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: error.message });
  }
};

export const getRequests = async (req, res) => {
    try {
        const requests = await RequestRepo.find();
        res.status(201).json({data: requests});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}