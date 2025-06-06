import Book from "../models/Book.js";
import dotenv from "dotenv";

dotenv.config();

const books = [
    {
        titre: "Bionicle : Legacy of Evil",
        auteur: [
            {
                name: "Greg Farshtey",
            },
        ],
        editeur: "Scholastic",
        dateDeParution: new Date("2006-09-01"),
        resume: "L'histoire épique de la lutte des Toa pour sauver leur monde.",
        nombreDePages: 126,
        genre: "Fantasy",
        format: "Broché",
        saga: "Bionicle",
        prix: 12.99,
        isbn: 9780439828079,
    },
    {
        titre: "L'essentiel du vocabulaire allemand",
        auteur: [
            {
                name: "Albert Findling",
            },
        ],
        editeur: "Ellipses",
        dateDeParution: new Date("1999-09-01"),
        resume: "Un guide complet pour maîtriser le vocabulaire allemand essentiel.",
        nombreDePages: 159,
        genre: "Langue",
        prix: 13,
        isbn: 9782729849214,
    },
    {
        titre: "Londres et ses environs : le guide complet",
        auteur: [
            {
                name: "Isabelle Allard",
            },
            {
                name: "Véronique de la Cruz",
            },
            {
                name: "Laura Charlot",
            },
            {
                name: "Fiona de Brabander",
            },
            {
                name: "Géraldine Lemaufbeauvois",
            },
            {
                name: "Anne .Zou",
            },
            {
                name: "Alexia Poulain",
            },
        ],
        editeur: "Reynal & Hitchcock",
        dateDeParution: new Date("1943-04-06"),
        resume: "Un jeune prince voyage à travers l'univers et découvre la nature humaine.",
        nombreDePages: 96,
        genre: "Conte",
        format: "Relié",
        saga: "Le Petit Prince",
        prix: 10.99,
        isbn: 9782070612758,
    }
];

const seedBooks = async () => {
    await Book.deleteMany({});
    console.log("Old books deleted");
    await Book.insertMany(books);
    console.log("Seed books inserted");
};

export default seedBooks;
