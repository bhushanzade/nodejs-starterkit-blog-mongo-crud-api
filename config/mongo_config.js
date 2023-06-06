const mongoose = require("mongoose");
if (JSON.parse(process.env.ISLIVE) == true) {
    mongoose.connect(`mongodb://${encodeURIComponent(process.env.DB_UNAME)}:${encodeURIComponent(process.env.DB_PWD)}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=${process.env.DB_SOURCE}`, {
        useNewUrlParser: true
    }).then((result) => console.log("Mongo Connected Live"))
        .catch((err) => console.error(err));
} else {
    mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
        useNewUrlParser: true
    }).then((result) => console.log("Mongo Connected"))
        .catch((err) => console.error(err));
}