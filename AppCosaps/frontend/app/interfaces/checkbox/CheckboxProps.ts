export interface CheckboxProps {
  direction?: "row" | "column";
  txt: string;
  txtSize?: number;
  size?: number;
  StorageItem?: string;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  checked: boolean;
  color?: string;
}
