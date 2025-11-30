import { faker } from "@faker-js/faker";
import {
  type TableRow,
  type TableColumn,
  type TableData,
} from "../types/table";

const columns: TableColumn[] = [
  { id: "task", ordinalNo: 1, title: "Task", type: "string", width: 250 },
  { id: "floor", ordinalNo: 2, title: "Floor", type: "number", width: 70 },
  {
    id: "requiresInspection",
    ordinalNo: 3,
    title: "Requires Inspection",
    type: "boolean",
    width: 140,
  },
  {
    id: "status",
    ordinalNo: 4,
    title: "Status",
    type: "select",
    width: 120,
    options: ["Not Started", "In Progress", "Complete"],
    colors: {
      "Not Started": "bg-gray-100 text-gray-800",
      "In Progress": "bg-yellow-100 text-yellow-800",
      Complete: "bg-green-100 text-green-800",
    },
  },
  {
    id: "priority",
    ordinalNo: 5,
    title: "Priority",
    type: "select",
    width: 100,
    options: ["Low", "Medium", "High"],
    colors: {
      Low: "bg-green-100 text-green-800",
      Medium: "bg-orange-100 text-orange-800",
      High: "bg-red-100 text-red-800",
    },
  },
];

// Input: number of rows to generate. Output: TableData object.
export function generateMockData(rowCount: number): TableData {
  const data: TableRow[] = [];

  for (let i = 0; i < rowCount; i++) {
    data.push({
      id: faker.string.uuid(),
      task:
        faker.helpers.arrayElement([
          "Install drywall",
          "Electrical wiring",
          "Plumbing rough-in",
          "HVAC installation",
          "Paint walls",
          "Install flooring",
          "Window installation",
          "Roof inspection",
          "Fire alarm setup",
          "Cabinet installation",
        ]) +
        ` - Unit ${faker.number.int({
          min: 1,
          max: 20,
        })}${faker.helpers.arrayElement(["A", "B", "C"])}`,
      floor: faker.number.int({ min: 1, max: 25 }),
      requiresInspection: faker.datatype.boolean(),
      status: faker.helpers.arrayElement([
        "Not Started",
        "In Progress",
        "Complete",
      ]),
      priority: faker.helpers.arrayElement(["Low", "Medium", "High"]),
    });
  }
  return { columns, data };
}
