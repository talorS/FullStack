const axios = require('axios');
const url = "http://localhost:3001/api/subscriptions";

exports.getSubscriptions = async function () {
    const resp = await axios.get(url).catch((err) => { return err; });
    return resp.data;
}

exports.getSubscription = async function (id) {
    const resp = await axios.get(url + '/' + id).catch((err) => { return err; });
    return resp.data;
}

exports.addSubscription = async function (data) {
    const resp = await axios.post(url, data).catch((err) => { return err; });
    return resp.data;
}

exports.getWatchedMovies = async function (id) {
    let movies = [];
    let resp = await axios.get(url + '/getWatchedMovies/' + id).catch((err) => { return err; });
    resp = resp.data.find(x => x.MemberId.toString() === id.toString());
    if (resp) {
        for (const movie of resp.Movies) {
            let obj = {};
            obj["id"] = movie.movieId;
            obj["date"] = movie.date;
            const res = await axios.get("http://localhost:3001/api/movies/" + obj.id).catch((err) => { return err; });
            obj["name"] = res.data.Name;
            movies.push(obj);
        }
    }
    return movies;
}

exports.getUnWatchedMovies = async function (id) {
    let unWatchedMovies = [];
    let resp = await axios.get(url + '/getWatchedMovies/' + id).catch((err) => { return err; });
    let watchedMovies = resp.data.find(x => x.MemberId.toString() === id.toString());

    if (watchedMovies) {
        watchedMovies = watchedMovies.Movies.map(x => x.movieId);
        resp = await axios.get(url + '/getUnWatchedMovies/' + JSON.stringify(watchedMovies)).catch((err) => { return err; });
        resp.data.forEach(x => {
            let obj = {};
            obj["name"] = x.Name;
            obj["id"] = x._id;
            unWatchedMovies.push(obj);
        });

    } else {
        resp = await axios.get("http://localhost:3001/api/movies").catch((err) => { return err; });
        resp.data.forEach(x => {
            let obj = {};
            obj["name"] = x.Name;
            obj["id"] = x._id;
            unWatchedMovies.push(obj);
        });
    }

    return unWatchedMovies;
}

exports.getWatchedMembers = async function (movieId) {
    let members = [];
    let resp = await axios.get(url + '/getWatchedMembers/' + movieId).catch((err) => { return err; });
    for (const doc of resp.data) {
        let obj = {};
        const memberId = doc.MemberId;
        obj["id"] = memberId;
        obj["date"] = doc.Movies.find(x => x.movieId.toString() === movieId.toString()).date;
        const snap = await axios.get("http://localhost:3001/api/members/" + memberId).catch((err) => { return err; });
        obj["name"] = snap.data.Name;
        members.push(obj);
      }
    return members;
}