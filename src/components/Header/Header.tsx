import './Header.css';

const Header = () => {
  return (
    <header>
      {location.pathname === '/' ? (
        <div className="header-home">
          <h1>GameAbility</h1>
          <p>Line of text about the website</p>
        </div>
      ) : (
        <span className="header-subpage">
          <a href="/">GameAbility</a>
        </span>
      )}
      <span>Login</span>
    </header>
  );
};

export default Header;
