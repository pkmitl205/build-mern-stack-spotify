import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import "./LandingPage.scss"

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <img src={logo} alt="Spotify Clone Logo" className="logo" />
        <nav className="navigation">
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/signup" className="nav-link">
            Sign Up
          </Link>
        </nav>
      </header>
      <main className="main-content">
        <h1>Listen to Great Music Everywhere.</h1>
        <p>
          Join the ultimate music experience. Discover, listen, and share a
          constantly expanding mix of music from emerging and major artists
          around the world.
        </p>
        <Link to="/signup" className="signup-button">
          Get Started for Free
        </Link>
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Spotify Clone</p>
        <p>Made with <span style={{color: '#e25555'}}>&hearts;</span> in Thailand</p>
      </footer>
    </div>
  );
};

export default LandingPage;
