import { type TableColumn as TableColumnType } from "../../types/table";

interface TableHeaderProps {
  columns: TableColumnType[];
}

export function TableHeader({ columns }: TableHeaderProps) {
  return (
    <div className="flex bg-gray-50 border-b border-gray-300">
      {columns.map((column) => (
        <div
          key={column.id}
          className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200 last:border-r-0"
          style={{ width: column.width ? `${column.width}px` : "auto" }}
        >
          {column.title}
        </div>
      ))}
    </div>
  );
}
