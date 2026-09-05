import React, { Component } from "react";
import FilterBar from "./FilterBar";
import FilterModal from "./FilterModal";
import PropertyList from "./components/PropertyList";
import Shortlist from "./components/Shortlist";
import SiteHeader from "./components/SiteHeader";
import SiteBreadcrumb from "./components/SiteBreadcrumb";
import SiteFooter from "./components/SiteFooter";
import { base_path } from "./utils.js";

class App extends Component {
  state = {
    properties: [],
    sort: "none",
    filter: { gender: "none" },
    budget: "all",
    city: window.cityName || "Delhi",
    activeTab: "all",
    loading: true,
    error: "",
    updatingPropertyId: null
  };

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const city_name = window.cityName || params.get("city") || "Delhi";
    this.loadProperties(city_name);
  }

  loadProperties = city_name => {
    this.setState({ loading: true, error: "" });
    fetch(`${base_path}/api/get_properties_by_city.php?city=${encodeURIComponent(city_name)}`, {
      credentials: "include"
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Property request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then(responseData => {
        const properties = responseData.data || responseData;
        if (!Array.isArray(properties)) {
          throw new Error("Property API returned an invalid response");
        }

        this.setState({ properties, loading: false, error: "", city: city_name });
      })
      .catch(error => {
        console.error("Error fetching and parsing data", error);
        this.setState({ loading: false, error: "We couldn't load properties right now. Please try again." });
      });
  }

  toggleInterested = property_id => {
    this.setState({ updatingPropertyId: property_id });
    fetch(`${base_path}/api/toggle_interested.php`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `property_id=${encodeURIComponent(property_id)}`
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.success) {
          this.updateInterested(property_id, responseData.is_interested);
        } else if (!responseData.success && !responseData.is_logged_in) {
          if (window.$ && window.$("#login-modal").length) {
            window.$("#login-modal").modal("show");
          } else {
            window.location.href = `${base_path}/index.php`;
          }
        }
      })
      .catch(error => {
        console.error("Error toggling interest", error);
      })
      .finally(() => {
        this.setState({ updatingPropertyId: null });
      });
  };

  updateInterested = (property_id, isInterested) => {
    const updated_properties = this.state.properties.map(property => {
      if (String(property.id) !== String(property_id)) {
        return property;
      }

      return {
        ...property,
        is_interested: Boolean(isInterested),
        interested_users_count: Math.max(
          0,
          Number(property.interested_users_count || 0) + (isInterested ? 1 : -1)
        )
      };
    });
    this.setState({ properties: updated_properties });
  };

  updateSort = sort => this.setState({ sort });
  updateFilter = gender => this.setState({ filter: { gender } });
  updateBudget = budget => this.setState({ budget });
  changeCity = city => {
    const safeCity = city || "Delhi";
    this.setState({ city: safeCity, budget: "all" });
    this.loadProperties(safeCity);
  };
  setActiveTab = tab => this.setState({ activeTab: tab });

  render() {
    const showSiteChrome = window.location.port === "3000";
    let properties = [...this.state.properties];
    if (this.state.sort === "asc") {
      properties.sort((a, b) => a.rent - b.rent);
    } else if (this.state.sort === "desc") {
      properties.sort((a, b) => b.rent - a.rent);
    }

    if (this.state.filter.gender !== "none") {
      properties = properties.filter(
        property => property.gender === this.state.filter.gender
      );
    }

    if (this.state.budget !== "all") {
      const maxBudget = Number(this.state.budget);
      properties = properties.filter(property => Number(property.rent) <= maxBudget);
    }

    let content;
    if (this.state.loading) {
      content = <div className="text-center mt-5"><div className="spinner-border text-primary"></div><p>Loading properties...</p></div>;
    } else {
      content = (
        <div className="page-container">
          <div className="listing-header">
            <div>
              <p className="eyebrow">Find your next home</p>
              <h1>{this.state.city || "Your city"} PG listings</h1>
              <p className="listing-summary">{properties.length} places matched your search</p>
            </div>
            <div className="listing-tabs" role="tablist" aria-label="Property views">
              <button type="button" role="tab" aria-selected={this.state.activeTab === "all"} className={this.state.activeTab === "all" ? "active" : ""} onClick={() => this.setActiveTab("all")}>All properties</button>
              <button type="button" role="tab" aria-selected={this.state.activeTab === "shortlist"} className={this.state.activeTab === "shortlist" ? "active" : ""} onClick={() => this.setActiveTab("shortlist")}>Shortlist ({this.state.properties.filter(p => p.is_interested).length})</button>
            </div>
          </div>
          {this.state.error && <div className="alert alert-danger" role="alert">{this.state.error}</div>}
          <FilterBar currentSort={this.state.sort} updateSort={this.updateSort} currentFilter={this.state.filter} currentBudget={this.state.budget} updateBudget={this.updateBudget} currentCity={this.state.city} updateCity={this.changeCity} />
          {this.state.activeTab === "all" ? <PropertyList properties={properties} toggleInterested={this.toggleInterested} updatingPropertyId={this.state.updatingPropertyId} /> : <Shortlist properties={properties} toggleInterested={this.toggleInterested} updatingPropertyId={this.state.updatingPropertyId} />}
        </div>
      );
    }

    return (
      <>
        {showSiteChrome && <SiteHeader />}
        {showSiteChrome && <SiteBreadcrumb city={this.state.city} />}
        {content}

        <FilterModal
          currentFilter={this.state.filter}
          updateFilter={this.updateFilter}
        />
        {showSiteChrome && <SiteFooter />}
      </>
    );
  }
}

export default App;
