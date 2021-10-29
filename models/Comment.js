const customQuery = require("../db/customQuery");
const Model = require("./Model");
class Comment extends Model {
  name;
  content;
  article_id;

  rules = {
    name_length_max: 255,
    name_length_min: 5,
    content_length_max: 21844,
    content_length_min: 5,
  };

  async save() {
    if (
      this.name.length <= this.rules.name_length_max &&
      this.name.length >= this.rules.name_length_min &&
      this.content.length <= this.rules.content_length_max &&
      this.content.length >= this.rules.content_length_min
    ) {
      const query = {
        text: `INSERT INTO comments (name, content, article_id) VALUES ($1,$2,$3)`,
        values: [this.name, this.content, this.article_id],
      };
      customQuery(query);
      return true;
    } else {
      return 0;
    }
  }
  static find(fields) {}
  static async findByPk(id) {
    const query = {
      text: `SELECT * FROM comments WHERE article_id = $1`,
      values: [id],
    };
    const article = await customQuery(query);
    return article.rows;
  }
  static async findAll() {
    const query = {
      text: `SELECT * from comments ORDER BY created_at DESC`,
    };

    const comments = await customQuery(query);
    return comments.rows;
  }
  update() {}
  delete() {}
}

module.exports = Comment;
