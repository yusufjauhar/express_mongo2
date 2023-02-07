const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose.connect("mongodb://yusufjojo:yusufjojo@127.0.0.1/yusuf?authSource=yusuf");
// user, pwd, dbs,

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => console.log("database terhubung"));
