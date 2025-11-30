import { type TableColumn as TableColumnType } from "../types/table";

interface ColumnToggleProps {
  columns: TableColumnType[]; // all columns
  visibleColumns: Set<string>; // what's currently visible
  onToggle: (columnId: string) => void; // toggle handler
}

export function ColumnToggle({
  columns,
  visibleColumns,
  onToggle,
}: ColumnToggleProps) {
  return (
    <div className="mb-4 flex gap-4 items-center">
      <span className="font-medium">Show columns:</span>
      {columns.map((column) => (
        <label key={column.id} className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={visibleColumns.has(column.id)}
            onChange={() => onToggle(column.id)}
          />
          {column.title}
        </label>
      ))}
    </div>
  );
}
