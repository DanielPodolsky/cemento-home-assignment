# Construction Task Tracker

A high-performance, virtualized data table built with React and TypeScript that handles 1M+ rows. This project demonstrates advanced React patterns including component composition, optimization techniques, and generic/reusable architecture.

<img width="2561" height="1318" alt="image" src="https://github.com/user-attachments/assets/6b6afd50-a0de-4025-bc28-265493a4dde5" />


## Features

- **Multi-Type Cell Rendering** - Supports string, number, boolean, and select data types with appropriate UI for each
- **Column Visibility Toggle** - Users can show/hide columns dynamically
- **Inline Cell Editing** - Click any cell to edit directly with type-appropriate inputs
- **Virtualized Rendering** - Efficiently handles 10,000+ rows using react-window (only ~15 DOM nodes rendered)
- **Generic & Reusable** - Works with any dataset that follows the schema

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI Framework |
| TypeScript | 5.9.3 | Type Safety |
| Vite | 7.2.4 | Build Tool |
| Tailwind CSS | 4.1.17 | Styling |
| react-window | 2.2.3 | Virtualization |
| Faker.js | 10.1.0 | Mock Data Generation |

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/cemento-home-assignment.git

# Navigate to project directory
cd cemento-home-assignment

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── components/
│   ├── Table/
│   │   ├── Table.tsx           # Main table component (composition root)
│   │   ├── TableHeader.tsx     # Column headers
│   │   ├── TableBody.tsx       # Virtualized row container
│   │   ├── TableRow.tsx        # Single row renderer
│   │   ├── TableCell.tsx       # Cell with edit mode logic
│   │   ├── cells/
│   │   │   ├── StringCell.tsx  # String display
│   │   │   ├── NumberCell.tsx  # Right-aligned number display
│   │   │   ├── BooleanCell.tsx # Checkbox display
│   │   │   └── SelectCell.tsx  # Colored badge display
│   │   └── index.ts            # Barrel export
│   └── ColumnToggle.tsx        # Column visibility controls
├── types/
│   └── table.ts                # TypeScript interfaces
├── utils/
│   └── mockData.ts             # Mock data generator
└── App.tsx                     # Application root
```

## Data Schema

### Column Definition

```typescript
interface TableColumn {
  id: string;           // Unique identifier, matches data row keys
  ordinalNo: number;    // Display order position
  title: string;        // Column header text
  type: string;         // Data type: "string" | "number" | "boolean" | "select"
  width?: number;       // Optional column width in pixels
  options?: string[];   // For select type: available options
  colors?: {            // For select type: color mapping
    [option: string]: string;
  };
}
```

### Row Definition

```typescript
interface TableRow {
  id: string;                    // Unique row identifier
  [columnId: string]: unknown;   // Dynamic column values
}
```

## Schema Extensions

Per the assignment guidelines, I added two optional properties to enhance reusability:

### `options?: string[]`
**Purpose:** Defines dropdown options for select-type columns

**Rationale:** Without this, select options would be hardcoded in the component, breaking the "generic/reusable" requirement. Now any select column can define its own options.

```typescript
{
  id: "status",
  type: "select",
  options: ["Not Started", "In Progress", "Complete"]
}
```

### `colors?: { [option: string]: string }`
**Purpose:** Defines Tailwind CSS classes for each select option

**Rationale:** Allows visual distinction between status values without hardcoding colors in components. Falls back to gray if not defined.

```typescript
{
  id: "status",
  type: "select",
  options: ["Not Started", "In Progress", "Complete"],
  colors: {
    "Not Started": "bg-gray-100 text-gray-800",
    "In Progress": "bg-yellow-100 text-yellow-800",
    "Complete": "bg-green-100 text-green-800"
  }
}
```

## Architecture Decisions

### Why Virtualization?
With 10,000 rows, rendering all DOM nodes would be extremely slow. react-window only renders visible rows (~15 at a time), maintaining smooth performance regardless of dataset size.

### Why Not `<table>` Element?
HTML table elements (`<table>`, `<tr>`, `<td>`) have rigid CSS layout rules that conflict with virtualization's absolute positioning requirements. Using `<div>` elements with flexbox provides the flexibility needed for virtualized scrolling.

### Component Composition Pattern
```
Table
├── TableHeader (static)
└── TableBody (virtualized)
    └── TableRow (repeated)
        └── TableCell (edit mode logic)
            └── *Cell (type-specific display)
```

Each component has a single responsibility, making the codebase maintainable and testable.

### State Management
- **Data state** lives in `App.tsx` with `useState` lazy initialization
- **Edit mode state** is local to each `TableCell`
- **Column visibility state** is managed at the `App` level and passed down

## Adding New Columns

The table is designed to be generic. To add a new column:

1. **Define the column** in `mockData.ts`:
```typescript
{
  id: "priority",
  ordinalNo: 5,
  title: "Priority",
  type: "select",
  width: 100,
  options: ["Low", "Medium", "High"],
  colors: {
    "Low": "bg-green-100 text-green-800",
    "Medium": "bg-yellow-100 text-yellow-800",
    "High": "bg-red-100 text-red-800"
  }
}
```

2. **Generate data** for the new column:
```typescript
priority: faker.helpers.arrayElement(["Low", "Medium", "High"])
```

No component changes required - the table automatically handles new columns.

## License

This project was created as a technical assessment for Cemento.

---

Built with React + TypeScript + Vite
