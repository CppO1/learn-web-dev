export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <span className="logo-text">BARBBOSS</span>
      </div>
      <nav className="nav-links">
        <div className="nav-link active"><a href="#">Услуги</a></div>
        <div className="nav-link"><a href="#">Галерея</a></div>
        <div className="nav-link"><a href="#">Команда</a></div>
        <div className="nav-link"><a href="#">Отзывы</a></div>
        <div className="nav-link"><a href="#">Контакты</a></div>
      </nav>
    </header>
  );
}