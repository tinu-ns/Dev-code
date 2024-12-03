import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {useDebounce} from 'use-debounce'
import "./Allowances.css";
import {
  FaList,
  FaTh,
  FaFilter,
  FaPlus,
  FaEdit,
  FaTrash
} from "react-icons/fa";

const initialAllowancesData = [
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
    name: "Dearness Allowance",
    amount: 1500.0,
    oneTime: "No",
    taxable: "Yes",
    fixed: true,
  },
  // Add more allowance data here
];

const Allowances = () => {
  const [allowancesData, setAllowancesData] = useState(initialAllowancesData);
  const [filteredData, setFilteredData] = useState(initialAllowancesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("card"); 
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    taxable: "",
    condition: "",
    base: "",
  });

  import { useDebounce } from 'use-debounce';

const [debouncedSearchTerm] = useDebounce(searchTerm, 500);  // Delay of 500ms

useEffect(() => {
  if (debouncedSearchTerm === "") {
    setFilteredData(allowancesData);
  } else {
    const filtered = allowancesData.filter((allowance) =>
      allowance.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }
}, [debouncedSearchTerm, allowancesData]);


  const navigate = useNavigate();
  const location = useLocation();
{/*
  useEffect(() => {
    console.log(location.state);
    // Check for new allowance data in location.state
    if (location.state?.newAllowance) {
      const newAllowance = location.state.newAllowance;
      setAllowancesData((prev) => [...prev, newAllowance]);
      setFilteredData((prev) => [...prev, newAllowance]);
    }
  }, [location.state]);

  

  useEffect(() => {
    const storedAllowance = localStorage.getItem('newAllowance');
    if (storedAllowance) {
      const newAllowance = JSON.parse(storedAllowance);
      setAllowancesData((prev) => [...prev, newAllowance]);
      setFilteredData((prev) => [...prev, newAllowance]);
      
      // Optionally, clear localStorage to prevent future overwriting
      localStorage.removeItem('newAllowance');
    }
  }, []);



useEffect(() => {
  // Check for new allowance data in location.state
  if (location.state?.newAllowance) {
    const newAllowance = location.state.newAllowance;

    // Update allowancesData with the new allowance
    setAllowancesData((prev) => [...prev, newAllowance]);
  }
}, [location.state]);


  const handleCreateAllowance = () => {
    navigate('/allowances/create');
  };

*/}


useEffect(() => {
  const fetchAllowances = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/allowances");
      setAllowancesData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching allowances:", error);
    }
  };

  fetchAllowances();
}, []);

const handleCreateAllowance = async (newAllowance) => {
  try {
    // Create the allowance first
    const response = await axios.post("http://localhost:5000/api/allowances", newAllowance);
    setAllowancesData((prev) => [...prev, response.data]);
    setFilteredData((prev) => [...prev, response.data]);

    // Then navigate to the create page
    navigate('/allowances/create');
  } catch (error) {
    console.error("Error creating allowance:", error);
  }
};

const areFiltersApplied = filterOptions.taxable || filterOptions.condition || filterOptions.base;






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
    //alert(`Edit allowance with ID: ${id}`);
    navigate(`/allowances/edit/${id}`);
  };

  const handleDelete = async(id) => {
    //alert(`Delete allowance with ID: ${id}`);

    try {
      await axios.delete(`http://localhost:5000/api/allowances/${id}`);
      setAllowancesData((prev) => prev.filter((allowance) => allowance.id !== id));
      setFilteredData((prev) => prev.filter((allowance) => allowance.id !== id));
      alert("Allowance deleted successfully!");
    } catch (error) {
      console.error("Error deleting allowance:", error);
      alert("Failed to delete allowance.");
    }

  };

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

  {/*const applyFilter = () => {
    let filtered = allowancesData;

    if (filterOptions.taxable) {
      filtered = filtered.filter((allowance) => allowance.taxable === filterOptions.taxable);
    }

    if (filterOptions.condition) {
      filtered = filtered.filter((allowance) => 
        filterOptions.condition === "Fixed" ? allowance.fixed : !allowance.fixed
      );
    }

    setFilteredData(filtered);
  };

*/}

const applyFilter = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/allowances", {
      params: filterOptions,
    });
    setFilteredData(response.data);

    if (response.data.length === 0) {
      alert("No allowances found for the selected filter options.");
    }
  } catch (error) {
    console.error("Error applying filter:", error);
  }
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
{/*
  const removeFilter = (filter) => {
    if (filter.includes("Taxable")) {
      setFilterOptions((prev) => ({ ...prev, taxable: "" }));
    } else if (filter.includes("Condition")) {
      setFilterOptions((prev) => ({ ...prev, condition: "" }));
    } else if (filter.includes("Base")) {
      setFilterOptions((prev) => ({ ...prev, base: "" }));
    }
  };
*/}



const removeFilter = (filter) => {
  if (filter.startsWith("Taxable")) {
    setFilterOptions((prev) => ({ ...prev, taxable: "" }));
  } else if (filter.startsWith("Condition")) {
    setFilterOptions((prev) => ({ ...prev, condition: "" }));
  } else if (filter.startsWith("Base")) {
    setFilterOptions((prev) => ({ ...prev, base: "" }));
  }
  applyFilter();  // Reapply filter after removing a filter
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

      {/* Active Filters */}
      <div className="active-filters">
        {getActiveFilters().map((filter, index) => (
          <span key={index} className="filter-tag">
            {filter} <button onClick={() => removeFilter(filter)}>x</button>
          </span>
        ))}
      </div>

      {/* Render Filters */}
      {isFilterVisible && (
        <div className="filter-popup">
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
            <button onClick={applyFilter} disabled={!areFiltersApplied}>Apply Filter</button>
          </div>
        </div>
      )}

      {/* Allowances View */}
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
    </div>
  );
};

export default Allowances;
