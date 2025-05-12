import { createContext, useState } from "react";
import main from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState();

  const onSent = async () => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);
    const response = await main(input);
    setResultData(response);
    setLoading(false);
    setInput("");
  };
  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    showResult,
    recentPrompt,
    setRecentPrompt,
    loading,
    resultData,
    onSent,
    input,
    setInput,
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
export default ContextProvider;
