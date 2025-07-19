import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div>
    <nav className="navbar navbar-dark bg-primary">
      <div className="container-fluid">
    <a className="navbar-brand">Simplilearn Leave Management</a>
    <button onClick={handleLogout} className="btn btn-outline-light" type="submit">Logout</button>
  </div>

    </nav>
    </div>
  );
}

export default Header;