const moviesModel = require('../models/moviesModel');

exports.countMovies = function()
{
    return new Promise((resolve, reject) =>
    {
        moviesModel.countDocuments({}, function(err, count)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(count);
            }
        })
    });
}

exports.getMovies = function()
{
    return new Promise((resolve, reject) =>
    {
        moviesModel.find({}, function(err, movies)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(movies);
            }
        })
    });
}

exports.getMovie = function(id)
{
    return new Promise((resolve, reject) =>
    {
        moviesModel.findById(id, function(err, movie)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(movie);
            }
        })
    });
}

exports.addMovie = function(obj)
{
    return new Promise((resolve,reject) =>
    {
        let movie = new moviesModel(obj);

        movie.save(err =>
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    resolve('200');
                }
            })
    });
}

exports.updateMovie = function(id,obj)
{
    return new Promise((resolve,reject) =>
    {
        moviesModel.findByIdAndUpdate(id, obj, function(err,movie)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve('200');
            }
        });
    })
}

exports.deleteMovie = function(id)
{
    return new Promise((resolve,reject) =>
    {
        moviesModel.findByIdAndDelete(id,function(err,movie)
        {

            if(err)
            {
                reject(err);
            }
            else
            {
                resolve('200');
            }
        });
    })
}