export type CategoryType = {
  id: string;
  name: string;
  userId: string;
};

class Category {
  id: string;
  name: string;
  userId: string;

  constructor(id: string, name: string, userId: string) {
    this.id = id;
    this.name = name;
    this.userId = userId;
  }
}

// In-memory table
const categories: CategoryType[] = [];

export default {
  Category,
  categories,
};
