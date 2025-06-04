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
        // Récupération des filtres depuis la query string
        const {
            titre,
            auteur,
            editeur,
            genre,
            saga,
            minPrix,
            maxPrix,
            minPages,
            maxPages,
            dateMin,
            dateMax,
            format,
            minVentes,
            maxVentes,
        } = req.query;

        // Construction dynamique du filtre
        let filter = {};

        if (titre) filter.titre = { $regex: titre, $options: "i" };
        if (auteur) filter["auteur.name"] = { $regex: auteur, $options: "i" };
        if (editeur) filter.editeur = { $regex: editeur, $options: "i" };
        if (genre) filter.genre = { $regex: genre, $options: "i" };
        if (saga) filter.saga = { $regex: saga, $options: "i" };
        if (format) filter.format = { $regex: format, $options: "i" };

        if (minPrix || maxPrix) {
            filter.prix = {};
            if (minPrix) filter.prix.$gte = Number(minPrix);
            if (maxPrix) filter.prix.$lte = Number(maxPrix);
        }

        if (minPages || maxPages) {
            filter.nombreDePages = {};
            if (minPages) filter.nombreDePages.$gte = Number(minPages);
            if (maxPages) filter.nombreDePages.$lte = Number(maxPages);
        }

        if (dateMin || dateMax) {
            filter.dateDeParution = {};
            if (dateMin) filter.dateDeParution.$gte = new Date(dateMin);
            if (dateMax) filter.dateDeParution.$lte = new Date(dateMax);
        }

        if (minVentes || maxVentes) {
            filter.nombreDeVentes = {};
            if (minVentes) filter.nombreDeVentes.$gte = Number(minVentes);
            if (maxVentes) filter.nombreDeVentes.$lte = Number(maxVentes);
        }

        const books = await Book.find(filter);
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
