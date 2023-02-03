import React, { useState, useEffect } from "react";
const Answers = ({ text }) => {
    const [typedText, setTypedText] = useState("");
    useEffect(() => {
        let index = 0;
        let text1 = ""
        if(text) {
            text1 = text
        }
        const type = () => {
            setTypedText(text1.substring(0, index));
            index++;
            if (index <= text1.length) {
                setTimeout(type, 10);
            }
        };
        type();
    }, [text]);
    return <p>{typedText}</p>;
};

export default Answers;




