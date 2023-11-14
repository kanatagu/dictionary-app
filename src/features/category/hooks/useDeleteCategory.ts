import { useToast } from '@chakra-ui/react';
import { useLocalStorage } from '../../../hooks';
import { CategoryType, MyItemType } from '../../../types';

export const useDeleteCategory = (
  category: CategoryType,
  onClose: () => void
) => {
  const toast = useToast();

  const afterSubmit = () => {
    toast({
      title: 'Success!',
      description: 'Deleted category name.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };
  const [storedCategoriesValue, setStoredCategoriesValue] = useLocalStorage<
    CategoryType[]
  >('category', [], afterSubmit);

  const [storedMyItemsValue, setStoredMyItemsValue] = useLocalStorage<
    MyItemType[]
  >('myItem', []);

  const deleteCategory = () => {
    let newArray = [...storedMyItemsValue];

    // Delete category from myItems
    newArray.forEach((myItem) => {
      const updatedCategoryItems = myItem.category.filter(
        (categoryItem) => categoryItem.id !== category.id
      );

      // If only this category is attached, delete the entire item
      if (updatedCategoryItems.length === 0) {
        const deletedItemsArray = newArray.filter(
          (item) => item.id !== myItem.id
        );

        newArray = deletedItemsArray;
      } else {
        myItem.category = updatedCategoryItems;
      }
    });

    setStoredMyItemsValue(newArray);

    // Delete category
    const filteredCategory = storedCategoriesValue.filter(
      (item) => item.id !== category.id
    );
    setStoredCategoriesValue(filteredCategory);
  };

  return {
    deleteCategory,
  };
};
