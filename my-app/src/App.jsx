import React from "react";

// --- ИКОНКИ (SVG) ---
const IconArrowRight = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
);
const IconArrowUpRight = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M7 7h10v10"/></svg>
);
const IconBook = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
);

export default function App() {
  return (
    <div className="page" style={{ background: "#FAFAFA", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      
      {/* 1. ШАПКА */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 48px", background: "#fff", borderBottom: "1px solid #EAEAEA" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "48px" }}>
          <div style={{ fontSize: "24px", fontWeight: "700", letterSpacing: "-1px" }}>folio.</div>
          <div style={{ fontSize: "12px", textTransform: "uppercase", color: "#888", letterSpacing: "1px" }}>Корпоративная библиотека</div>
        </div>
        <nav style={{ display: "flex", gap: "32px", fontSize: "14px", color: "#333" }}>
          <a href="#" style={{ textDecoration: "none", color: "inherit" }}>Каталог</a>
          <a href="#" style={{ textDecoration: "none", color: "inherit" }}>Библиотека</a>
          <a href="#" style={{ textDecoration: "none", color: "inherit" }}>Помощь</a>
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
          Уже есть аккаунт? <b>Log in</b> <IconArrowUpRight />
        </div>
      </header>

      {/* 2. ОСНОВНОЙ КОНТЕНТ */}
      <main style={{ padding: "48px", maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Заголовок страницы */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ fontSize: "12px", textTransform: "uppercase", color: "#888", marginBottom: "16px" }}>Личный каталог</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <h1 style={{ fontSize: "40px", fontWeight: "400", margin: "0 0 8px 0" }}>Моя библиотека</h1>
              <p style={{ color: "#666", margin: 0 }}>Что вы читаете сейчас и что брали раньше.</p>
            </div>
            <div style={{ fontSize: "12px", color: "#888", textTransform: "uppercase", letterSpacing: "1px" }}>Пятница, 16 октября 2026</div>
          </div>
          <hr style={{ border: "none", borderTop: "1px solid #EAEAEA", marginTop: "24px" }} />
        </div>

        {/* Сетка: Сайдбар + Контент */}
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "48px" }}>
          
          {/* --- ЛЕВЫЙ САЙДБАР (ПРОФИЛЬ) --- */}
          <aside>
            <div style={{ width: "80px", height: "80px", background: "#222", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: "600", marginBottom: "24px" }}>
              AM
            </div>
            <h2 style={{ fontSize: "24px", fontWeight: "500", margin: "0 0 4px 0" }}>Алекс Морган</h2>
            <a href="mailto:alex.morgan@company.com" style={{ color: "#666", textDecoration: "none", fontSize: "14px" }}>alex.morgan@company.com</a>
            
            <div style={{ display: "inline-block", background: "#F0F0F0", padding: "4px 8px", fontSize: "12px", marginTop: "16px", fontWeight: "500" }}>
              • Активный читатель
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #EAEAEA", margin: "32px 0" }} />

            {/* Инфо о пользователе */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", fontSize: "14px" }}>
              <div>
                <div style={{ color: "#888", fontSize: "12px", textTransform: "uppercase", marginBottom: "4px" }}>Отдел</div>
                <div style={{ fontWeight: "500" }}>Продукт-дизайн</div>
              </div>
              <div>
                <div style={{ color: "#888", fontSize: "12px", textTransform: "uppercase", marginBottom: "4px" }}>Роль</div>
                <div style={{ fontWeight: "500" }}>Читатель</div>
              </div>
              <div>
                <div style={{ color: "#888", fontSize: "12px", textTransform: "uppercase", marginBottom: "4px" }}>Зарегистрирован</div>
                <div style={{ fontWeight: "500" }}>02 марта 2026</div>
              </div>
              <div>
                <div style={{ color: "#888", fontSize: "12px", textTransform: "uppercase", marginBottom: "4px" }}>Номер читателя</div>
                <div style={{ fontWeight: "500" }}>FOL-M-0142</div>
              </div>
            </div>

            <button style={{ width: "100%", padding: "12px", border: "1px solid #CCC", background: "transparent", marginTop: "32px", fontSize: "14px", fontWeight: "500", cursor: "pointer", display: "flex", justifyContent: "space-between" }}>
              Редактировать профиль <span>✎</span>
            </button>
            
            <button style={{ width: "100%", padding: "12px", border: "none", background: "transparent", color: "#E55", marginTop: "8px", fontSize: "14px", cursor: "pointer", display: "flex", gap: "8px", alignItems: "center" }}>
              <span>←</span> Выйти
            </button>

            {/* Блок "Ещё один экземпляр" */}
            <div style={{ background: "#F4F4F4", padding: "24px", marginTop: "32px", fontSize: "14px" }}>
              <IconBook />
              <div style={{ fontWeight: "600", margin: "12px 0 8px 0" }}>Ещё один экземпляр доступен.</div>
              <div style={{ color: "#666", fontSize: "13px", marginBottom: "16px", lineHeight: "1.4" }}>Можно взять до 3 книг на 21 день. Продлить однажды, если никто не ждёт.</div>
              <a href="#" style={{ color: "#333", fontWeight: "500", textDecoration: "underline" }}>Правило выдачи ↗</a>
            </div>
          </aside>

          {/* --- ПРАВАЯ ЧАСТЬ (КОНТЕНТ) --- */}
          <div>
            
            {/* Статистика */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "#F5F5F5", padding: "32px", gap: "32px", marginBottom: "48px" }}>
              <div>
                <div style={{ fontSize: "32px", fontWeight: "400", marginBottom: "8px" }}>02</div>
                <div style={{ fontSize: "12px", color: "#888", textTransform: "uppercase" }}>Выдано</div>
              </div>
              <div>
                <div style={{ fontSize: "32px", fontWeight: "400", marginBottom: "8px" }}>03</div>
                <div style={{ fontSize: "12px", color: "#888", textTransform: "uppercase" }}>Возвращено</div>
              </div>
              <div>
                <div style={{ fontSize: "32px", fontWeight: "400", marginBottom: "8px" }}>01</div>
                <div style={{ fontSize: "12px", color: "#888", textTransform: "uppercase" }}>Свободный слот</div>
              </div>
            </div>

            {/* Текущие выдачи */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h3 style={{ fontSize: "24px", fontWeight: "400", margin: 0 }}>Текущие выдачи (2)</h3>
              <a href="#" style={{ color: "#333", textDecoration: "none", fontSize: "14px", fontWeight: "500" }}>Каталог ↗</a>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "64px" }}>
              
              {/* Карточка 1 */}
              <div style={{ border: "1px solid #EAEAEA", padding: "24px", display: "flex", flexDirection: "column", gap: "16px", background: "#fff" }}>
                <div style={{ display: "flex", gap: "16px" }}>
                  {/* Обложка-заглушка */}
                  <div style={{ width: "80px", height: "110px", background: "#EEE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#888", textAlign: "center", padding: "8px", border: "1px solid #DDD" }}>Дизайн повседневных вещей</div>
                  <div>
                    <h4 style={{ fontSize: "18px", margin: "0 0 8px 0", fontWeight: "500" }}>Дизайн повседневных вещей</h4>
                    <div style={{ color: "#666", fontSize: "14px" }}>Дон Норман</div>
                    <div style={{ color: "#999", fontSize: "12px", marginTop: "8px" }}>FOL-DE-002</div>
                  </div>
                </div>
                <hr style={{ border: "none", borderTop: "1px solid #EAEAEA", margin: "8px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                  <div>
                    <div style={{ color: "#888", textTransform: "uppercase", marginBottom: "4px" }}>Выдано</div>
                    <div style={{ fontWeight: "500" }}>05 октября 2026</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: "#888", textTransform: "uppercase", marginBottom: "4px" }}>Срок возврата</div>
                    <div style={{ fontWeight: "600", color: "#222" }}>26 октября 2026</div>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
                  <div style={{ background: "#F0F0F0", padding: "6px 12px", fontSize: "12px", fontWeight: "600" }}>• 10 дней осталось</div>
                  <a href="#" style={{ fontSize: "14px", color: "#333", fontWeight: "500", textDecoration: "none" }}>Продлить ↗</a>
                </div>
              </div>

              {/* Карточка 2 */}
              <div style={{ border: "1px solid #EAEAEA", padding: "24px", display: "flex", flexDirection: "column", gap: "16px", background: "#fff" }}>
                <div style={{ display: "flex", gap: "16px" }}>
                  <div style={{ width: "80px", height: "110px", background: "#EEE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#888", textAlign: "center", padding: "8px", border: "1px solid #DDD" }}>Глубокая работа</div>
                  <div>
                    <h4 style={{ fontSize: "18px", margin: "0 0 8px 0", fontWeight: "500" }}>Глубокая работа</h4>
                    <div style={{ color: "#666", fontSize: "14px" }}>Кэл Ньюпорт</div>
                    <div style={{ color: "#999", fontSize: "12px", marginTop: "8px" }}>FOL-DW-001</div>
                  </div>
                </div>
                <hr style={{ border: "none", borderTop: "1px solid #EAEAEA", margin: "8px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                  <div>
                    <div style={{ color: "#888", textTransform: "uppercase", marginBottom: "4px" }}>Выдано</div>
                    <div style={{ fontWeight: "500" }}>12 октября 2026</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: "#888", textTransform: "uppercase", marginBottom: "4px" }}>Срок возврата</div>
                    <div style={{ fontWeight: "600", color: "#222" }}>02 ноября 2026</div>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
                  <div style={{ background: "#F0F0F0", padding: "6px 12px", fontSize: "12px", fontWeight: "600" }}>• 17 дней осталось</div>
                  <a href="#" style={{ fontSize: "14px", color: "#333", fontWeight: "500", textDecoration: "none" }}>Продлить ↗</a>
                </div>
              </div>
            </div>

            {/* История выдач */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <div>
                <h3 style={{ fontSize: "24px", fontWeight: "400", margin: "0 0 4px 0" }}>История выдач</h3>
                <div style={{ color: "#888", fontSize: "14px" }}>Завершённые выдачи, новые сверху.</div>
              </div>
              <select style={{ padding: "8px 16px", border: "1px solid #CCC", background: "transparent", fontSize: "14px" }}>
                <option>Всё время</option>
              </select>
            </div>

            {/* Таблица */}
            <div style={{ background: "#F9F9F9", padding: "12px 24px", display: "grid", gridTemplateColumns: "2fr 2fr 1fr", fontSize: "12px", color: "#888", textTransform: "uppercase", marginBottom: "16px" }}>
              <div>Книга / Инв. номер</div>
              <div>Период выдачи</div>
              <div>Статус</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Строка 1 */}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr", alignItems: "center", borderBottom: "1px solid #EAEAEA", paddingBottom: "16px" }}>
                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                  <div style={{ width: "40px", height: "56px", background: "#EEE", border: "1px solid #DDD" }}></div>
                  <div>
                    <div style={{ fontWeight: "500", marginBottom: "4px" }}>Мыслить системно</div>
                    <div style={{ color: "#666", fontSize: "12px" }}>Донелла Х. Медоуз</div>
                    <div style={{ color: "#999", fontSize: "12px", marginTop: "4px" }}>FOL-TS-003</div>
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: "500" }}>24 августа 2026 — 14 сентября 2026</div>
                  <div style={{ color: "#666", fontSize: "12px", marginTop: "4px" }}>21 день</div>
                </div>
                <div>
                  <span style={{ background: "#F0F0F0", padding: "4px 8px", fontSize: "12px", fontWeight: "500" }}>• Возвращено</span>
                </div>
              </div>

              {/* Строка 2 */}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr", alignItems: "center", borderBottom: "1px solid #EAEAEA", paddingBottom: "16px" }}>
                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                  <div style={{ width: "40px", height: "56px", background: "#EEE", border: "1px solid #DDD" }}></div>
                  <div>
                    <div style={{ fontWeight: "500", marginBottom: "4px" }}>Творческий акт</div>
                    <div style={{ color: "#666", fontSize: "12px" }}>Рик Рубин</div>
                    <div style={{ color: "#999", fontSize: "12px", marginTop: "4px" }}>FOL-CA-001</div>
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: "500" }}>13 июля 2026 — 03 августа 2026</div>
                  <div style={{ color: "#666", fontSize: "12px", marginTop: "4px" }}>21 день</div>
                </div>
                <div>
                  <span style={{ background: "#F0F0F0", padding: "4px 8px", fontSize: "12px", fontWeight: "500" }}>• Возвращено</span>
                </div>
              </div>

              {/* Строка 3 */}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr", alignItems: "center", borderBottom: "1px solid #EAEAEA", paddingBottom: "16px" }}>
                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                  <div style={{ width: "40px", height: "56px", background: "#EEE", border: "1px solid #DDD" }}></div>
                  <div>
                    <div style={{ fontWeight: "500", marginBottom: "4px" }}>Хорошая стратегия / плохая стратегия</div>
                    <div style={{ color: "#666", fontSize: "12px" }}>Ричард Румельт</div>
                    <div style={{ color: "#999", fontSize: "12px", marginTop: "4px" }}>FOL-GS-002</div>
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: "500" }}>01 июня 2026 — 22 июня 2026</div>
                  <div style={{ color: "#666", fontSize: "12px", marginTop: "4px" }}>21 день</div>
                </div>
                <div>
                  <span style={{ background: "#F0F0F0", padding: "4px 8px", fontSize: "12px", fontWeight: "500" }}>• Возвращено</span>
                </div>
              </div>
            </div>
            
            <div style={{ fontSize: "12px", color: "#888", textTransform: "uppercase", marginTop: "24px", marginBottom: "64px" }}>
              Показано все 3 возврата
            </div>

          </div>
        </div>
      </main>

      {/* 3. ПОДВАЛ */}
      <footer style={{ borderTop: "1px solid #EAEAEA", padding: "32px 48px", display: "flex", gap: "32px", fontSize: "12px", color: "#666", background: "#fff" }}>
        <div>library@company.com</div>
        <a href="#" style={{ textDecoration: "none", color: "inherit" }}>Правила выдачи ↗</a>
        <a href="#" style={{ textDecoration: "none", color: "inherit" }}>Конфиденциальность</a>
      </footer>

    </div>
  );
}