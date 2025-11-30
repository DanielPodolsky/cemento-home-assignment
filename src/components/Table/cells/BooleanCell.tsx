interface BooleanCellProps {
  value: boolean;
}

export function BooleanCell({ value }: BooleanCellProps) {
  return (
    <>
      <input type="checkbox" checked={value} readOnly />
    </>
  );
}
