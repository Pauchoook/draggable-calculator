import React from "react";
import { useAppSelector } from "../../hooks/redux";
import { ComponentProps } from "../../types/components";

const buttons = [
  { value: "/" },
  { value: "x" },
  { value: "-" },
  { value: "+" }
];

const Operations: React.FC<ComponentProps> = ({
  onDragOver,
  onDragEnd,
  onDragLeave,
  onDragStart,
  changeValue,
  onDrop,
  item
}) => {
  const { value } = useAppSelector((state) => state.calculate);

  const handlerClick = (val: string) => {
    if (changeValue) {
      if (/[x,/,\-,+]/g.test(value.slice(-1))) {
        changeValue(value.substring(0, value.length - 1) + val);
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
      className="operations item"
      style={{ opacity: item.disabled ? "0.5" : "1", cursor: item.draggable ? "grab" : "auto" }}
    >
      {buttons.map((btn) => (
        <button
          key={btn.value}
          onClick={() => handlerClick(btn.value)}
          className={item.draggable ? "btn operations__item disabled" : "btn operations__item"}
        >
          {btn.value}
        </button>
      ))}
    </div>
  );
};

export default Operations;
