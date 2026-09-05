import React from "react";

function FilterModal({ currentFilter, updateFilter }) {
  return (
    <div className="modal fade" id="filter-modal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Filter Properties</h5>
            <button type="button" className="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <label>Gender</label>
            <select
              className="form-control"
              value={currentFilter.gender}
              onChange={e => updateFilter(e.target.value)}
            >
              <option value="none">Any</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;
