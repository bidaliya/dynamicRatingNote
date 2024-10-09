export interface ColumnData {
  value: string;
  bgColor: string;
}

export interface TableRow {
  bgColor: string;
  data: ColumnData[];
}

export interface TableComponent {
  type: "table";
  id: number;
  label: string;
  footer: string;
  rows: TableRow[];
}

export interface TextComponent {
  type: "text";
  id: number;
  label: string;
  margin?: { right: string };
  link?: string;
}

export type DynamicComponent = TableComponent | TextComponent;

export interface Props {
  componentsData: DynamicComponent[];
}
