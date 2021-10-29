const customQuery = require("../db/customQuery");
class Article {
  id;
  title;
  content;
  image;
  author_id;
  created_at = Date.now();

  rules = {
    title_length_max: 255,
    title_length_min: 5,
    content_length_max: 21844,
    content_length_min: 5,
    author_id_length_max: 255,
    author_id_length_min: 1,
    image_length_max: 21844,
    image_length_min: 5,
  };

  async save() {
    if (
      this.title.length <= this.rules.title_length_max &&
      this.title.length >= this.rules.title_length_min &&
      this.content.length <= this.rules.content_length_max &&
      this.content.length >= this.rules.content_length_min &&
      this.author_id.length <= this.rules.author_id_length_max &&
      this.author_id.length >= this.rules.author_id_length_min &&
      this.image.length <= this.rules.image_length_max &&
      this.image.length >= this.rules.image_length_min
    ) {
      let fecha = new Date();
      const query = {
        text: `INSERT INTO articles (title, content, author_id, image, created_at) VALUES ($1,$2,$3,$4,$5)`,
        values: [this.title, this.content, this.author_id, this.image, fecha],
      };
      customQuery(query);
      return true;
    } else {
      return undefined;
    }
  }

  static async findById(id) {
    const query = {
      text: `SELECT * FROM articles WHERE id = $1`,
      values: [id],
    };
    const article = await customQuery(query);
    return article.rows[0];
  }

  static async findAll() {
    const query = {
      text: `SELECT * from articles ORDER BY created_at DESC`,
    };

    const articles = await customQuery(query);
    return articles.rows;
  }
  async update() {
    if (
      this.title.length <= this.rules.title_length_max &&
      this.title.length >= this.rules.title_length_min &&
      this.content.length <= this.rules.content_length_max &&
      this.content.length >= this.rules.content_length_min &&
      this.author_id.length <= this.rules.author_id_length_max &&
      this.author_id.length >= this.rules.author_id_length_min &&
      this.image.length <= this.rules.image_length_max &&
      this.image.length >= this.rules.image_length_min
    ) {
      let fecha = new Date();
      const query = {
        text: "UPDATE articles SET title = ($1), content = ($2), author_id = ($3), image = ($4), created_at = ($5) WHERE id = ($6)",
        values: [
          this.title,
          this.content,
          this.author_id,
          this.image,
          fecha,
          this.id,
        ],
      };
      await customQuery(query);
      return true;
    } else {
      return undefined;
    }
  }
  static async deleteById(id) {
    const query = {
      text: `DELETE FROM articles WHERE id = ($1)`,
      values: [id],
    };
    await customQuery(query);
  }
}

module.exports = Article;
