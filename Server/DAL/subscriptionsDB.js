const subscriptionsModel = require('../models/subscriptionsModel');
const moviesModel = require('../models/moviesModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.getSubscriptions = function () {
    return new Promise((resolve, reject) => {
        subscriptionsModel.find({}, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    });
}

exports.getSubscription = function (id) {
    return new Promise((resolve, reject) => {
        subscriptionsModel.findById(id, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    });
}

exports.addSubscription = function (obj) {
    const o_id = new ObjectId(obj.MemberId.toString());
    return new Promise((resolve, reject) => {
        subscriptionsModel.findOneAndUpdate({ MemberId: o_id }, { $push: { Movies: obj.Movie } },
            { upsert: true, new: true, setDefaultsOnInsert: true, useFindAndModify: false },
            function (err) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve('200');
                }
            });
    })
}

exports.deleteSubscription = function (id) {
    const o_id = new ObjectId(id.toString());
    return new Promise((resolve, reject) => {
        subscriptionsModel.findOneAndRemove({ MemberId: o_id }, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve('200');
            }
        });
    })
}

exports.deleteMovieFromSubscriptions = function (id) {
    const o_id = new ObjectId(id.toString());
    return new Promise((resolve, reject) => {
        subscriptionsModel.updateMany({},
            { $pull: { Movies: { movieId: o_id } } },
            function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve('200');
                }
            });
    })
}

exports.deleteEmptySubscriptions = function () {
    return new Promise((resolve, reject) => {
        subscriptionsModel.deleteMany({ Movies: { $exists: true, $size: 0 } },
            function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve('200');
                }
            });
    })
}

exports.getWatchedMovies = function (id) {
    const o_id = new ObjectId(id.toString());
    return new Promise((resolve, reject) => {
        subscriptionsModel.find({ MemberId: o_id }, function (err, movies) {
            if (err) {
                reject(err);
            }
            else {
                resolve(movies);
            }
        })
    });
}

exports.getUnWatchedMovies = function (movies) {
    return new Promise((resolve, reject) => {
        moviesModel.find({ _id: { "$nin": movies } }, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    });
}

exports.getWatchedMembers = function (id) {
    const o_id = new ObjectId(id.toString());
    return new Promise((resolve, reject) => {
        subscriptionsModel.find({ "Movies.movieId": o_id }, function (err, members) {
            if (err) {
                reject(err);
            }
            else {
                resolve(members);
            }
        })
    });
}