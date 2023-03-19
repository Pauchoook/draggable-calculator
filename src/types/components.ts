export interface IComponent {
  id: number;
  draggable: boolean;
  disabled: boolean;
  Component: React.FC<ComponentProps>;
}

export interface ComponentProps 
{
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, component: IComponent) => void;
  changeValue?: (str: string) => void;
  item: IComponent;
}

interface IButton {
  value: string;
}

export interface ButtonsProps extends ComponentProps {
  buttons: IButton[]
}