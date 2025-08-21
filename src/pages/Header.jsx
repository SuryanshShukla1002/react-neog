import { Link } from "react-router-dom";

const Header = ({ onSearch }) => {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container">
        <Link to="/">
          <img
            className="img-fluid"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4hXcWVSfumYQfd1GhIx2UUuahNgXZVai1og&s"
            alt="meetu_app"
            style={{ width: "80px", height: "auto" }}
          />
        </Link>
        <form
          className="d-flex"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search by title or tags..."
            aria-label="Search"
            onChange={(e) => onSearch(e.target.value.trim())}
          />
        </form>
      </div>
    </nav>
  );
};

export default Header;
