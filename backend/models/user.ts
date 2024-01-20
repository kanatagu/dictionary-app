type UserType = {
  id: string;
  email: string;
  password: string;
};

class User {
  id: string;
  email: string;
  password: string;

  constructor(id: string, email: string, password: string) {
    this.id = id;
    this.email = email;
    this.password = password;
  }
}

// In-memory table
const users: UserType[] = [];

export default {
  User,
  users,
};
