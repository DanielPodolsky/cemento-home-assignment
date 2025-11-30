interface SelectCellProps {
  value: string;
  colors?: { [option: string]: string };
}

export function SelectCell({ value, colors }: SelectCellProps) {
  const colorClass = colors?.[value] || "bg-gray-100 text-gray-800";
  return <div className={colorClass}>{value}</div>;
}
