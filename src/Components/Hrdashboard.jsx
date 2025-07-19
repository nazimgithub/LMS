import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function Hrdashboard() {

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/employees")
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.error(err));
  }, []);


  return <>
  <Header />
    <div className="container-fluid" style={{ backgroundImage: "url(/login-page-bg.jpg)", height: "100vh"  }}>
<div className="row">
  <div className="col-sm-4 mt-5">
    <div className="card opacity-75">
      <div className="card-body">
        <h3 className="card-title text-center mb-3">Add New Employee</h3>
        <Link className="btn btn-primary" to="/add-employee">Add Employee</Link>
      </div>
    </div>
    <div className="col-sm-4"></div>
  </div>
</div>
<hr></hr>
<div className="row">
    <h4 className="text-center text-danger">Employee List</h4>  
  <div className="col-sm-1"></div>
  <div className="col-sm-10 card mt-2">
    <table className="table table-striped mt-2">
    <thead>
      <th>S No.</th>
      <th>Employee Name</th>
      <th>Department</th>
      <th>Email</th>
      <th>Action</th>
    </thead>
    <tbody>
      {employees.map(data => (
          <tr key={data.id}>
        <td>1</td>
        <td>{data.name}</td>
        <td>{data.dept}</td>
        <td>{data.email}</td>
        <td><button className="btn btn-primary">Manage Leave</button></td>
      </tr>
        ))}
      </tbody>
</table>
  </div>
  <div className="col-sm-1"></div>  
  </div>
  <hr></hr>
  <div className="row">
  <h4 className="text-center text-danger">Leave Requests</h4>  
  <div className="col-sm-1"></div>
  <div className="col-sm-10 card mt-2">
    <table className="table table-striped mt-2">
    <thead>
      <th>S No.</th>
      <th>Employee Name</th>
      <th>Department</th>
      <th>Email</th>
      <th>Action</th>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>John Doe</td>
        <td>HR</td>
        <td>3X7JG@example.com</td>
        <td><button className="btn btn-primary">Manage Leave</button></td>
      </tr>
      </tbody>
</table>
  </div>
  <div className="col-sm-1"></div>  
  </div> 
    </div>
  </>;
}

export default Hrdashboard;
