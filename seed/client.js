import Client from "../models/Client.js";
import dotenv from "dotenv";

dotenv.config();

const clients = [
    {
        name: "Alice Dupont",
        email: "alice.dupont@example.com",
        age: 30,
        achatsPrecedents: [
            "684051c829dbf43bbb9c533b", // Example Book ID
            "684051c829dbf43bbb9c533d", // Example Book ID
        ],
    },
    {
        name: "Bob Martin",
        email: "bob.martin@example.com",
        age: 25,
        achatsPrecedents: ["684051c829dbf43bbb9c533b"],
    },
    {
        name: "Charlie Durand",
        email: "charlie.durand@example.com",
        age: 35,
        achatsPrecedents: ["684051c829dbf43bbb9c533b"],
    },
];

const seedClients = async () => {
    await Client.deleteMany({});
    console.log("Old clients deleted");
    await Client.insertMany(clients);
    console.log("Seed clients inserted");
};

export default seedClients;
