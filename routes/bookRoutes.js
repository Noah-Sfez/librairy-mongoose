import { Router } from "express";
import {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
    searchBooks,
    getBookStats,
} from "../controller/bookController.js";

const router = Router();

router.post("/", createBook);
router.get("/search", searchBooks);
router.get("/stats", getBookStats);
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
