const Article = require("../models/Article");
const Author = require("../models/Author");
const nodeMailer = require("../middlewares/nodemailer");
module.exports = {
  index: async (req, res) => {
    const blogs = await Article.findAll();
    res.render("home", { blogs });
  },

  show: async (req, res) => {
    let id = req.params.id;
    const singleBlog = await Article.findById(id); // Model
    res.render("article", { singleBlog }); //View
  },

  AdminPage: async (req, res) => {
    const blogs = await Article.findAll();

    let authors = await Author.findAll();
    res.render("admin", { blogs: blogs, authors: authors });
  },

  edit: async (req, res) => {
    let id = req.params.id;
    const singleBlog = await Article.findById(id); // Model
    res.render("updateArticle", { singleBlog });
  },

  destroy: async (req, res) => {
    let id = req.params.id;
    await Article.deleteById(id); // Model
    res.redirect("/admin"); // View
  },

  update: async (req, res) => {
    const { id, title, content, author_id, image } = req.body;
    const article = new Article();
    article.id = id;
    article.title = title;
    article.content = content;
    article.author_id = author_id;
    article.image = image;

    if (await article.update()) {
      res.redirect("/admin");
    } else {
      res.status(400).send("Hacker sorete no te metas");
    }
  },

  store: async (req, res) => {
    let { title, content, author_id, image } = req.body;
    const article = new Article();
    article.title = title;
    article.content = content;
    article.author_id = author_id;
    article.image = image;

    if (await article.save()) {
      nodeMailer(req.body);
      res.redirect("/admin");
    } else {
      res.status(400).send("Hacker sorete no te metas");
    }
  },
  render: async (req, res) => {
    let users = await Author.findAll();
    res.render("createArticle", { users });
  },
};
