import React, { useState } from "react";
import { Typography, Button, Input } from "antd";
import { TextComponent as TextData } from "../DataInterface";

const { Text } = Typography;

interface Props {
  textData: TextData;
  updateLabel: (id: number, newLabel: string) => void;
}

const TextComponent: React.FC<Props> = React.memo(
  ({ textData, updateLabel }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [label, setLabel] = useState(textData.label);

    const marginStyle: React.CSSProperties = {
      ...(textData?.styles?.margin?.right && {
        marginRight: textData.styles.margin.right,
      }),
      ...(textData?.styles?.margin?.left && {
        marginLeft: textData.styles.margin.left,
      }),
      ...(textData?.styles?.margin?.top && {
        marginTop: textData.styles.margin.top,
      }),
      ...(textData?.styles?.margin?.bottom && {
        marginBottom: textData.styles.margin.bottom,
      }),
      textAlign: textData?.styles?.textAlignment || "left",
    };

    const handleTextClick = () => {
      if (textData.isEditable) {
        setIsEditing(true);
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLabel(e.target.value);
    };

    const handleInputBlur = () => {
      setIsEditing(false);
      updateLabel(textData.id, label);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        setIsEditing(false);
        updateLabel(textData.id, label);
      }
    };

    return (
      <div key={textData.id} style={marginStyle}>
        {isEditing ? (
          <Input
            value={label}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyPress={handleKeyPress}
            autoFocus
            style={{ width: "100%" }}
          />
        ) : textData.typeOfContent === "box" ? (
          <div
            style={{
              border: textData.styles?.border || "1px solid black",
              padding: "10px",
              cursor: textData.isEditable ? "text" : "default",
            }}
          >
            <Text
              style={{
                fontWeight: textData.heading?.styles?.fontWeight || "normal",
              }}
            >
              {textData.heading?.text}
            </Text>
            <br />
            <Text
              style={{
                fontWeight:
                  textData.description?.styles?.fontWeight || "normal",
              }}
            >
              {textData.description?.text}
            </Text>
          </div>
        ) : (
          <Text
            onClick={handleTextClick}
            style={{
              cursor: textData.isEditable ? "text" : "default",
              textAlign: marginStyle.textAlign,
            }}
          >
            {label}
          </Text>
        )}
        {textData.link && (
          <Button type="link" href={textData.link} target="_blank">
            Visit
          </Button>
        )}
      </div>
    );
  }
);

export default TextComponent;
