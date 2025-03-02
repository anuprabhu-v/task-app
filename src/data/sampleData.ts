import { Row } from "../types";

const sampleData: Row[] = [
  {
    id: "electronics",
    label: "Electronics",
    value: 1500,
    originalValue: 1500,
    variance: 0,
    children: [
      { id: "phones", label: "Phones", value: 800, originalValue: 800, variance: 0 },
      { id: "laptops", label: "Laptops", value: 700, originalValue: 700, variance: 0 },
    ],
  },
  {
    id: "furniture",
    label: "Furniture",
    value: 1000,
    originalValue: 1000,
    variance: 0,
    children: [
      { id: "tables", label: "Tables", value: 300, originalValue: 300, variance: 0 },
      { id: "chairs", label: "Chairs", value: 700, originalValue: 700, variance: 0 },
    ],
  },
];

export default sampleData;
