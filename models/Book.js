import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    auteur: [
        {
            name: { type: String, required: true },
        },
    ],
    editeur: { type: String },
    dateDeParution: { type: Date },
    resume: String,
    nombreDePages: { type: Number },
    genre: { type: String },
    format: String,
    saga: String,
    prix: { type: Number, required: true },
    isbn: { type: Number, unique: true },
    nombreDeVentes: { type: Number, default: 0 },
});

bookSchema.index(
    { titre: "text", resume: "text" },
    { weights: { titre: 5, resume: 1 } }
);

bookSchema.index({ dateDeParution: -1 });

bookSchema.index({ genre: 1 });
bookSchema.index({ editeur: 1 });

const Book = mongoose.model("Book", bookSchema);
export default Book;
