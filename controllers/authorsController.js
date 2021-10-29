const Article = require("../models/Article");
const Author = require("../models/Author");
module.exports = {
  index: async (req, res) => {},
  show: async (req, res) => {},
  edit: async (req, res) => {},
  destroy: async (req, res) => {},
  update: async (req, res) => {},

  store: async (req, res) => {
    let { name, lastname, email } = req.body;
    const author = new Author();
    author.name = name;
    author.lastname = lastname;
    author.email = email;
    await author.save();
    res.redirect("/admin");
    // res.status(400).send("Hacker sorete no te metas");
  },
  render: (req, res) => {
    res.render("createAuthor");
  },
};
