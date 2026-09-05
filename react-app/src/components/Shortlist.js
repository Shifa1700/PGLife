import React from "react";
import PropertyCard from "./PropertyCard";
import NoProperty from "./NoProperty";

function Shortlist({ properties, toggleInterested, updatingPropertyId }) {
  // Filter only interested properties
  const shortlist = properties.filter(p => p.is_interested);

  if (!shortlist || shortlist.length === 0) {
    return <NoProperty />;
  }

  return (
    <div className="container shortlist-section">
      <h2 className="section-title mb-4">My shortlist <span>{shortlist.length}</span></h2>
      <div className="row">
        {shortlist.map(p => (
          <div key={p.id} className="col-12 mb-4">
            <PropertyCard
              property={p}
              toggleInterested={() => toggleInterested(p.id)}
              isUpdating={updatingPropertyId === p.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shortlist;
