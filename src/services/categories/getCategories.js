import Category from "#models/category.model.js";

const DEFAULT_CATEGORIES = [
  { name: "Income", id: 1, color: "#FED057" },
  { name: "Hosehold Products", id: 2, color: "#C5BAFF" },
  { name: "Hosehold Bills", id: 3, color: "#6E78E8" },
  { name: "Leisure", id: 4, color: "#24CCA7" },
  { name: "Car", id: 5, color: "#FD9498" },
  { name: "Education", id: 6, color: "#81E1FF" },
  { name: "Family Activities", id: 7, color: "#4A56E2" },
  { name: "Health", id: 8, color: "#FFD8D0" },
  { name: "Other", id: 9, color: "#00AD84" },
];

const generateCategories = async () => {
  DEFAULT_CATEGORIES.forEach(async (category) => {
    await Category.create(category);
  });
};

export const getCategories = async () => {
  const found = await Category.find({}).lean();

  if (!found || found.length < 1) {
    await generateCategories();
    return DEFAULT_CATEGORIES;
  }
  return found;
};
