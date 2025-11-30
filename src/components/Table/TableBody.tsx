import { List, type RowComponentProps } from "react-window"; // The virtualized container and TS type for row renderer
import type {
  TableColumn as TableColumnType,
  TableRow as TableRowType,
} from "../../types/table";
import { TableRow } from "./TableRow"; // The component that renders a single row

interface TableBodyProps {
  rows: TableRowType[];
  columns: TableColumnType[];
  height?: number; // react-window needs to know the height of the list
  rowHeight?: number; // react-window needs to know the height of each row
  onCellChange: (rowId: string, columnId: string, newValue: unknown) => void;
}

// This is the information that gets passed to each row renderer
interface RowData {
  rows: TableRowType[];
  columns: TableColumnType[];
  onCellChange: (rowId: string, columnId: string, newValue: unknown) => void;
}

// index -> row's index, style -> style object for positioning, {rows, columns} -> data that gets passed via rowProps, rows[index] -> specific row for this index
function RowRenderer({
  index,
  style,
  rows,
  columns,
  onCellChange,
}: RowComponentProps<RowData>) {
  const row = rows[index];

  return (
    <div style={style}>
      <TableRow
        row={row}
        columns={columns}
        index={index}
        onCellChange={onCellChange}
      />
    </div>
  );
}

// rowComponent - uses the RowRenderer to render rows
// rowCount - total number of rows in general
// rowHeight - height of each row
// rowProps = { rows, columns } - data that gets passed to each row renderer
// style - viewport height
export function TableBody({
  rows,
  columns,
  height = 400,
  rowHeight = 40,
  onCellChange,
}: TableBodyProps) {
  return (
    <List
      rowComponent={RowRenderer}
      rowCount={rows.length}
      rowHeight={rowHeight}
      rowProps={{ rows, columns, onCellChange }}
      style={{ height }} // height: height shortcut
    />
  );
}
