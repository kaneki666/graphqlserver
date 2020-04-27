const mongoose = require("mongoose");

const ChampSchema = new mongoose.Schema({
  name: String,
  damagetype: String,
  id: String,
  lane: String,
  playstyle: String,
  champimage: String,
});

module.exports = mongoose.model("champs", ChampSchema);
