import Library from "../models/Library.js";

export const createLibrary = async (req, res) => {
    try {
        const Library = await Library.create(req.body);
        res.status(201).json(Library);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getAllLibraries = async (req, res) => {
    try {
        const Libraries = await Library.find().populate("livres.livre");
        res.json(Libraries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getLibraryById = async (req, res) => {
    try {
        const Library = await Library.findById(req.params.id).populate(
            "livres.livre"
        );
        if (Library) res.json(Library);
        else res.status(404).json({ error: "Livre non trouvé" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const updateLibrary = async (req, res) => {
    try {
        const Library = await Library.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );
        if (Library) res.json(Library);
        else res.status(404).json({ error: "Livre non trouvé" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteLibrary = async (req, res) => {
    try {
        const Library = await Library.findByIdAndDelete(req.params.id);
        if (Library) res.json({ message: "Livre supprimé" });
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
