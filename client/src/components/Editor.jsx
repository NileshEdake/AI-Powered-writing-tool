import React, { useRef, useState } from "react";
import axios from "axios";
import Login from "./Login";
import { FaSpellCheck, FaSyncAlt, FaCheck, FaPencilAlt } from "react-icons/fa";
import { SiGrammarly } from "react-icons/si";
import { usePrivy } from "@privy-io/react-auth";

const Editor = () => {
  const { getAccessToken } = usePrivy();
  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  const [selectedSentence, setSelectedSentence] = useState("");
  const [rephrasedSentences, setRephrasedSentences] = useState([]);
  const [correctedSentences, setCorrectedSentences] = useState([]);
  const [spellCheckedText, setSpellCheckedText] = useState("");
  const [grammarCheckedText, setGrammarCheckedText] = useState("");
  const handleTextChange = (e) => setText(e.target.value);

  const handleSentenceSelection = () => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = textarea.value.substring(start, end);
    setSelectedSentence(selected);
    console.log("Selected Sentence:", selected);
  };

  const checkSpelling = async () => {
    if (!text.trim()) {
      console.warn("Textarea is empty. Please enter some text.");
      return;
    }

    try {
      console.log("Sending full text spell check check:", text);
      const response = await axios.post(
        "http://localhost:8000/api/spellcheck",
        {
          sentence: text,
        }
      );
      console.log("Received response:", response.data);
      setSpellCheckedText(response.data.rephrased);
    } catch (error) {
      console.error("Error in /api/analyze:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };

  const checkGrammar = async () => {
    if (!text.trim()) {
      console.warn("Textarea is empty. Please enter some text.");
      return;
    }

    try {
      console.log("Sending full text for grammar check:", text);
      const response = await axios.post(
        "http://localhost:8000/api/grammarcheck",
        {
          sentence: text,
        }
      );
      console.log("Received response:", response.data);
      setGrammarCheckedText(response.data.rephrased);
    } catch (error) {
      console.error("Error in /api/analyze:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };

  const rephraseSentence = async () => {
    if (!text.trim()) {
      console.warn("Textarea is empty. Please enter some text.");
      return;
    }

    try {
      console.log("Sending full text for analyze check:", text);
      const response = await axios.post("http://localhost:8000/api/analyze", {
        sentence: text,
      });
      console.log("Received response:", response.data);
      setRephrasedSentences([response.data.rephrased]);
    } catch (error) {
      console.error("Error in /api/analyze:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };

  const addCorrectedSentence = (sentence) => {
    setCorrectedSentences([...correctedSentences, sentence]);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        
        <div className="md:col-span-2">
          {/* this is the text editor */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              AI Writing Assistant
            </h2>
            <p className="mb-4 text-gray-600">
              Enhance your writing with our advanced AI tools.
            </p>
            <textarea
              ref={textareaRef}
              value={text}
              onChange={handleTextChange}
              onSelect={handleSentenceSelection} // this works best inside textareas
              placeholder="Type here..."
              rows={10}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <div className="flex justify-end mt-4 space-x-4">
              <Button onClick={checkSpelling} icon={<FaSpellCheck />}>
                Check Spelling
              </Button>
              <Button onClick={checkGrammar} icon={<SiGrammarly />}>
                Check Grammar
              </Button>
            </div>
          </div>

          {/* this is the result section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ResultSection
              title="Spell Checked Text"
              text={spellCheckedText}
              onAccept={() => addCorrectedSentence(spellCheckedText)}
              icon={<FaSpellCheck className="text-green-500" />}
            />
            <ResultSection
              title="Grammar Checked Text"
              text={grammarCheckedText}
              onAccept={() => addCorrectedSentence(grammarCheckedText)}
              icon={<SiGrammarly className="text-blue-500" />}
            />
          </div>

          {/* this is the selected sentence */}
          {selectedSentence && (
            <div className="bg-white shadow-lg rounded-lg p-6 my-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FaPencilAlt className="mr-2 text-purple-500" />
                Selected Sentence:
              </h3>
              <p className="mb-4">{selectedSentence}</p>
              <Button onClick={rephraseSentence} icon={<FaSyncAlt />}>
                Rephrase
              </Button>
            </div>
          )}

            {/* this is the rephrase section */}
          {rephrasedSentences.length > 0 && (
            <div className="bg-white shadow-lg rounded-lg p-6 my-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FaSyncAlt className="mr-2 text-indigo-500" />
                Rephrased Sentences:
              </h3>
              {rephrasedSentences.map((sentence, index) => (
                <div
                  key={index}
                  className="mb-4 pb-4 border-b border-gray-200 last:border-b-0"
                >
                  <p className="mb-2">{sentence}</p>
                  <Button
                    onClick={() => addCorrectedSentence(sentence)}
                    icon={<FaCheck />}
                  >
                    Accept
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* this is the sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white shadow-lg rounded-lg p-6 sticky top-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FaCheck className="mr-2 text-green-500" />
              Corrected Sentences
            </h3>
            <p className="mb-4 text-gray-600">
              Your approved corrections will appear here.
            </p>
            {correctedSentences.length > 0 ? (
              correctedSentences.map((sentence, index) => (
                <div
                  key={index}
                  className="mb-2 pb-2 border-b border-gray-200 last:border-b-0"
                >
                  <p>{sentence}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">
                No corrected sentences yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Button = ({ onClick, children, icon }) => (
  <button
    onClick={onClick}
    className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300 flex items-center"
  >
    {icon && <span className="mr-2">{icon}</span>}
    {children}
  </button>
);

const ResultSection = ({ title, text, onAccept, icon }) => {
  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
        {icon} {title}
      </h2>
      <p className="mb-2">{text}</p>
      <button onClick={onAccept} className="px-4 py-1 bg-blue-600 text-white rounded">
        Accept
      </button>
    </div>
  );
};


export default Editor;
