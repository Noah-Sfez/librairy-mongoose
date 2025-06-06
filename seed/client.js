import Client from "../models/Client.js";
import Book from "../models/Book.js";
import dotenv from "dotenv";

dotenv.config();

const getRandomBookIds = (allBooks, size = 2) => {
    const selected = [];
    const usedIndexes = new Set();
    while (selected.length < size && selected.length < allBooks.length) {
        const randomIndex = Math.floor(Math.random() * allBooks.length);
        if (!usedIndexes.has(randomIndex)) {
            usedIndexes.add(randomIndex);
            selected.push(allBooks[randomIndex]._id);
        }
    }
    return selected;
};

const seedClients = async () => {
    await Client.deleteMany({});
    console.log("Old clients deleted");

    const allBooks = await Book.find({}, "_id");

    const clients = [
        {
            name: "Alice Dupont",
            email: "alice.dupont@example.com",
            age: 30,
            achatsPrecedents: getRandomBookIds(allBooks, 2),
        },
        {
            name: "Bob Martin",
            email: "bob.martin@example.com",
            age: 25,
            achatsPrecedents: getRandomBookIds(allBooks, 1),
        },
        {
            name: "Charlie Durand",
            email: "charlie.durand@example.com",
            age: 35,
            achatsPrecedents: getRandomBookIds(allBooks, 3),
        },
    ];

    await Client.insertMany(clients);
    console.log("Seed clients inserted");
};

export default seedClients;
