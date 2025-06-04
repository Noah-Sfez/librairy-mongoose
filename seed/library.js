import Library from "../models/Library.js";
import dotenv from "dotenv";

dotenv.config();

const libraries = [
    {
        nom: "Bibliothèque Centrale",
        localisation: "Centre-ville",
        livres: [
            {
                stock: 10,
                livre: "684051c829dbf43bbb9c533b", // Example Book ID
            },
            {
                stock: 5,
                livre: "684051c829dbf43bbb9c533d", // Example Book ID
            },
        ],
    },
    {
        nom: "Médiathèque",
        localisation: "Quartier Est",
        livres: [
            {
                stock: 8,
                livre: "684051c829dbf43bbb9c533b", // Example Book ID
            },
            {
                stock: 3,
                livre: "684051c829dbf43bbb9c533d", // Example Book ID
            },
            {
                stock: 2,
                livre: "684051c829dbf43bbb9c533f", // Example Book ID
            },
        ],
    },
    {
        nom: "Bibliothèque Municipale",
        localisation: "Quartier Ouest",
        livres: [],
    },
];

const seedLibrary = async () => {
    await Library.deleteMany({});
    console.log("Old libraries deleted");
    await Library.insertMany(libraries);
    console.log("Seed libraries inserted");
};

export default seedLibrary;
