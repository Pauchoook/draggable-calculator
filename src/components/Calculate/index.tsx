import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { calculatorSlice } from "../../store/reducers/calculatorSlice";
import { ComponentProps } from "../../types/components";

const Calculate: React.FC<ComponentProps> = ({ onDragOver, onDragStart, onDragLeave, onDragEnd, onDrop, item }) => {
  const dispatch = useAppDispatch();
  const {value} = useAppSelector(state => state.calculate);
  const { calculate, changeValue } = calculatorSlice.actions;

  const handlerClick = () => {
    const isLastNotNumber = isNaN(+value.slice(-1));
    if (!value || value === "0") return;

    if (!/[0-9]/.test(value)) {
      dispatch(changeValue("0"));
    } else if (isLastNotNumber) {
      dispatch(changeValue(value + 0));
    }
    dispatch(calculate());
  };

  return (
    <div
      draggable={item.draggable}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDragLeave={onDragLeave}
      onDragStart={(e) => onDragStart(e, item)}
      onDrop={onDrop}
      className="item"
      style={{ opacity: item.disabled ? "0.5" : "1", cursor: item.draggable ? "grab" : "auto" }}
    >
      <button onClick={handlerClick} className={item.draggable ? "btn btn-primary disabled" : "btn btn-primary"}>
        =
      </button>
    </div>
  );
};

export default Calculate;
