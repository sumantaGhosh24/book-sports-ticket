import {startTransition, useEffect, useState} from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {ICategory} from "@/lib/models/category.model";
import {createCategory, getAllCategories} from "@/lib/actions/category.actions";

import {Input} from "./ui/input";

type DropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

const Dropdown = ({value, onChangeHandler}: DropdownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    createCategory({
      categoryName: newCategory.trim(),
    }).then((category) => {
      setCategories((prevState) => [...prevState, category]);
    });
  };

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();
      categoryList && setCategories(categoryList as ICategory[]);
    };
    getCategories();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="py-6 bg-gray-200">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem
              key={category?._id}
              value={category?._id}
              className="py-3 bg-gray-200"
            >
              {category?.name}
            </SelectItem>
          ))}
        <AlertDialog>
          <AlertDialogTrigger className="flex w-full rounded-sm py-3 pl-8">
            Add new category
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Category name"
                  className="py-6"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddCategory)}
              >
                Add Category
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
