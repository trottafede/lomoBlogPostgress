const Comment = require("../models/Comment");
module.exports = {
  index: async (req, res) => {
    const blogs = await Article.findAll();
    res.render("home", { blogs });
  },

  show: async (req, res) => {},
  AdminPage: async (req, res) => {},
  edit: async (req, res) => {},
  destroy: async (req, res) => {},
  update: async (req, res) => {},
  store: async (req, res) => {
    let articleId = req.params.articleId;
    let { name, content } = req.body;

    const comment = new Comment();
    comment.name = name;
    comment.content = content;
    comment.article_id = articleId;

    await comment.save();
    res.redirect(`/articulo/${articleId}`);
  },
  render: async (req, res) => {},
};
