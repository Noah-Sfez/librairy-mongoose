import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    achatsPrecedents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});

const Client = mongoose.model("Client", clientSchema);
export default Client;
