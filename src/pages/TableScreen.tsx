import React, { useState } from "react";
import Table from "../components/Table";
import initialData from "../data/sampleData";
import { Row } from "../types";

const TableScreen: React.FC = () => {
  const [data, setData] = useState<Row[]>(initialData);

  return (
    <div>
      <h1>Hierarchical Table</h1>
      <Table data={data} setData={setData} />
    </div>
  );
};

export default TableScreen;
