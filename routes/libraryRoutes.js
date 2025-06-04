import { Router } from "express";
import {
    createLibrary,
    getAllLibraries,
    getLibraryById,
    updateLibrary,
    deleteLibrary,
} from "../controller/libraryController.js";

const router = Router();

router.post("/", createLibrary);
router.get("/", getAllLibraries);
router.get("/:id", getLibraryById);
router.put("/:id", updateLibrary);
router.delete("/:id", deleteLibrary);

export default router;
