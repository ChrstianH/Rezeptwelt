import { Link, NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import { supabase } from "../lib/supabase";

export default function Header() {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setUser(null);
    supabase.auth.signOut();
    navigate("/");
  };
  return (
    <header>
      <div className="header-top"></div>
      <div className="navbar">
        <div className="header-left">
          <img src="../src/assets/img/logo.svg" alt="Die Rezeptwelt Logo" />
          <h2>Die Rezeptwelt</h2>
        </div>

        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/recipes">Rezepte</NavLink>
          {user && <NavLink to="/add-recipes">Rezept anlegen</NavLink>}
          <NavLink to="/about_us">Über uns</NavLink>
          {!user && <NavLink to="/login">Login</NavLink>}
          {user && (
            <div className="logout">
              <Link to="/profile">{user.email}</Link>
              <br />
              <button onClick={handleLogoutClick}>Logout</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
