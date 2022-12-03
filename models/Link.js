const { Schema, model } = require("mongoose");

const linkSchema = new Schema({
  longUrl: { type: String, required: true },
  shortUrl: { type: String, required: true },
  date: { type: String, default: Date.now },
  clickCount: { type: Number, default: 0 },
},{
  versionKey: false
})

module.exports = model("Link", linkSchema);
