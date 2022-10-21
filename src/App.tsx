import { useEffect, useState } from "react";
import "./App.css";
import Button from "./button";

const regex = /([\+x\/]{1}(-?\d+\.?\d*)$)|(^-?\d+\.?\d*$)/;
const isValid = (form: string): boolean => {
  if (form === "") {
    return true;
  } else if (regex.test(form)) {
    return isValid(form.replace(regex, ""));
  } else {
    return false;
  }
};

const ops = ["+", "/", "*", "-"];
const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

const evaluate = (inp: string) => Function(`return (${inp})`)();

function App() {
  const [form, setForm] = useState("");
  const [res, setRes] = useState(null as number | null);
  const [lastKey, setLastKey] = useState("");
  const [display, setDisplay] = useState("");

  const isValid = (key: string): boolean =>
    !/(\.\d*\.$)|([^\d]00$)|(^00$)/.test(form + key);

  const handleInput = (key: string) => {
    if (key === "=") {
      console.log(`evaluating ${form}`);
      console.log(`result: ${evaluate(form)}`);
      setRes(evaluate(form));
    } else if (lastKey === "=" && digits.includes(key)) {
      setForm(key);
    } else if (key === "AC") {
      setForm("");
      setRes(null);
    } else if (/[\*\+\-\/]\-$/.test(form) && ops.includes(key)) {
      setForm(form.slice(0, -2) + key);
    } else if (ops.includes(lastKey) && ops.includes(key) && key != "-") {
      setForm(form.slice(0, -1) + key);
    } else if (isValid(key)) {
      console.log(form + key);
      setForm(form + key);
    }
    setLastKey(key);
  };

  useEffect(() => {
    if (res) {
      setForm(`${res}`);
    }
  }, [res]);

  useEffect(() => {
    setDisplay([""].includes(form) ? "0" : form);
  }, [form]);

  return (
    <div className="App">
      <div
        id="calculator"
        className="m-auto font-mono w-64 border border-collapse box-content"
      >
        <div id="display" className="w-full h-16 m-auto">
          {display}
        </div>
        <Button
          handleInput={handleInput}
          ky="AC"
          id="clear"
          className="w-32 bg-red-600 text-white"
        />
        <Button
          handleInput={handleInput}
          ky="/"
          id="divide"
          className="bg-gray-400"
        />
        <Button
          handleInput={handleInput}
          ky="*"
          id="multiply"
          className="bg-gray-400"
        />
        <Button handleInput={handleInput} ky="7" id="seven" />
        <Button handleInput={handleInput} ky="8" id="eight" />
        <Button handleInput={handleInput} ky="9" id="nine" />
        <Button
          handleInput={handleInput}
          ky="-"
          id="subtract"
          className="bg-gray-400"
        />
        <Button handleInput={handleInput} ky="4" id="four" />
        <Button handleInput={handleInput} ky="5" id="five" />
        <Button handleInput={handleInput} ky="6" id="six" />
        <Button
          handleInput={handleInput}
          ky="+"
          id="add"
          className="bg-gray-400"
        />
        <div className="flex w-full">
          <div className="w-48 flex-shrink-0 flex flex-wrap">
            <Button handleInput={handleInput} ky="1" id="one" />
            <Button handleInput={handleInput} ky="2" id="two" />
            <Button handleInput={handleInput} ky="3" id="three" />
            <Button
              handleInput={handleInput}
              ky="0"
              id="zero"
              className="!w-32"
            />
            <Button handleInput={handleInput} ky="." id="decimal" />
          </div>
          <Button
            handleInput={handleInput}
            ky="="
            id="equals"
            className="h-32 bg-sky-400"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
