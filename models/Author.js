const customQuery = require("../db/customQuery");
const Model = require("./Model");
class Comment extends Model {
  firstname;
  lastname;
  email;

  rules = {
    name_length_max: 255,
    name_length_min: 4,
    lastname_length_max: 255,
    lastname_length_min: 4,
    email_length_max: 255,
    email_length_min: 5,
  };

  async save() {
    if (
      this.name.length <= this.rules.name_length_max &&
      this.name.length >= this.rules.name_length_min &&
      this.lastname.length <= this.rules.lastname_length_max &&
      this.lastname.length >= this.rules.lastname_length_min &&
      this.email.length <= this.rules.email_length_max &&
      this.email.length >= this.rules.email_length_min
    ) {
      const query = {
        text: `INSERT INTO authors (firstname, lastname, email) VALUES ($1,$2,$3)`,
        values: [this.name, this.lastname, this.email],
      };
      customQuery(query);
      return true;
    } else {
      return undefined;
    }
  }

  static find(fields) {}
  static async findById(id) {
    const query = {
      text: `SELECT * FROM authors WHERE id = $1`,
      values: [id],
    };
    const author = await customQuery(query);
    return author.rows[0];
  }
  static async findAll() {
    const query = {
      text: `SELECT * FROM authors `,
    };
    const authors = await customQuery(query);
    return authors.rows;
  }

  async update() {}
  async delete() {}
}

module.exports = Comment;
