import React from "react";
import { Row } from "../types";
import "../assets/styles.css"

interface TableProps {
  data: Row[];
  setData: React.Dispatch<React.SetStateAction<Row[]>>;
}

const Table: React.FC<TableProps> = ({ data, setData }) => {
  const updateHierarchy = (rows: Row[], id: string, newValue: number): Row[] => {
    return rows.map((row) => {
      if (row.id === id) {
        const variance = ((newValue - row.originalValue) / row.originalValue) * 100;
        return { ...row, value: newValue, variance };
      }
      if (row.children) {
        const updatedChildren = updateHierarchy(row.children, id, newValue);
        const updatedValue = updatedChildren.reduce((sum, child) => sum + child.value, 0);
        const variance = ((updatedValue - row.originalValue) / row.originalValue) * 100;
        return { ...row, value: updatedValue, variance, children: updatedChildren };
      }
      return row;
    });
  };

  const distributeValue = (rows: Row[], id: string, newValue: number): Row[] => {
    return rows.map((row) => {
      if (row.id === id && row.children) {
        const totalOriginal = row.children.reduce((sum, child) => sum + child.originalValue, 0);
        const updatedChildren = row.children.map((child) => {
          const proportion = child.originalValue / totalOriginal;
          const newChildValue = Math.round(newValue * proportion * 100) / 100; // Rounded to 2 decimals
          const variance = ((newChildValue - child.originalValue) / child.originalValue) * 100;
          return { ...child, value: newChildValue, variance };
        });
        return { ...row, value: newValue, variance: ((newValue - row.originalValue) / row.originalValue) * 100, children: updatedChildren };
      }
      if (row.children) {
        return { ...row, children: distributeValue(row.children, id, newValue) };
      }
      return row;
    });
  };

  const handleAllocationPercentage = (id: string, percentage: number) => {
    setData((prevData) => updateHierarchy(prevData, id, Math.round((1 + percentage / 100) * findRowValue(prevData, id) * 100) / 100));
  };

  const handleAllocationValue = (id: string, newValue: number) => {
    setData((prevData) => {
      const updatedData = updateHierarchy(prevData, id, newValue);
      return distributeValue(updatedData, id, newValue);
    });
  };

  const findRowValue = (rows: Row[], id: string): number => {
    for (const row of rows) {
      if (row.id === id) return row.value;
      if (row.children) {
        const value = findRowValue(row.children, id);
        if (value !== -1) return value;
      }
    }
    return -1;
  };

  const renderRow = (row: Row, level: number = 0) => (
    <React.Fragment key={row.id}>
      <tr>
        <td style={{ paddingLeft: `${level * 20}px` }}>{row.label}</td>
        <td>{row.value.toFixed(2)}</td>
        <td>
          <input type="number" id={`input-${row.id}`} />
        </td>
        <td>
          <button onClick={() => handleAllocationPercentage(row.id, parseFloat((document.getElementById(`input-${row.id}`) as HTMLInputElement).value || "0"))}>%</button>
        </td>
        <td>
          <button onClick={() => handleAllocationValue(row.id, parseFloat((document.getElementById(`input-${row.id}`) as HTMLInputElement).value || "0"))}>Val</button>
        </td>
        <td>{row.variance ? `${row.variance.toFixed(2)}%` : "0%"}</td>
      </tr>
      {row.children && row.children.map((child) => renderRow(child, level + 1))}
    </React.Fragment>
  );

  return (
    <table border={1}>
      <thead>
        <tr>
          <th>Label</th>
          <th>Value</th>
          <th>Input</th>
          <th>Allocation %</th>
          <th>Allocation Val</th>
          <th>Variance %</th>
        </tr>
      </thead>
      <tbody>{data.map((row) => renderRow(row))}</tbody>
    </table>
  );
};

export default Table;
