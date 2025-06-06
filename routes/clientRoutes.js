import { Router } from "express";
import {
    createClient,
    getAllClients,
    getClientById,
    updateClient,
    deleteClient,
    getClientStats,
} from "../controller/clientController.js";

const router = Router();

router.post("/", createClient);

router.get("/stats", getClientStats);
router.get("/", getAllClients);
router.get("/:id", getClientById);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

export default router;
