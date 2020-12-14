const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  published: {
    type: Boolean,
    required: true,
  },
  tags: {
    type: [{ type: String }],
  },
  series: String,
  body_markdown: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Article", articleSchema);
