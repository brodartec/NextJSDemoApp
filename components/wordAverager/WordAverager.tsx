import React, { useMemo, useState } from "react";
import styles from "./WordAverager.module.css";
import Button from "../core/button/Button";
import { List, ListItem } from "../core/list";
import TextInput from "../core/textInput/TextInput";

type TextLine = {
  content: string;
  timeStamp: string;
  wordCount: number;
};

const WordAverager = () => {
  const [textLines, setTextLines] = useState<TextLine[]>([]);
  const [textInput, setTextInput] = useState(""); // current unsubmitted input

  const avgWordCount = useMemo(() => {
    if (textLines.length === 0) return 0; // avoid dividing by zero :)
    const totalWords = textLines.reduce((total, curr) => {
      return total + curr.wordCount;
    }, 0);
    return Math.round(totalWords / textLines.length);
  }, [textLines]);

  const handleTextInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.currentTarget.value);
  };

  const handleTextSubmitted = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const _textInput = textInput.trim(); // make sure its not just white space
    if (_textInput.length > 0) {
      // we'll calculate word count now, instead of on the fly when
      // finding the average in avgWordCount memo
      const wordCount = _textInput.split(" ").filter((w) => {
        // skip spaces and groups that don't contain any alphanumeric chars
        // TODO: add handling for languages that don't use Latin alphabet
        return w.length !== 0 && w.match(/\w+/g) !== null;
      }).length;
      const newTextLine = {
        content: textInput,
        timeStamp: new Date().toISOString(), // TODO: format as YYYY-MM-DD HH:MM:SS
        wordCount: wordCount,
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
      <p>Average Number of Words: {avgWordCount}</p>
      <List>
        {textLines.map((textLine) => (
          <ListItem key={textLine.timeStamp}>
            <div className={styles.textLine}>
              <div>{textLine.content}</div>
              <div>{textLine.timeStamp}</div>
            </div>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default WordAverager;
