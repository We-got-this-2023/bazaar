import Logo from "../assets/Logo";

export default function Navbar() {
  return (
    <nav className="nav_section">
      <div className="nav_logoSection">
        <Logo className="nav_logo" />
        <p>Bazaar</p>
      </div>
      <div className="nav_searchBar">BIG SEARCH BAR</div>
    </nav>
  );
}
