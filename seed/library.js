import Library from "../models/Library.js";
import Book from "../models/Book.js";
import dotenv from "dotenv";
import mongoose from "mongoose";


dotenv.config();

const getRandomBooks = (allBooks, size = 3) => {
    const selected = [];
    const usedIndexes = new Set();
    while (selected.length < size && selected.length < allBooks.length) {
        const randomIndex = Math.floor(Math.random() * allBooks.length);
        if (!usedIndexes.has(randomIndex)) {
            usedIndexes.add(randomIndex);
            selected.push({
                stock: Math.floor(Math.random() * 10) + 1,
                livre: allBooks[randomIndex]._id,
            });
        }
    }
    return selected;
};

const seedLibrary = async () => {
    await Library.deleteMany({});
    console.log("Old libraries deleted");

    const allBooks = await Book.find({}, "_id");
    const libraries = [
        {
            nom: "Bibliothèque Centrale",
            localisation: "Centre-ville",
            livres: getRandomBooks(allBooks, 3),
        },
        {
            nom: "Médiathèque",
            localisation: "Quartier Est",
            livres: getRandomBooks(allBooks, 4),
        },
        {
            nom: "Bibliothèque Municipale",
            localisation: "Quartier Ouest",
            livres: getRandomBooks(allBooks, 2),
        },
    ];

    await Library.insertMany(libraries);
    console.log("Seed libraries inserted");
};

export default seedLibrary;
