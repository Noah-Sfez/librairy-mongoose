import Client from "../models/Client.js";

export const createClient = async (req, res) => {
    try {
        const Client = await Client.create(req.body);
        res.status(201).json(Client);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getAllClients = async (req, res) => {
    try {
        const Clients = await Client.find();
        res.json(Clients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getClientById = async (req, res) => {
    try {
        const Client = await Client.findById(req.params.id);
        if (Client) res.json(Client);
        else res.status(404).json({ error: "Livre non trouvé" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const updateClient = async (req, res) => {
    try {
        const Client = await Client.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );
        if (Client) res.json(Client);
        else res.status(404).json({ error: "Livre non trouvé" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteClient = async (req, res) => {
    try {
        const Client = await Client.findByIdAndDelete(req.params.id);
        if (Client) res.json({ message: "Livre supprimé" });
        else res.status(404).json({ error: "Livre non trouvé" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
