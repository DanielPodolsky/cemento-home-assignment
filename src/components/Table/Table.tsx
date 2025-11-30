import type {
  TableColumn as TableColumnType,
  TableRow as TableRowType,
} from "../../types/table";
import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";

interface TableProps {
  columns: TableColumnType[];
  data: TableRowType[];
  height?: number; // height of List for virtualization
  rowHeight?: number; // height of each row for virtualization
  onCellChange: (rowId: string, columnId: string, newValue: unknown) => void;
}

export function Table({
  columns,
  data,
  height,
  rowHeight,
  onCellChange,
}: TableProps) {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
      <TableHeader columns={columns} />
      <TableBody
        rows={data}
        columns={columns}
        height={height}
        rowHeight={rowHeight}
        onCellChange={onCellChange}
      />
    </div>
  );
}
