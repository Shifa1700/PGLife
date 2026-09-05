import React from "react";
import { base_path } from "../utils.js";

function SiteFooter() {
  const cities = [
    ["Delhi", "Delhi"],
    ["Mumbai", "Mumbai"],
    ["Bengaluru", "Bangalore"],
    ["Hyderabad", "Hyderabad"]
  ];

  return (
    <footer className="footer">
      <div className="page-container footer-container">
        <div className="footer-cities">
          {cities.map(([city, label]) => (
            <div className="footer-city" key={city}>
              <a href={`${base_path}/property_list.php?city=${city}`}>PG in {label}</a>
            </div>
          ))}
        </div>
        <div className="footer-copyright">© 2026 Copyright PG Life</div>
      </div>
    </footer>
  );
}

export default SiteFooter;
