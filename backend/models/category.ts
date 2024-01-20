export type CategoryType = {
  id: string;
  name: string;
};

class Category {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

// In-memory table
const categories: CategoryType[] = [];

export default {
  Category,
  categories,
};
