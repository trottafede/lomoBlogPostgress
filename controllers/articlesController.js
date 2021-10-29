const Article = require("../models/Article");
const Comment = require("../models/Comment");
const Author = require("../models/Author");
const nodeMailer = require("../middlewares/nodemailer");
module.exports = {
  index: async (req, res) => {
    const blogs = await Article.findAll();
    let authors = await Author.findAll();
    res.render("home", { blogs, authors });
  },

  show: async (req, res) => {
    let id = req.params.id;
    const singleBlog = await Article.findById(id); // Model
    const comments = await Comment.findByPk(id);
    const author = await Author.findById(singleBlog.author_id);
    res.render("article", { singleBlog, comments, author }); //View
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
    // await Article.delete(id); // Model
    const articleToDelete = new Article();
    articleToDelete.id = id;
    await articleToDelete.delete();
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
    await article.update();

    res.redirect("/admin");
  },

  store: async (req, res) => {
    let { title, content, author_id, image } = req.body;
    const article = new Article();
    article.title = title;
    article.content = content;
    article.author_id = author_id;
    article.image = image;

    await article.save();
    await nodeMailer(req.body);
    res.redirect("/admin");

    // res.status(400).send("Hacker sorete no te metas");
  },
  render: async (req, res) => {
    let users = await Author.findAll();
    res.render("createArticle", { users });
  },
};
