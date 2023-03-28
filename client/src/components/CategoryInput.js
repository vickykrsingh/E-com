import React from "react";

function CategoryInput({ createCategoryHandler, name, setName }) {
  return (
    <form onSubmit={(e) => createCategoryHandler(e)}>
      <div className="mb-3">
        <input
          type="text"
          className="form-control w-75"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter New Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-warning text-white px-5 py-2">
        Submit
      </button>
    </form>
  );
}

export default CategoryInput;
