const dalRest = require('../DAL/moviesRestApi');
const dalDB = require('../DAL/moviesDB');

exports.insertMoviesToDB = async () => {
    const counter = await dalDB.countMovies().catch(err => {return err;});
    if (counter == 0) {
        const resp = await dalRest.getMovies().catch(err => {return err;});
        resp.data.forEach(async (movie) => {
            const obj = {
                Name: movie.name,
                Genres: movie.genres,
                Image: movie.image.medium,
                Premiered : new Date(movie.premiered)
            };
            await dalDB.addMovie(obj).catch(err => {return err;});
        });
    }
}

exports.getMovies = async () =>
{
    return await dalDB.getMovies().catch(err => {return err;});
}

exports.getMovie = async function(id)
{
    return await dalDB.getMovie(id).catch(err => {return err;});
}

exports.addMovie = async function(obj)
{
    return await dalDB.addMovie(obj).catch(err => {return err;});
}

exports.updateMovie = async function(id,obj)
{
    return await dalDB.updateMovie(id,obj).catch(err => {return err;});
}

exports.deleteMovie = async function(id)
{
    return await dalDB.deleteMovie(id).catch(err => {return err;});
}