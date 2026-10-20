export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="brand-name">BARBBOSS</span>
          <span className="brand-desc">Все виды парикмахерских услуг для мужчин всех возрастов</span>
        </div>
        <div className="footer-contact">
          <div className="contact-col">
            <span className="col-title">Контакты</span>
            <a href="#">ул. Садовая, 15, Москва</a>
            <a href="#">+7 (495) 123-45-67</a>
          </div>
        </div>
        <div className="footer-rasp">
          <div className="rasp-col">
            <span className="col-title">Режим работы</span>
            <a href="#">Пн–Пт: 9:00 - 21:00</a>
            <a href="#">Сб-Вс: 10:00 - 19:00</a>
          </div>
        </div>
      </div>
      <div className="footer-line"></div>
      <div className="footer-bottom">
        <span className="copy">© 2026. Все права защищены.</span>
        <span className="legal">Политика конфиденциальности</span>
      </div>
    </footer>
  );
}