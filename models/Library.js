import mongoose from "mongoose";

const librarySchema = new mongoose.Schema({
    nom: { type: String, required: true },
    localisation: { type: String, required: true },
    livres: [
        {
            stock: { type: Number, required: true },
            livre: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
        },
    ],
});

const Library = mongoose.model("Library", librarySchema);
export default Library;
