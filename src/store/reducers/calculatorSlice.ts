import { createSlice } from "@reduxjs/toolkit";
import Calculate from "../../components/Calculate";
import Display from "../../components/Display";
import { CalculatorState } from "../../types/calculator";
import Numbers from "../../components/Numbers";
import Operations from "../../components/Operations";

const initialState: CalculatorState = {
  isConstructor: true,
  currentComponent: null,
  canvasComponents: [],
  sidebarComponents: [
    {
      id: 1,
      draggable: true,
      disabled: false,
      Component: Display,
    },
    {
      id: 2,
      draggable: true,
      disabled: false,
      Component: Operations,
    },
    {
      id: 3,
      draggable: true,
      disabled: false,
      Component: Numbers,
    },
    {
      id: 4,
      draggable: true,
      disabled: false,
      Component: Calculate,
    },
  ],
  value: "0",
};

export const calculatorSlice = createSlice({
  name: "calculate",
  initialState,
  reducers: {
    setCurrentComponent: (state, action) => {
      state.currentComponent = action.payload;
    },
    setCanvasComponents: (state, action) => {
      const currentComponentIndex = state.sidebarComponents.findIndex((item) => item.id == action.payload.id);

      state.canvasComponents = [...state.canvasComponents, action.payload];
      // перетащенный в canvasd компонент из sidebar больше не активен
      state.sidebarComponents[currentComponentIndex] = {
        ...state.sidebarComponents[currentComponentIndex],
        disabled: true,
      };
    },
    swapPlace: (state, action) => {
      if (state.currentComponent) {
        const { currentIndexComponent, dropIndexComponent, currentComponent } = action.payload;

        if (currentIndexComponent > -1 && dropIndexComponent > -1) {
          state.canvasComponents.splice(currentIndexComponent, 1); // удаляю текущий компонент
          state.canvasComponents.splice(dropIndexComponent + 1, 0, currentComponent); // вставляю текущий компонент после наведенного
        }
      }
    },
    setIsConstrucor: (state) => {
      state.isConstructor = !state.isConstructor;
      // делаю draggable false у компонентов
      state.canvasComponents = state.canvasComponents.map((component) => ({
        ...component,
        draggable: !component.draggable,
      }));
    },
    changeValue: (state, action) => {
      state.value = action.payload;
    },
    calculate: (state) => {
      const calcValue = `${eval(state.value.replace(/x/g, "*").replace(/,/g, "."))}`;

      if (state.value.slice(-2) === "/0") {
        state.value = "Не определено";
      } else {
        state.value = calcValue.replace(/\./g, ",");
      }
    },
  },
});

export default calculatorSlice.reducer;