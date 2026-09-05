import React from "react";

function PropertyCard({ property, toggleInterested }) {
  return (
    <div className="card mb-3 shadow-sm">
      <img
        src={property.image}
        alt={property.name}
        className="card-img-top"
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{property.name}</h5>
        <p className="card-text text-muted">{property.address}</p>
        <p className="card-text">
          <span className="badge bg-info me-2">₹{property.rent}</span>
          <span className="badge bg-secondary">{property.gender}</span>
        </p>
        <p className="card-text">
          <small className="text-muted">
            Cleanliness: {property.rating_clean} | Food: {property.rating_food} | Safety: {property.rating_safety}
          </small>
        </p>
        <button
          className={`btn ${property.is_interested ? "btn-success" : "btn-outline-primary"}`}
          onClick={toggleInterested}
        >
          {property.is_interested ? "Interested ✓" : "Mark Interested"}
        </button>
        <span className="ms-2 text-muted">
          {property.interested_users_count} users interested
        </span>
      </div>
    </div>
  );
}

export default PropertyCard;
