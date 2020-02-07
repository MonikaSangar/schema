const mongoose = require('mongoose');

const contact_schema = mongoose.Schema({

    id: {
        type: String,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },


});

module.exports = mongoose.model("userData", contact_schema);