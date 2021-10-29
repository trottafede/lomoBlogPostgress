class Model {
  id;
  updated_at = Date.now();
  created_at = Date.now();

  async save() {}
  static find(fields) {}
  static async findById(id) {}
  static async findAll() {}
  async update() {}
  async delete() {}
}
module.exports = Model;
