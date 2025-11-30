export interface TableColumn {
  id: string;
  ordinalNo: number;
  title: string;
  type: string; // In TypeScript it would be better to use a union type for specific column types (string | number | boolean | date etc.)
  width?: number;
  options?: string[]; // For select type columns
  colors?: { [option: string]: string }; // For select type columns with color coding
}

export interface TableRow {
  id: string;
  [columnId: string]: unknown; // Index signature for dynamic column keys (inherently optional, '?' not supported)
}

export interface TableData {
  columns: TableColumn[];
  data: TableRow[];
}
