export interface Row {
    id: string;
    label: string;
    value: number;
    originalValue: number;
    variance?: number;
    children?: Row[];
  }
  