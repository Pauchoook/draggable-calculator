import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {calculatorSlice} from "../../store/reducers/calculatorSlice";
import { ComponentProps } from "../../types/components";
import "./display.scss";

const Display: React.FC<ComponentProps> = ({ onDragStart, onDrop, onDragLeave, onDragOver, onDragEnd, item }) => {
  const dispatch = useAppDispatch();
  const {changeValue} = calculatorSlice.actions;
  const { value } = useAppSelector((state) => state.calculate);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value.replace(/[^0-9,+,\-,x,/]/g, "");
    dispatch(changeValue(currentValue));
  };

  return (
    <div
      style={{ opacity: item.disabled ? "0.5" : "1", cursor: item.draggable ? "grab" : "auto" }}
      draggable={item.draggable}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDragStart={(e) => onDragStart(e, item)}
      className="display item"
    >
      <input
        type="text"
        onChange={onChange}
        placeholder="0"
        value={value}
        className={item.draggable ? "display__input disabled" : "display__input"}
      ></input>
    </div>
  );
};

export default Display;
