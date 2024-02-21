import { atom, selector } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const categoryListState = atom<string[]>({
  key: "categoryList",
  default: ["TO_DO", "DOING", "DONE"],
  effects: [
    ({ setSelf, onSet }) => {
      const categoryStorageKey = "Category";
      const storageCategoryTable = localStorage.getItem(categoryStorageKey);
      if (storageCategoryTable != null) {
        setSelf(JSON.parse(storageCategoryTable));
      }
      onSet((newValue, _, isReset) => {
        isReset ? localStorage.removeItem(categoryStorageKey) : localStorage.setItem(categoryStorageKey, JSON.stringify(newValue));
      });
    },
  ]
})

export const categoryState = atom<string>({
  key: "category",
  default: "TO_DO",
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      const todoStorageKey = "ToDo";
      const storageTodoTable = localStorage.getItem(todoStorageKey);
      if (storageTodoTable != null) {
        setSelf(JSON.parse(storageTodoTable));
      }
      onSet((newValue, _, isReset) => {
        isReset ? localStorage.removeItem(todoStorageKey) : localStorage.setItem(todoStorageKey, JSON.stringify(newValue));
      });
    },
  ]
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
