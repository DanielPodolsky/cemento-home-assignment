interface NumberCellProps {
  value: number;
}

export function NumberCell({ value }: NumberCellProps) {
  return <div className="text-right">{value}</div>;
}
