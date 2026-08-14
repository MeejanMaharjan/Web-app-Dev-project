
import TvShow from "../data/TvShows.js";

async function getTvShows() {
    const shows = await TvShow.find({});
    return shows;
}

async function addTvShow(newShow) {
    const show = await TvShow.create(newShow);
    return show;
}

async function updateTvShow(id, updatedShow) {
    const show = await TvShow.findByIdAndUpdate(id, updatedShow, { new: true });
    return show;
}

async function deleteTvShow(id) {
    const show = await TvShow.findByIdAndDelete(id);
    return show;
}

export { getTvShows, addTvShow, updateTvShow, deleteTvShow };
