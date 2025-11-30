import type {
  TableRow as TableRowType,
  TableColumn as TableColumnType,
} from "../../types/table";
import { TableCell } from "./TableCell";

interface TableRowProps {
  row: TableRowType;
  columns: TableColumnType[];
  index: number;
  onCellChange: (rowId: string, columnId: string, newValue: unknown) => void;
}

export function TableRow({ row, columns, index, onCellChange }: TableRowProps) {
  return (
    <div
      className={`flex border-b border-gray-100 hover:bg-blue-50 transition-colors ${
        index % 2 === 0 ? "bg-white" : "bg-gray-200"
      }`}
    >
      {columns.map((column) => (
        <TableCell
          key={column.id}
          value={row[column.id]}
          width={column.width}
          type={column.type}
          rowId={row.id}
          columnId={column.id}
          onCellChange={onCellChange}
          options={column.options}
          colors={column.colors}
        />
      ))}
    </div>
  );
}
