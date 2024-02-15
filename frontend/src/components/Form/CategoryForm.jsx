import React from "react";

// making reusable form
const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form
        className="categoryForm flex justify-between space-x-2 px-2 md:px-4 "
        onSubmit={handleSubmit}
      >
        <input
          className="w-full border-b-2 border-solid border-black px-1 text-lg outline-none"
          type="text"
          placeholder="Enter new category"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button
          type="submit"
          className="searchBtn rounded border border-solid border-green-400 bg-green-300  px-2 font-semibold"
        >
          Create
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
