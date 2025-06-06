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
            text,
            sort = "dateDeParution",
            order = "desc",
            page = 1,
            limit = 10,
            isbn,
        } = req.query;

        let filter = {};

        const regexFields = [
            { key: "titre", path: "titre" },
            { key: "auteur", path: "auteur.name" },
            { key: "editeur", path: "editeur" },
            { key: "genre", path: "genre" },
            { key: "saga", path: "saga" },
            { key: "format", path: "format" },
        ];
        regexFields.forEach(({ key, path }) => {
            if (req.query[key])
                filter[path] = { $regex: req.query[key], $options: "i" };
        });

        const rangeFields = [
            { min: "minPrix", max: "maxPrix", path: "prix" },
            { min: "minPages", max: "maxPages", path: "nombreDePages" },
            {
                min: "dateMin",
                max: "dateMax",
                path: "dateDeParution",
                isDate: true,
            },
            { min: "minVentes", max: "maxVentes", path: "nombreDeVentes" },
        ];
        rangeFields.forEach(({ min, max, path, isDate }) => {
            if (req.query[min] || req.query[max]) {
                filter[path] = {};
                if (req.query[min])
                    filter[path].$gte = isDate
                        ? new Date(req.query[min])
                        : Number(req.query[min]);
                if (req.query[max])
                    filter[path].$lte = isDate
                        ? new Date(req.query[max])
                        : Number(req.query[max]);
            }
        });

        if (isbn) {
            filter.isbn = Number(isbn);
        }
        const sortField = sort;
        const sortOrder = order === "asc" ? 1 : -1;
        const sortObj = {};
        sortObj[sortField] = sortOrder;

        const skip = (parseInt(page) - 1) * parseInt(limit);

        if (text) {
            const books = await Book.find(
                { ...filter, $text: { $search: text } },
                { score: { $meta: "textScore" } }
            )
                .sort({ score: { $meta: "textScore" }, ...sortObj })
                .skip(skip)
                .limit(parseInt(limit));
            return res.json(books);
        }

        const books = await Book.find(filter)
            .sort(sortObj)
            .skip(skip)
            .limit(parseInt(limit));
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

export const searchBooks = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q)
            return res
                .status(400)
                .json({ error: "Paramètre de recherche manquant" });

        const titreResults = await Book.find({
            titre: { $regex: q, $options: "i" },
        });

        const titreIds = titreResults.map((book) => book._id);
        const resumeResults = await Book.find({
            _id: { $nin: titreIds },
            resume: { $regex: q, $options: "i" },
        });

        const results = [...titreResults, ...resumeResults];

        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getBookStats = async (req, res) => {
    try {
        const stats = await Book.aggregate([
            {
                $facet: {
                    totalLivres: [{ $count: "count" }],
                    prixMoyen: [
                        { $group: { _id: null, avgPrix: { $avg: "$prix" } } },
                    ],
                    livresParGenre: [
                        { $group: { _id: "$genre", count: { $sum: 1 } } },
                    ],
                },
            },
        ]);

        res.json({
            totalLivres: stats[0].totalLivres[0]?.count || 0,
            prixMoyen: stats[0].prixMoyen[0]?.avgPrix || 0,
            livresParGenre: stats[0].livresParGenre,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
