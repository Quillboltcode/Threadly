import React from "react";

const InputField = ({ label, type, name, value, onChange, placeholder }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white"
        required
      />
    </div>
  );
};

export default InputField;
