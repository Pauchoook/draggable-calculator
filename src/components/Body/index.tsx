import React, { useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import Canvas from "../Canvas";
import Sidebar from "../Sidebar";
import "./body.scss";

const Body = () => {
  const {isConstructor} = useAppSelector(state => state.calculate);
  return (
    <div className="body">
      {isConstructor && <Sidebar />}
      <Canvas />
    </div>
  );
};

export default Body;
