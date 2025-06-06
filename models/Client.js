import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    achatsPrecedents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});

clientSchema.methods.addBook = async function (bookId) {
    if (!this.achatsPrecedents.includes(bookId)) {
        this.achatsPrecedents.push(bookId);
        await this.save();
    }
    return this;
};

const Client = mongoose.model("Client", clientSchema);
export default Client;
