const mongoose = require("mongoose");

const statistiquesSchema = new mongoose.Schema({
    nombreVentesParLivre: [
        {
            livre: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
            ventes: Number,
        },
    ],
    moyenneAchatsParClient: Number,
    livresLesPlusVendus: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    ],
});

module.exports = mongoose.model("Statistiques", statistiquesSchema);
