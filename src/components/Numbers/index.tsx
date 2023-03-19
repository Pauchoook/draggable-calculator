import React from "react";
import { useAppSelector } from "../../hooks/redux";
import { ComponentProps } from "../../types/components";
import "./numbers.scss";

const buttons = [
  { value: "7" },
  { value: "8" },
  { value: "9" },
  { value: "4" },
  { value: "5" },
  { value: "6" },
  { value: "1" },
  { value: "2" },
  { value: "3" },
  { value: "0" },
  { value: "," }
];

const Numbers: React.FC<ComponentProps> = ({
  onDragOver,
  onDragEnd,
  onDragLeave,
  onDragStart,
  changeValue,
  onDrop,
  item,
}) => {
  const { value } = useAppSelector((state) => state.calculate);

  const handlerClick = (val: string) => {
    if (changeValue) {
      if (value === "0" && val !== ",") {
        changeValue(val);
      } else {
        changeValue(value + val);
      }
    }
  }

  return (
    <div
      draggable={item.draggable}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragStart={(e) => onDragStart(e, item)}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className="numbers item"
      style={{ opacity: item.disabled ? "0.5" : "1", cursor: item.draggable ? "grab" : "auto" }}
    >
      {buttons.map((btn) => (
        <button
          key={btn.value}
          onClick={() => handlerClick(btn.value)}
          className={item.draggable ? "btn numbers__item disabled" : "btn numbers__item"}
        >
          {btn.value}
        </button>
      ))}
    </div>
  );
};

export default Numbers;
