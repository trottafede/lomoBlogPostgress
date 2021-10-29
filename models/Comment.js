const customQuery = require("../db/customQuery");
class Comment {
  id;
  content;
  article_id;
  updated_at = Date.now();
  created_at = Date.now();

  save() {}
  static find(fields) {}
  static findByPk(id) {}
  static findAll() {}
  update() {}
  delete() {}
}

module.exports = Comment;
