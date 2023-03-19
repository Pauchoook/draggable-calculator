import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { calculatorSlice } from "../../store/reducers/calculatorSlice";
import { IComponent } from "../../types/components";
import Preview from "../Preview";
import "./canvas.scss";

const Canvas: React.FC = () => {
  const dispatch = useAppDispatch();
  const { setCanvasComponents, setCurrentComponent, swapPlace, changeValue } = calculatorSlice.actions;
  const { canvasComponents, currentComponent } = useAppSelector((state) => state.calculate);
  const canvasRef = useRef<HTMLDivElement>(null);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (canvasRef.current && !canvasComponents.length) {
      canvasRef.current.style.background = "#F0F9FF";
    }
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (canvasRef.current) {
      canvasRef.current.style.background = "none";
    }
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const findItem = canvasComponents.find((item) => item.Component == currentComponent?.Component);
    if (!findItem) {
      dispatch(setCanvasComponents(currentComponent));
    }
    if (canvasRef.current) {
      canvasRef.current.style.background = "none";
    }
  };

  const onDragOverComponent = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.target as Element;

    if (target.className.includes("item")) {
      target.classList.add("line");
    }
  };

  const onDragStartComponent = (e: React.DragEvent<HTMLDivElement>, component: IComponent) => {
    dispatch(setCurrentComponent(component));
  };

  const onDragDeleteLine = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as Element;
    target.classList.remove("line");
  };

  const onDragDropComponent = (e: React.DragEvent<HTMLDivElement>, component: IComponent) => {
    const target = e.target as Element;
    target.classList.remove("line");
    if (currentComponent) {
      const currentIndexComponent = canvasComponents.indexOf(currentComponent);
      const dropIndexComponent = canvasComponents.indexOf(component);

      dispatch(swapPlace({ currentIndexComponent, dropIndexComponent, currentComponent }));
    }
  };

  const onChangeValue = (value: string) => {
    dispatch(changeValue(value));
  }

  return (
    <div
      style={{ border: canvasComponents.length > 0 ? "" : "2px dashed #c4c4c4" }}
      ref={canvasRef}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className="canvas"
    >
      {canvasComponents.length ? (
        canvasComponents.map((item) => (
          <item.Component
            key={item.id}
            onDragOver={onDragOverComponent}
            onDragLeave={onDragDeleteLine}
            onDragStart={(e) => onDragStartComponent(e, item)}
            onDrop={(e) => onDragDropComponent(e, item)}
            onDragEnd={onDragDeleteLine}
            changeValue={onChangeValue}
            item={{...item}}
          />
        ))
      ) : (
        <Preview />
      )}
    </div>
  );
};

export default Canvas;
