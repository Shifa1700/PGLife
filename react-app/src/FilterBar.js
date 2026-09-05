import React from 'react';
import { base_path } from './utils.js';

const cityOptions = ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Pune", "Chennai", "Noida"];

const FilterBar = props => {
  return (
    <div className="filter-bar row align-items-center justify-content-between g-2 mb-4">
      <div className="col-md-4 col-12">
        <label className="form-label mb-1">City</label>
        <select
          className="form-control"
          value={props.currentCity || "Delhi"}
          onChange={event => props.updateCity(event.target.value)}
        >
          {cityOptions.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <div className="col-md-4 col-12">
        <label className="form-label mb-1">Budget</label>
        <select
          className="form-control"
          value={props.currentBudget || "all"}
          onChange={event => props.updateBudget(event.target.value)}
        >
          <option value="all">Any budget</option>
          <option value="5000">Under ₹5,000</option>
          <option value="8000">Under ₹8,000</option>
          <option value="12000">Under ₹12,000</option>
          <option value="15000">Under ₹15,000</option>
        </select>
      </div>

      <div className="col-md-4 col-12">
        <label className="form-label mb-1">Sort</label>
        <div className="btn-group w-100">
          <button
            type="button"
            className={`btn ${props.currentSort === "desc" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => props.updateSort("desc")}
          >
            Highest rent 
          </button>
          <button
            type="button"
            className={`btn ${props.currentSort === "asc" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => props.updateSort("asc")}
          >
            Lowest rent
          </button>
        </div>
      </div>

      <div className="col-12 mt-2">
        <button
          type="button"
          className={`btn btn-sm ${props.currentFilter.gender !== "none" ? "btn-dark" : "btn-outline-dark"}`}
          data-toggle="modal"
          data-target="#filter-modal"
        >
          <img src={base_path + "/img/filter.png"} alt="filter" style={{ width: 18, marginRight: 8 }} />
          Filter by gender
        </button>
      </div>
    </div>
  );
}

export default FilterBar;
