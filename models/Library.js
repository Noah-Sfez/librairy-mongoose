const mongoose = require("mongoose");

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

module.exports = mongoose.model("Library", librarySchema);
