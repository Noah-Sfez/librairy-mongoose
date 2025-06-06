import Client from "../models/Client.js";

export const createClient = async (req, res) => {
    try {
        const client = await Client.create(req.body);
        res.status(201).json(client);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getAllClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (client) res.json(client);
        else res.status(404).json({ error: "Client non trouvé" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const updateClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (client) res.json(client);
        else res.status(404).json({ error: "Client non trouvé" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (client) res.json({ message: "Client supprimé" });
        else res.status(404).json({ error: "Client non trouvé" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
