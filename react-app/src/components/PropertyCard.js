import React from "react";
import { assetUrl } from "../utils.js";

function PropertyCard({ property, toggleInterested, isUpdating }) {
  return (
    <article className="property-card">
      <img
        src={assetUrl(property.image)}
        alt={property.name}
        className="property-card-image"
      />
      <div className="property-card-body">
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="property-name">{property.name}</h5>
          <span className="property-gender-badge">{property.gender}</span>
        </div>
        <p className="property-address">{property.address}</p>
        <p className="property-rating">
          <span>★ {((Number(property.rating_clean || 0) + Number(property.rating_food || 0) + Number(property.rating_safety || 0)) / 3).toFixed(1)}</span>
          <small>{property.interested_users_count} interested</small>
        </p>
        <p className="property-rent">₹{Number(property.rent).toLocaleString("en-IN")} <small>/ month</small></p>
        <div className="property-card-footer">
          <a className="btn btn-outline-primary" href={`${window.location.port === "3000" ? "http://localhost/PGLife" : "."}/property_detail.php?property_id=${property.id}`}>View details</a>
          <button
            type="button"
            disabled={isUpdating}
            className={`btn ${property.is_interested ? "btn-danger" : "btn-outline-danger"}`}
            onClick={toggleInterested}
          >
            {isUpdating ? "Saving..." : property.is_interested ? "♥ Shortlisted" : "♡ Shortlist"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default PropertyCard;
