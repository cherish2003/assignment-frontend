"use client";
import { useState } from "react";
import axios from "axios";
import MultiSelect from "@/components/MultiSelect";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedInput = JSON.parse(jsonInput);
      if (!Array.isArray(parsedInput.data)) {
        throw new Error("Invalid JSON format: data should be an array");
      }
      const res = await axios.post(`${process.env.api}/bfhl`, parsedInput);
      console.log(res);

      setResponse(res.data);
      setError("");
    } catch (err) {
      console.log(err);
      setError("Invalid JSON input");
      setResponse(null);
    }
  };

  const handleSelectionChange = (values) => {
    setSelectedOptions(values);
  };

  const renderResponse = () => {
    if (!response) return null;

    const { alphabets, numbers, highest_alphabet } = response;
    const displayData = {};

    if (selectedOptions.includes("Alphabets"))
      displayData.alphabets = alphabets;
    if (selectedOptions.includes("Numbers")) displayData.numbers = numbers;
    if (selectedOptions.includes("Highest alphabet"))
      displayData.highest_alphabet = highest_alphabet;

    return <pre>{JSON.stringify(displayData, null, 2)}</pre>;
  };

  return (
    <div className="container">
      <h1 className="text-4xl font-bold text-center mb-4">
        BFHL Full stack Assignment
      </h1>
      <Card className="p-4 mb-4">
        <form onSubmit={handleSubmit} className="mb-4">
          <Textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='Enter JSON like {"data": ["A","C","z"]}'
            rows="5"
            className="mb-4"
          />
          <Button type="submit">Submit</Button>
        </form>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </Card>

      {response && (
        <Card className="p-4 mt-4">
          <div className="flex space-x-4">
            <div className="w-1/3">
              <h2 className="text-2xl font-bold mb-2">Options</h2>
              <MultiSelect
                options={["Alphabets", "Numbers", "Highest alphabet"]}
                selectedValues={selectedOptions}
                onChange={handleSelectionChange}
              />
            </div>
            <div className="w-2/3">
              <h2 className="text-2xl font-bold mb-2">Response</h2>
              {renderResponse()}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
