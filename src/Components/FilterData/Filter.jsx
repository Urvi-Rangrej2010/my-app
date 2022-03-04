import React, { useEffect, useState } from "react";
import borrowers from "../../assets/borrowers.json";
import "./Filter.css";
const Filter = () => {
  const [filter, setFilter] = useState();
  const [filterInput, setFilterInput] = useState();
  const [filterCol, setFilterCol] = useState();
  const [filterData, setFilterData] = useState([]);
  const [filterField, setFilterField] = useState();
  const column = [
    { name: "firstName", type: "string" },
    { name: "lastName", type: "string" },
    { name: "dateOfBirth", type: "date" },
    { name: "creditScore", type: "numeric" },
    { name: "maritalStatus", type: "string" },
    { name: "w2Income", type: "numeric" },
    { name: "emailAddress", type: "string" },
    { name: "homePhone", type: "numberic" },
    { name: "cellPhone", type: "numeric" },
    { name: "currentAddress", type: "string" },
    { name: "employer", type: "string" },
    { name: "title", type: "string" },
    { name: "startDate", type: "date" },
    { name: "subjectPropertyAddress", type: "string" },
  ];

  const handleChange = (e) => {
    setFilterField(e.target.value);
    let d = column.find((ele) => ele.name === e.target.value);
    let arr = [];
    switch (d.type) {
      case "string":
        arr.push("Equals");
        arr.push("Includes");
        setFilter(arr);
        break;
      case "date":
        arr.push("Greater than");
        arr.push("Less than");
        setFilter(arr);
        break;
      case "numeric":
        arr.push("Greater than");
        arr.push("Less than");
        setFilter(arr);
        break;
      default:
        break;
    }
  };
  function getUser() {
    let data = [];
    if (filterCol === "Equals") {
      if (filterField === "firstName") {
        data = borrowers.filter((e) => e.firstName == filterInput);
      } else if (filterField === "lastName") {
        data = borrowers.filter((e) => e.lastName == filterInput);
      } else if (filterField === "maritalStatus") {
        data = borrowers.filter((e) => e.maritalStatus == filterInput);
      }
    } else if (filterCol === "Includes") {
      if (filterField === "firstName") {
        data = borrowers.filter((e) => e.firstName.includes(filterInput));
      }
      if (filterField === "lastName") {
        data = borrowers.filter((e) => e.lastName.includes(filterInput));
      }
    } else if (filterCol === "Greater than") {
      if (filterField === "creditScore") {
        data = borrowers.filter((e) => e.creditScore > filterInput);
      } else if (filterField === "w2Income") {
        data = borrowers.filter((e) => e.w2Income > filterInput);
      }
    } else if (filterCol === "Less than") {
      if (filterField === "creditScore") {
        data = borrowers.filter((e) => e.creditScore < filterInput);
      } else if (filterField === "w2Income") {
        data = borrowers.filter((e) => e.w2Income < filterInput);
      }
    }
    return data;
  }

  useEffect(() => {
    if (filterInput) {
      let d = getUser();
      setFilterData(d);
    } else {
      setFilterData(borrowers);
    }
  }, [filterInput, filterField]);
  return (
    <div className="filter">
      <div className="d-flex head m-2">
        <h1>Filers</h1>
        <button type="button" className="ml-5 btn btn-sm">
          Add Filer
        </button>
      </div>
      <div className="input-field p-2 d-flex">
        <span className="m-2">Where</span>
        <select className="m-2" id="cars" onChange={handleChange}>
          <option value="clear"></option>
          {column.map((field, i) => (
            <option key={i} value={field.name}>
              {field.name}
            </option>
          ))}
        </select>
        <select
          className="m-2"
          id="cars"
          onChange={(e) => {
            setFilterCol(e.target.value);
          }}
        >
          <option></option>
          {filter &&
            filter.map((field, i) => (
              <option key={i} value={field.type}>
                {field}
              </option>
            ))}
        </select>
        <input
          type="text"
          className="m-2"
          onChange={(e) => {
            setFilterInput(e.target.value);
          }}
        />
      </div>

      <div>
        <table className="table table-bordered table-sm">
          <thead>
            <tr>
              {column.map((col, i) => (
                <th key={i}>{col.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filterData &&
              filterData.map((data, i) => (
                <tr key={i}>
                  <td>{data.firstName}</td>
                  <td>{data.lastName}</td>
                  <td>{data.dateOfBirth}</td>
                  <td>{data.creditScore}</td>
                  <td>{data.maritalStatus}</td>
                  <td>{data.w2Income}</td>
                  <td>{data.emailAddress}</td>
                  <td>{data.homePhone}</td>
                  <td>{data.cellPhone}</td>
                  <td>{data.currentAddress}</td>
                  <td>{data.employer}</td>
                  <td>{data.title}</td>
                  <td>{data.startDate}</td>
                  <td>{data.subjectPropertyAddress}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Filter;
