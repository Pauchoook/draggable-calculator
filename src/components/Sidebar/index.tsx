import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { calculatorSlice } from "../../store/reducers/calculatorSlice";
import { IComponent } from "../../types/components";
import "./sidebar.scss";

const Sidebar: React.FC = () => {
  const { sidebarComponents } = useAppSelector((state) => state.calculate);
  const dispatch = useAppDispatch();
  const { setCurrentComponent } = calculatorSlice.actions;

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, component: IComponent) => {
    dispatch(setCurrentComponent(component));
  };

  return (
    <div className="sidebar">
      {sidebarComponents.map((item) => (
        <item.Component onDragOver={onDragOver} onDragStart={onDragStart} key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Sidebar;
