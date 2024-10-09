import React, { useState } from "react";
import { Typography, Button, Input } from "antd";
import { TextComponent as TextData } from "../DataInterface";

const { Text } = Typography;

interface Props {
    textData: TextData;
}

const TextComponent: React.FC<Props> = ({ textData }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [label, setLabel] = useState(textData.label);

    // we are getting styles from the data.json
    const marginStyle: React.CSSProperties = {
        ...(textData?.styles?.margin?.right && { marginRight: textData.styles.margin.right }),
        ...(textData?.styles?.margin?.left && { marginLeft: textData.styles.margin.left }),
        ...(textData?.styles?.margin?.top && { marginTop: textData.styles.margin.top }),
        ...(textData?.styles?.margin?.bottom && { marginBottom: textData.styles.margin.bottom }),
    };

    const handleTextClick = () => {
        if (textData.editable) {
            setIsEditing(true);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLabel(e.target.value);
    };

    const handleInputBlur = () => {
        setIsEditing(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setIsEditing(false);
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
                />
            ) : (
                <Text onClick={handleTextClick} style={{ cursor: textData.editable ? 'text' : 'default' }}>
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
};

export default TextComponent;
