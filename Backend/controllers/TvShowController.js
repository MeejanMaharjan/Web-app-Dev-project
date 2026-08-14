
import { isValidObjectId } from 'mongoose';
import * as TvShowModel from '../models/TvShowModels.js';

export async function getTvShows(req, res) {
    try {
        const shows = await TvShowModel.getTvShows();
        return res.status(200).json(shows);
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch TV shows", details: error.message });
    }
}

export async function addTvShow(req, res) {
    const newShow = req.body;
    if (!newShow.title || !newShow.genre || !newShow.year) {
        return res.status(400).json({ error: "Missing required TV show information" });
    }
    try {
        const addedShow = await TvShowModel.addTvShow(newShow);
        return res.status(201).json({ message: "TV show added successfully", show: addedShow });
    } catch (error) {
        return res.status(500).json({ error: "Failed to add TV show", details: error.message });
    }
}

export async function updateTvShow(req, res) {
    const showID = req.params.id;
    const updatedShowData = req.body;

    if (!isValidObjectId(showID)) {
        return res.status(404).json({ error: "TV show not found" });
    }

    try {
        const updated = await TvShowModel.updateTvShow(showID, updatedShowData);

        if (!updated) {
            return res.status(404).json({ error: "TV show not found" });
        }

        return res.status(200).json({ message: "TV show updated successfully", show: updated });

    } catch (error) {
        return res.status(500).json({ error: "Failed to update TV show", details: error.message });
    }
}

export async function deleteTvShow(req, res) {
    const showID = req.params.id;

    if (!isValidObjectId(showID)) {
        return res.status(404).json({ error: "TV show not found" });
    }

    try {
        const deleted = await TvShowModel.deleteTvShow(showID);

        if (!deleted) {
            return res.status(404).json({ error: "TV show not found" });
        }

        return res.status(200).json({ message: "TV show deleted successfully" });

    } catch (error) {
        return res.status(500).json({ error: "Failed to delete TV show", details: error.message });
    }
}
