import { Router } from "express";
import {
    createLibrary,
    getAllLibraries,
    getLibraryById,
    updateLibrary,
    deleteLibrary,
    addBookToLibrary,
    getLibraryStats,
} from "../controller/libraryController.js";

const router = Router();

router.post("/", createLibrary);
router.get("/stats", getLibraryStats);
router.get("/", getAllLibraries);
router.get("/:id", getLibraryById);
router.put("/:id", updateLibrary);
router.delete("/:id", deleteLibrary);
router.post("/:libraryId/add-book", addBookToLibrary);

export default router;
