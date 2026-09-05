import React from "react";
import { assetUrl, base_path } from "../utils.js";

function SiteHeader() {
  const showModal = id => {
    if (window.$ && window.$(`#${id}`).modal) {
      window.$(`#${id}`).modal("show");
      return;
    }
    window.location.href = `${base_path}/index.php`;
  };

  return (
    <header className="header sticky-top">
      <nav className="navbar navbar-expand-md navbar-light">
        <a className="navbar-brand" href={`${base_path}/index.php`}>
          <img src={assetUrl("img/logo.png")} alt="PG Life" />
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#react-navbar" aria-controls="react-navbar" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="react-navbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button type="button" className="nav-link btn btn-link" onClick={() => showModal("signup-modal")}>
                <i className="fas fa-user"></i>Signup
              </button>
            </li>
            <li className="nav-vl"></li>
            <li className="nav-item">
              <button type="button" className="nav-link btn btn-link" onClick={() => showModal("login-modal")}>
                <i className="fas fa-sign-in-alt"></i>Login
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default SiteHeader;
