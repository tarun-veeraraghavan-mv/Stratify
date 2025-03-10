import React from "react";

interface InputProps {
  labelText: string;
  inputText: string;
  name: string;
  type: string;
}

export default function Input({
  labelText,
  inputText,
  name,
  type,
}: InputProps) {
  if (
    type === "text" ||
    type === "email" ||
    type === "password" ||
    type === "date" ||
    type === "time" ||
    type === "phone"
  ) {
    return (
      <div>
        <label htmlFor={name} className="text-md block font-bold">
          {labelText}
        </label>
        <input
          type={type}
          placeholder={inputText}
          name={name}
          id={name}
          className="text-lg w-full border-b-2 border-gray-300 font-medium text-gray-500 focus:outline-none focus:ring-0"
          required
          max={7}
        />
      </div>
    );
  }
  if (type === "number") {
    return (
      <div>
        <label htmlFor={name} className="text-md block font-bold">
          {labelText}
        </label>
        <input
          type={type}
          placeholder={inputText}
          name={name}
          id={name}
          className="text-lg w-full border-b-2 border-gray-300 font-medium text-gray-500 focus:outline-none focus:ring-0"
          required
          min={0}
        />
      </div>
    );
  }
}
