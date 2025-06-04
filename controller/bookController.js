import Book from "../models/Book.js";

export const createBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) res.json(book);
        else res.status(404).json({ error: "Livre non trouvé" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (book) res.json(book);
        else res.status(404).json({ error: "Livre non trouvé" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (book) res.json({ message: "Livre supprimé" });
        else res.status(404).json({ error: "Livre non trouvé" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
