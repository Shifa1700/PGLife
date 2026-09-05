import React from "react";

function FilterBar({ currentSort, updateSort, currentFilter }) {
  return (
    <div className="filter-bar mb-3">
      <div className="btn-group mr-2">
        <button
          className={`btn btn-sm ${currentSort === "asc" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => updateSort("asc")}
        >
          Sort ↑
        </button>
        <button
          className={`btn btn-sm ${currentSort === "desc" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => updateSort("desc")}
        >
          Sort ↓
        </button>
      </div>

      <div className="btn-group">
        <button
          className={`btn btn-sm ${currentFilter.gender === "male" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => updateSort("male")}
        >
          Male
        </button>
        <button
          className={`btn btn-sm ${currentFilter.gender === "female" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => updateSort("female")}
        >
          Female
        </button>
        <button
          className={`btn btn-sm ${currentFilter.gender === "unisex" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => updateSort("unisex")}
        >
          Unisex
        </button>
      </div>
    </div>
  );
}

export default FilterBar;
