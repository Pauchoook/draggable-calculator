import { IComponent } from "./components";

export interface CalculatorState {
  isConstructor: boolean;
  currentComponent: IComponent | null;
  canvasComponents: IComponent[];
  sidebarComponents: IComponent[];
  value: string;
}
