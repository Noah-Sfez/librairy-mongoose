import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    auteur: String,
    editeur: { type: String, required: true },
    dateDeParution: { type: Date, required: true },
    resume: String,
    nombreDePages: { type: Number, required: true },
    genre: { type: String, required: true },
    format: String,
    saga: String,
    prix: { type: Number, required: true },
    isbn: { type: Number, required: true, unique: true },
    nombreDeVentes: { type: Number, default: 0 },
});

module.exports = mongoose.model("Book", bookSchema);
