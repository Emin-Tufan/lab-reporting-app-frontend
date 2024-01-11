import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

export const Navbar = () => {

  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const roles: string[] = (decodedToken as any)?.authorities;


  const handleLogout = async () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <nav className="navbar navbar-expand-lg bg-primary bg-opacity-10">
      <div className="container-fluid">
        <a className="navbar-brand " href="/home">
          <img
            src={require("../../Images/navBarLogo.jpeg")}
            alt="logo"
            style={{ width: "50px", height: "50px" }} className="rounded-circle"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link active" aria-current="page" to="/home">
              Home
            </Link>
            {roles && roles.includes('ROLE_ADMIN') && (
              <>
                <li>
                  <Link className="nav-link active" to="/review-patients">Patients</Link>
                </li>
                <li>
                  <Link className="nav-link active" to="/review-reports">Reports</Link>
                </li>

              </>
            )}
            {roles && roles.includes('ROLE_USER') && (
              <>
                <li>
                  <Link className="nav-link active" to="/patient-reports">My Reports</Link>
                </li>
              </>
            )}
          </div>
        </div>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item m-1">
            {roles ?
              <Link type='button' className='btn btn-outline-dark  text-light-50 ' to='/home' onClick={handleLogout}>Logout</Link> :
              <Link type='button' className='btn btn-outline-dark  text-light-50 ' to='/login' >Sign In</Link>
            }
          </li>
          <li className="nav-item m-1">
            {!roles &&
              <Link type='button' className='btn btn-outline-dark  text-light-50 ' to='/register' >Register</Link>
            }
          </li>
        </ul>
      </div>
    </nav>
  );
}
