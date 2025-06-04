import mongoose from "mongoose";
import seedBooks from "./book.js";
import seedLibrary from "./library.js";
import seedClients from "./client.js";

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");

        await seedBooks();
        await seedLibrary();
        await seedClients();
        process.exit(0);
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(0);
    }
};

seed();
