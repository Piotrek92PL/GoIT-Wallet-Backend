import * as services from "#services/categories/index.js";

// if valid returns the same number, otherwise returns number of "Other" category
export const getValidCategoryNum = async (categoryNumber) => {
  const num =
    typeof categoryNumber === "number" &&
    categoryNumber != NaN &&
    categoryNumber > 0
      ? categoryNumber
      : false;
  const categories = await services.getCategories();
  const isCatNum = num
    ? (await categories.find((cat) => {
        return cat.id === num;
      })) !== undefined
    : false;
  const otherCategory = await categories.find((cat) => {
    return cat.name === "Other";
  });
  const alternativeNum = otherCategory
    ? otherCategory.id
      ? otherCategory.id
      : 1
    : 1;
  return isCatNum ? num : alternativeNum;
};
