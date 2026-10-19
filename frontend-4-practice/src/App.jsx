// App — корневой компонент приложения.
//
// ЗАДАНИЕ
// --------
// Перенесите свою страницу выбора даты и времени из нативного JS
// на React. У вас уже есть:
//   - готовая вёрстка (HTML);
//   - готовые стили (CSS);
//   - рабочий код на нативном JS (валидация дат, рендер календаря,
//     обработчики кликов, выбор слота).
//
// Теперь нужно то же самое сделать в React.
//
// ЧТО НУЖНО СДЕЛАТЬ
// ------------------
// 1. Разбить страницу на компоненты. Как именно — решайте сами.
//    Обычно выделяют: шапку, подвал, календарь, сетку слотов,
//    нижнюю панель.
//
// 2. Перенести вёрстку из HTML в JSX. Стили оставить как есть,
//    просто положить их в тот же проект (например, в src/styles/
//    или рядом с компонентами).
//
// 3. Заменить нативное состояние (переменные + прямые манипуляции
//    с DOM) на useState. Какие именно данные должны жить в состоянии —
//    подумайте сами. Скорее всего: текущий месяц, выбранный день,
//    выбранное время, массив слотов.
//
// 4. Рендер календаря и слотов делать через JSX и .map(),
//    без innerHTML и querySelector.
//
// 5. Обработчики кликов — через onClick прямо в JSX,
//    без addEventListener.
//
// 6. Функции для работы с датами, которые вы уже написали
//    на нативном JS (построение сетки календаря, сравнение дат,
//    проверка «не раньше сегодня»), можно переиспользовать.
//    Они чистые — не зависят от React. Создайте файл
//    src/utils/date.js и перенесите их туда.
//
//
// ПОДСКАЗКА
// ---------
// Если что-то не работает или непонятно, как перевести нативный
// код на React — вернитесь к лекции. Там разбирались все
// основные приёмы: состояние, пропсы, рендер списков, колбэки.
//
// Ниже — пустой каркас. Здесь можно начать писать.

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Calendar from "./components/Calendar";
import TimeSlots from "./components/TimeSlots";
import BottomBar from "./components/BottomBar";
import { fetchToday, fetchSlots } from "./api";
import { compareDates } from "./utils/date"; 

function App() {
  // Данные с сервера
  const [today, setToday] = useState(null); 
  const [slots, setSlots] = useState([]);   

  // Состояния календаря 
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Флаги загрузки и ошибок
  const [loadingToday, setLoadingToday] = useState(true);
  const [errorToday, setErrorToday] = useState(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [errorSlots, setErrorSlots] = useState(null);

  // 1. Загрузка сегодняшнег дня при открытии страницы
  useEffect(() => {
    fetchToday()
      .then((data) => {
        setToday(data);
        // Устанавливает календарь на сегодняшний месяц
        setCurrentMonth(data.month);
        setCurrentYear(data.year);
        setSelectedDay(data.day);
        setErrorToday(null);
      })
      .catch((err) => {
        setErrorToday(err.message);
      })
      .finally(() => {
        setLoadingToday(false);
      });
  }, []);

  // 2. Загрузка слотов при изменении выбранного дня
  useEffect(() => {
    // Если день не выбран или сегодня еще не пришло - ждем
    if (selectedDay === null || today === null) return;

    let isCancelled = false; // Защита от гонок

    setLoadingSlots(true);
    setErrorSlots(null);
    setSelectedTime(null); // Сбрасывает время при смене дня

    const dateToFetch = { day: selectedDay, month: currentMonth, year: currentYear };

    fetchSlots(dateToFetch)
      .then((data) => {
        if (isCancelled) return;
        // Проверяем, что ответ относится к нужному дню
        if (data.date.day !== selectedDay || data.date.month !== currentMonth) return;
        
        setSlots(data.slots);
      })
      .catch((err) => {
        if (!isCancelled) setErrorSlots(err.message);
      })
      .finally(() => {
        if (!isCancelled) setLoadingSlots(false);
      });

    // Функция очистки при выборе другого дня
    return () => {
      isCancelled = true;
    };
  }, [selectedDay, currentMonth, currentYear, today]);

  // 3. ЕДИНАЯ ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ МЕСЯЦЕВ 
  const changeMonth = (delta) => {
    let newMonth = currentMonth + delta;
    let newYear = currentYear;
    
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    // Находим первый доступный день в новом месяце 
    const todayDate = new Date(today.year, today.month, today.day);
    const daysInNewMonth = new Date(newYear, newMonth + 1, 0).getDate();
    
    let firstAvailableDay = null;
    for (let d = 1; d <= daysInNewMonth; d++) {
      const dateToCheck = new Date(newYear, newMonth, d);
      // Если день не в прошлом, он доступен
      if (compareDates(dateToCheck, todayDate) >= 0) {
        firstAvailableDay = d;
        break;
      }
    }

    // Применяем новые значения
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    
    // Сбрасываем день 
    setSelectedDay(firstAvailableDay);
    
    // Сбрасываем время и слоты
    setSelectedTime(null);
    setSlots([]);
  };

  // Обработчики  вызывают changeMonth
  const handlePrevMonth = () => changeMonth(-1);
  const handleNextMonth = () => changeMonth(1);

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  // Заглушка при прогрузке сегодня
  if (loadingToday) {
    return (
      <div className="page" style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Загрузка...</h2>
      </div>
    );
  }

  // Если произошла ошибка при загрузке сегодня
  if (errorToday) {
    return (
      <div className="page" style={{ padding: '40px', textAlign: 'center', color: 'red' }}>
        <h2>Ошибка: {errorToday}</h2>
        <button onClick={() => window.location.reload()} style={{ marginTop: '20px', padding: '10px 20px' }}>
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className="page">
      <Header />
      <main className="main-booking-flow">
        <h1 className="booking-title">Выберите желаемое время</h1>
        
        <div className="booking-cards">
          <Calendar
            year={currentYear}
            month={currentMonth}
            selectedDay={selectedDay}
            today={today}
            onDayClick={handleDayClick}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
          />
          
          <TimeSlots
            slots={slots}
            loading={loadingSlots}
            error={errorSlots}
            selectedDay={selectedDay}
            selectedTime={selectedTime}
            onTimeClick={handleTimeClick}
          />
        </div>

        <BottomBar
          selectedDay={selectedDay}
          selectedTime={selectedTime}
          currentMonth={currentMonth}
          currentYear={currentYear}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;