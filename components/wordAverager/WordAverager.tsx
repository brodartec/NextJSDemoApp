import React, { useState } from "react";
import Button from "../core/button/Button";
import TextInput from "../core/textInput/TextInput";

type TextLine = {
  content: string;
  timeStamp: string;
  wordCount: number;
};

const WordAverager = () => {
  const [textLines, setTextLines] = useState<TextLine[]>([]);
  const [textInput, setTextInput] = useState(""); // current unsubmitted input

  const handleTextInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.currentTarget.value);
  };

  const handleTextSubmitted = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const _textInput = textInput.trim(); // make sure its not just white space
    if (_textInput.length > 0) {
      const newTextLine = {
        content: textInput,
        timeStamp: new Date().toISOString(), // TODO: format as YYYY-MM-DD HH:MM:SS
        wordCount: 1, // TODO: calculate this
      };
      setTextLines((prev) => [...prev, newTextLine]);
      setTextInput(""); // clear input
    }
  };

  return (
    <>
      <form onSubmit={handleTextSubmitted}>
        <TextInput
          maxLength={200}
          value={textInput}
          onChange={handleTextInputChanged}
        />
        <Button type="submit">Submit</Button>
      </form>
      <p>Average Number of Words: </p>
      <div>{JSON.stringify(textLines)}</div>
    </>
  );
};

export default WordAverager;
