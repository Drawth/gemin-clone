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

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 100 * index);
  };

  const newChat = () => {
    setShowResult(false);
    setLoading(false);
  };

  // onSent'e ikinci parametre ekledik: shouldAdd (daha önce yoksa true)
  const onSent = async (prompt, shouldAdd = true) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    if (!prompt || prompt.trim() === "") {
      alert("Lütfen bir prompt girin!");
      setShowResult(false);
      return;
    }

    // Eğer bu prompt daha önce yoksa, prevPrompts'a ekle
    if (shouldAdd) {
      setPrevPrompts((prev) => [...prev, prompt]);
      setRecentPrompt(prompt);
    }

    // API/fonksiyon çağrısı
    const response = await main(prompt);
    console.log("prompt:", prompt);
    console.log("input:", input);

    // Gelen cevabı parçalayıp göstermek için örnek
    const responseArray = response.split(" ");
    responseArray.forEach((word, i) => {
      delayPara(i, word + " ");
    });

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
    newChat,
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
export default ContextProvider;
