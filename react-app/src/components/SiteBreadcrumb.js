import React from "react";
import { base_path } from "../utils.js";

function SiteBreadcrumb({ city }) {
  return (
    <nav className="react-breadcrumb" aria-label="breadcrumb">
      <ol className="breadcrumb py-2">
        <li className="breadcrumb-item">
          <a href={`${base_path}/index.php`}>Home</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">{city}</li>
      </ol>
    </nav>
  );
}

export default SiteBreadcrumb;
