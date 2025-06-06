import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    auteur: [
        {
            name: { type: String, required: true },
        },
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

// Index texte pour la recherche
bookSchema.index(
    { titre: "text", resume: "text" },
    { weights: { titre: 5, resume: 1 } }
);

// Index sur la date de parution (pour trier du plus récent au plus ancien)
bookSchema.index({ dateDeParution: -1 });

// Tu peux aussi indexer d'autres champs filtrés fréquemment, par exemple :
bookSchema.index({ genre: 1 });
bookSchema.index({ editeur: 1 });

const Book = mongoose.model("Book", bookSchema);
export default Book;
