export interface SelectDataOptions {
  id: number;
  label: string;
  value: string;
}

export interface SelectProps {
  labelText: string;
  name: string;
  selectData: SelectDataOptions[];
}
