import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    auteur: [
        {
            name: { type: String, required: true },
        }
    ],
    editeur: { type: String, required: true },
    dateDeParution: { type: Date },
    resume: String,
    nombreDePages: { type: Number },
    genre: { type: String },
    format: String,
    saga: String,
    prix: { type: Number, required: true },
    isbn: { type: Number, required: true, unique: true },
    nombreDeVentes: { type: Number, default: 0 },
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
