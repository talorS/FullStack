const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const conn = require('../configs/subscriptionsDatabase');

let subscriptionSchema = new Schema({
    MemberId : ObjectId,
    Movies : [new Schema({ movieId : ObjectId, 
                date : Date
            }, { _id: false })]
});

module.exports = conn.model('subscriptions',subscriptionSchema);

