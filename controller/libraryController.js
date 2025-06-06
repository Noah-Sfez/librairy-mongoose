import Library from "../models/Library.js";

export const createLibrary = async (req, res) => {
    try {
        const library = await Library.create(req.body);
        res.status(201).json(library);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getAllLibraries = async (req, res) => {
    try {
        const shouldPopulate = req.query.populate === "true";
        let query = Library.find();
        if (shouldPopulate) {
            query = query.populate("livres.livre");
        }
        const libraries = await query;
        res.json(libraries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getLibraryById = async (req, res) => {
    try {
        const library = await Library.findById(req.params.id).populate(
            "livres.livre"
        );
        if (library) res.json(library);
        else res.status(404).json({ error: "Livre non trouvé" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const updateLibrary = async (req, res) => {
    try {
        const library = await Library.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (library) res.json(library);
        else res.status(404).json({ error: "Livre non trouvé" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteLibrary = async (req, res) => {
    try {
        const library = await Library.findByIdAndDelete(req.params.id);
        if (library) res.json({ message: "Livre supprimé" });
        else res.status(404).json({ error: "Livre non trouvé" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const addBookToLibrary = async (req, res) => {
    try {
        const { libraryId } = req.params;
        const { livre, stock } = req.body;

        const library = await Library.findById(libraryId);
        if (!library) {
            return res.status(404).json({ error: "Librairie non trouvée" });
        }

        library.livres.push({ livre, stock });
        await library.save();

        res.status(200).json(library);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getLibraryStats = async (req, res) => {
    try {
        const stats = await Library.aggregate([
            {
                $project: {
                    livresCount: { $size: { $ifNull: ["$livres", []] } },
                    stockCount: {
                        $sum: {
                            $map: {
                                input: { $ifNull: ["$livres", []] },
                                as: "livre",
                                in: "$$livre.stock",
                            },
                        },
                    },
                    localisation: 1,
                },
            },
            {
                $group: {
                    _id: null,
                    avgLivres: { $avg: "$livresCount" },
                    avgStock: { $avg: "$stockCount" },
                    totalLibraries: { $sum: 1 },
                },
            },
        ]);

        res.json({
            totalLibraries: stats[0]?.totalLibraries || 0,
            livresMoyens: stats[0]?.avgLivres || 0,
            stockMoyen: stats[0]?.avgStock || 0,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
