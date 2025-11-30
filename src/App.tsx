import { Table } from "./components/Table";
import { generateMockData } from "./utils/mockData";
import { useState } from "react";
import { ColumnToggle } from "./components/ColumnToggle";

export default function App() {
  const [{ columns, data }, setTableData] = useState(() =>
    generateMockData(10_000)
  ); // Generate 10k rows of mock data, lazy initialization

  // Positive list - show all columns by default
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(columns.map((col) => col.id))
  );

  const filteredColumns = columns.filter((col) => visibleColumns.has(col.id));

  function handleToggle(columnId: string) {
    setVisibleColumns((prev) => {
      const next = new Set(prev);
      if (next.has(columnId)) {
        next.delete(columnId);
      } else {
        next.add(columnId);
      }
      return next;
    });
  }

  function handleCellChange(
    rowId: string,
    columnId: string,
    newValue: unknown
  ) {
    setTableData((prev) => ({
      ...prev,
      data: prev.data.map((row) =>
        row.id === rowId ? { ...row, [columnId]: newValue } : row
      ),
    }));
  }

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4">
          Construction Task Tracker - Client Side
        </h1>
        <ColumnToggle
          columns={columns}
          visibleColumns={visibleColumns}
          onToggle={handleToggle}
        />
        <Table
          columns={filteredColumns}
          data={data}
          height={window.innerHeight - 250}
          rowHeight={40}
          onCellChange={handleCellChange}
        />
      </div>
    </div>
  );
}
