function Navbar() {
  return (
    <nav className="navbar">
      <h2>EventEase</h2>

      <div className="nav-links">
        <a href="#">Home</a>
        <a href="#">Events</a>
        <a href="#">Create Event</a>
        <button>Login</button>
      </div>
    </nav>
  );
}

export default Navbar;