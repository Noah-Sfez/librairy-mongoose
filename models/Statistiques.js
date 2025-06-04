import mongoose from "mongoose";

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

const Statistiques = mongoose.model("Statistiques", statistiquesSchema);
export default Statistiques;
