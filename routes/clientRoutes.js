import { Router } from "express";
import {
    createClient,
    getAllClients,
    getClientById,
    updateClient,
    deleteClient,
    getClientStats,
    addBookToClient,
} from "../controller/clientController.js";

const router = Router();

router.post("/", createClient);

router.get("/stats", getClientStats);
router.get("/", getAllClients);
router.get("/:id", getClientById);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

router.post("/:clientId/add-book", async (req, res) => {
    req.body.clientId = req.params.clientId;
    await addBookToClient(req, res);
});

export default router;
