import { useState } from "react";
import { BooleanCell, NumberCell, SelectCell, StringCell } from "./cells";

interface TableCellProps {
  value: unknown; // when an interface needs to accommodate properties whose types are not known at design time, or whose values might be of any type, the unknown type is the recommended approach for type safety.
  width?: number;
  type: string;
  rowId: string;
  columnId: string;
  onCellChange: (rowId: string, columnId: string, newValue: unknown) => void;
  options?: string[]; // for select type cells
  colors?: { [option: string]: string }; // for select type cells with color coding
}

export function TableCell({
  value,
  width,
  type,
  rowId,
  columnId,
  onCellChange,
  options,
  colors,
}: TableCellProps) {
  const [isEditing, setIsEditing] = useState(false);

  // Called when user finishes editing
  function handleSave(newValue: unknown) {
    onCellChange(rowId, columnId, newValue);
    setIsEditing(false);
  }

  return (
    <div
      className="px-4 py-3 text-sm text-gray-700 truncate border-r border-gray-100 last:border-r-0"
      style={{ width: width ? `${width}px` : "auto" }}
      onClick={() => setIsEditing(true)}
    >
      {isEditing
        ? renderEditCell(
            value,
            type,
            handleSave,
            () => setIsEditing(false),
            options
          )
        : renderCell(value, type, colors)}
    </div>
  );
}

function renderCell(
  value: unknown,
  type: string,
  colors?: { [option: string]: string }
) {
  switch (type) {
    case "string":
      return <StringCell value={value as string} />;
    case "number":
      return <NumberCell value={value as number} />;
    case "boolean":
      return <BooleanCell value={value as boolean} />;
    case "select":
      return <SelectCell value={value as string} colors={colors} />;
    default:
      return <StringCell value={String(value)} />;
  }
}

function renderEditCell(
  value: unknown,
  type: string,
  onSave: (newValue: unknown) => void,
  onCancel: () => void,
  options?: string[]
) {
  switch (type) {
    case "string":
      return (
        <input
          type="text"
          defaultValue={value as string}
          autoFocus
          className="w-full bg-white border border-blue-500 rounded px-1"
          onBlur={(e) => {
            const val = e.target.value.trim();
            if (val) {
              onSave(val);
            } else {
              onCancel(); // Empty - cancel edit
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const val = e.currentTarget.value.trim();
              if (val) {
                onSave(val);
              } else {
                onCancel();
              }
            }
            if (e.key === "Escape") onCancel();
          }}
        />
      );
    case "number":
      return (
        <input
          type="number"
          defaultValue={value as number}
          autoFocus
          className="w-full bg-white border border-blue-500 rounded px-1"
          onBlur={(e) => onSave(Number(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSave(Number(e.currentTarget.value));
            if (e.key === "Escape") onCancel();
          }}
        />
      );
    case "boolean":
      return (
        <input
          type="checkbox"
          checked={value as boolean}
          onChange={(e) => onSave(e.target.checked)}
        />
      );
    case "select":
      return (
        <select
          defaultValue={value as string}
          autoFocus
          className="w-full bg-white border border-blue-500 rounded"
          onBlur={(e) => onSave(e.target.value)}
          onChange={(e) => onSave(e.target.value)}
        >
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    default:
      return null;
  }
}
