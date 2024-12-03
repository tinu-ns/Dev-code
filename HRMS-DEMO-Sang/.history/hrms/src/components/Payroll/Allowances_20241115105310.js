import React, { useState,useRef, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import "./Allowances.css";
import {
  FaList,
  FaTh,
  FaFilter,
  FaPlus,
  FaEdit,
  FaTrash
} from "react-icons/fa";

const allowancesData = [
  {
    id: 1,
    code: "TA",
    name: "Travel Allowance",
    amount: 200.0,
    oneTime: "No",
    taxable: "Yes",
    fixed: false,
  },
  {
    id: 2,
    code: "HA",
    name: "House Rent Allowance",
    amount: 1000.0,
    oneTime: "No",
    taxable: "Yes",
    fixed: true,
  },
  {
    id: 3,
    code: "DA",
    name: " Dearness Allowance",
    amount: 1500.0,
    oneTime: "No",
    taxable: "Yes",
    fixed: true,
  },
  // Add more allowance data here
];

const Allowances = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("card"); // 'card' or 'list'
  const [filteredData, setFilteredData] = useState(allowancesData);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    taxable: "",
    condition: "",
    base: "",
  });
  const navigate = useNavigate()

  const handleCreateAllowance = () => {
    navigate('/allowances/create');
  };

  

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term === "") {
      setFilteredData(allowancesData);
    } else {
      const filtered = allowancesData.filter((allowance) =>
        allowance.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const handleEdit = (id) => {
    alert(`Edit allowance with ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete allowance with ID: ${id}`);
  };


  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterOptions((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const applyFilter = () => {
    let filtered = allowancesData;

     // Filter based on taxable
    if (filterOptions.taxable) {
      filtered = filtered.filter((allowance) => allowance.taxable === filterOptions.taxable);
    }

    // Filter based on condition (Fixed/Non-Fixed)

    if (filterOptions.condition) {
      filtered = filtered.filter((allowance) => (filterOptions.condition === "Fixed" ? allowance.fixed : !allowance.fixed));
    }

     // Apply the filtered data
    setFilteredData(filtered);
  };

  const getActiveFilters = () => {
    let activeFilters = [];
    if (filterOptions.taxable) {
      activeFilters.push(`Taxable: ${filterOptions.taxable}`);
    }
    if (filterOptions.condition) {
      activeFilters.push(`Condition: ${filterOptions.condition}`);
    }
    if (filterOptions.base) {
      activeFilters.push(`Base: ${filterOptions.base}`);
    }
    return activeFilters;
  };

  const removeFilter = (filter) => {
    if (filter.includes("Taxable")) {
      setFilterOptions((prev) => ({ ...prev, taxable: "" }));
    } else if (filter.includes("Condition")) {
      setFilterOptions((prev) => ({ ...prev, condition: "" }));
    } else if (filter.includes("Base")) {
      setFilterOptions((prev) => ({ ...prev, base: "" }));
    }
  };


  return (
    <div className="allowances-container">
      <header className="allowances-header">
        <h2>Allowances</h2>
        <div className="controls">
          <input 
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <button
            className={`view-toggle ${view === "list" ? "active" : ""}`}
            onClick={() => setView("list")}
          >
            <FaList />
          </button>
          <button 
            className={`view-toggle ${view === "card" ? "active" : ""}`}
            onClick={() => setView("card")}
          >
            <FaTh />
          </button>
          <button className="filter-btn" onClick={toggleFilterVisibility}>
            <FaFilter /> Filter
          </button>
          <button className="create-btn" onClick={handleCreateAllowance}> 
            <FaPlus /> Create
          </button>
        </div>
      </header>

       {/* Display active filters as tags */}
       <div className="active-filters">
        {getActiveFilters().map((filter, index) => (
          <span key={index} className="filter-tag">
            {filter} <button onClick={() => removeFilter(filter)}>x</button>
          </span>
        ))}
      </div>

      {isFilterVisible && (
        <div className="filter-popup" ref={filterRef}>
          <div className="filter-form">
            <div className="filter-row">
              <label>Taxable</label>
              <select
                name="taxable"
                onChange={handleFilterChange}
                value={filterOptions.taxable}
              >
                <option value="">Select Taxable</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="filter-row">
              <label>Condition</label>
              <select
                name="condition"
                onChange={handleFilterChange}
                value={filterOptions.condition}
              >
                <option value="">Select Condition</option>
                <option value="Fixed">Fixed</option>
                <option value="Non-Fixed">Non-Fixed</option>
              </select>
            </div>
            <div className="filter-row">
              <label>Base</label>
              <select
                name="base"
                onChange={handleFilterChange}
                value={filterOptions.base}
              >
                <option value="">Select Base</option>
                <option value="Monthly">Monthly</option>
                <option value="Hourly">Hourly</option>
              </select>
            </div>
            <button onClick={applyFilter}>Apply Filter</button>
          </div>
        </div>
      )}



      <div className="status-indicators">
        <span className="dot not-fixed">Not Fixed</span>
        <span className="dot fixed">Fixed</span>
        <span className="dot non-taxable">Non Taxable</span>
        <span className="dot taxable">Taxable</span>
      </div>

      {view === "card" ? (
        <div className="card-view">
          {filteredData.map((allowance) => (
            <div className="allowance-card" key={allowance.id}>
              <div className="card-icon">{allowance.code}</div>
              <div className="card-content">
                <h3>{allowance.name}</h3>
                <p>Amount: {allowance.amount}</p>
                <p>One Time Allowance: {allowance.oneTime}</p>
                <p>Taxable: {allowance.taxable}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="list-view">
           <div className="table-container">
          <table>
            <thead>
              <tr>
              <th className="sticky-column">Allowance</th>
                  <th className="scrollable-column">Specific Employees</th>
                  <th className="scrollable-column">Excluded Employees</th>
                  <th className="scrollable-column">Is Taxable</th>
                  <th className="scrollable-column">Is Condition Based</th>
                  <th className="scrollable-column">Condition</th>
                  <th className="scrollable-column">Is Fixed</th>
                  <th className="scrollable-column">Amount</th>
                  <th className="scrollable-column">Based On</th>
                  <th className="scrollable-column">Rate</th>
                  <th className="sticky-column">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((allowance) => (
                <tr key={allowance.id}>
                  <td className="sticky-column">{allowance.name}</td>
                  <td>-</td>
                  <td>-</td>
                  <td>{allowance.taxable}</td>
                  <td>No</td>
                  <td>-</td>
                  <td>{allowance.fixed ? "Yes" : "No"}</td>
                  <td>{allowance.amount}</td>
                  <td>-</td>
                  <td>-</td>
                  <td className="sticky-column">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(allowance.id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(allowance.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      )}

      <footer className="footer">
        <span>Page 1 of 1</span>
        <button className="add-btn">
          <FaPlus />
        </button>
      </footer>
    </div>
  );
};

export default Allowances;
