import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IToDo, categoryListState, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const cateList = useRecoilValue(categoryListState)
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {cateList?.map((cate) => {
        if(category !== cate){
          return(
            <>
              <button name={cate} onClick={onClick}>
                {cate}
              </button>
            </>
          )}
          else{
            return <></>
          }
        }
      )}
    </li>
  );
}

export default ToDo;
