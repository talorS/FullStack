const dalDB = require('../DAL/subscriptionsDB');

exports.getSubscriptions = async () =>
{
    return await dalDB.getSubscriptions().catch(err => {return err;});
}

exports.getSubscription = async function(id)
{
    return await dalDB.getSubscription(id).catch(err => {return err;});
}

exports.addSubscription = async function(obj)
{
    return await dalDB.addSubscription(obj).catch(err => {return err;});
}

exports.deleteSubscription = async function(id)
{
    return await dalDB.deleteSubscription(id).catch(err => {return err;});
}

exports.deleteSubscriptions = async function(id)
{
    return await dalDB.deleteSubscriptions(id).catch(err => {return err;});
}

exports.getWatchedMovies = async function(id)
{
    return await dalDB.getWatchedMovies(id).catch(err => {return err;});
}

exports.getUnWatchedMovies = async function(movies)
{
    return await dalDB.getUnWatchedMovies(movies).catch(err => {return err;});
}

exports.getWatchedMembers = async function (movieId) {
    return await dalDB.getWatchedMembers(movieId).catch(err => {return err;});
}

exports.deleteMovieFromSubscriptions = async function (movieId) {
    await dalDB.deleteMovieFromSubscriptions(movieId).catch(err => {return err;});
    return await dalDB.deleteEmptySubscriptions().catch(err => {return err;});
}