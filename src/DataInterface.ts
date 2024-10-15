export interface Styles {
  color?: string;
  bgcolor?: string;
  margin?: {
    left?: string;
    top?: string;
    right?: string;
    bottom?: string;
  };
  textAlignment?: "left" | "right";
  border?: string;
  fontWeight?: string;
}

export interface ColumnData {
  value: string;
  bgColor: string;
  styling?: Styles;
}

export interface TableRow {
  bgColor: string;
  data: ColumnData[];
}

export interface Label {
  text: string;
  styles?: Styles;
}

export interface Footer {
  text: string;
  styles?: Styles;
}

export interface TableComponent {
  type: "table";
  id: number;
  label: Label;
  footer: Footer;
  rows: TableRow[];
}

export interface TextComponent {
  type: "text";
  id: number;
  label: string;
  link?: string;
  isEditable: boolean;
  styles?: Styles;
  typeOfContent?: string;
  heading?: {
    text: string;
    styles?: Styles;
  };
  description?: {
    text: string;
    styles?: Styles;
  };
}

export type DynamicComponent = TableComponent | TextComponent;

export interface Props {
  componentsData: DynamicComponent[];
}
