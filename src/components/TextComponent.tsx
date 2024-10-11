import React, { useEffect, useState } from "react";
import { Typography, Button, Input } from "antd";
import { TextComponent as TextData } from "../DataInterface";

const { Text } = Typography;

interface Props {
    textData: TextData;
    setData : (data: { key: number; value: string }) => void;
}

const TextComponent: React.FC<Props> = ({ textData , setData }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [label, setLabel] = useState<string>(textData.label);

    const marginStyle: React.CSSProperties = {
        ...(textData?.styles?.margin?.right && { marginRight: textData.styles.margin.right }),
        ...(textData?.styles?.margin?.left && { marginLeft: textData.styles.margin.left }),
        ...(textData?.styles?.margin?.top && { marginTop: textData.styles.margin.top }),
        ...(textData?.styles?.margin?.bottom && { marginBottom: textData.styles.margin.bottom }),
        textAlign: textData?.styles?.textAlignment || "left"
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
        //setData({key :textData.id , value :label});
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setIsEditing(false);
        }
        setData({key :textData.id , value :label});
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
                    style={{width:"100%"}}
                />
            ) : (
                <Text onClick={handleTextClick} style={{ cursor: textData.isEditable ? 'text' : 'default', textAlign: marginStyle.textAlign }}>
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