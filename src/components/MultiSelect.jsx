"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const MultiSelect = ({ options, selectedValues, onChange }) => {
  const handleChange = (value) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((item) => item !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div className="flex flex-col">
      {options.map((option) => (
        <label key={option} className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={selectedValues.includes(option)}
            onChange={() => handleChange(option)}
            className="mr-2"
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default MultiSelect;
