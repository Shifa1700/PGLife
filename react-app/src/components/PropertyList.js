import React from "react";
import PropertyCard from "./PropertyCard";
import NoProperty from "./NoProperty";

function PropertyList({ properties, toggleInterested, updatingPropertyId }) {
  if (!properties || properties.length === 0) {
    return <NoProperty />;
  }

  return (
    <div className="container">
      <div className="row">
        {properties.map(p => (
          <div key={p.id} className="col-md-6 mb-4">
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

export default PropertyList;
