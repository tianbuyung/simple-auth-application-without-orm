class Users {
  constructor(id, name, password, createdAt) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.createdAt = createdAt;
  }
}

module.exports = { Users };
