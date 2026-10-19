// JavaScript для страницы выбора даты и времени.
//
// ЗАДАНИЕ
// ========
// Оживить свою свёрстанную страницу. Скорее всего на ней будет работать:
//   1. При открытии страницы выбрать день по умолчанию.
//   2. По клику на день — день становится выбранным,
//      слоты обновляются.
//   3. По клику на слот — время становится выбранным,
//      попадает в нижнюю панель.
//   4. Стрелки «‹» и «›» листают месяцы.
//   5. Дни раньше «сегодня» нельзя выбрать.
//   6. Нижняя панель обновляется при выборе дня и времени.
//
// ГДЕ ЖИВУТ ДАННЫЕ
// ----------------
// Слотов пока нет с сервера. Захардкодьте массив в этом файле.
// Формат слота: { time: "10:00", available: true }.
// «Сегодня» можно взять из new Date() или захардкодить —
// как удобнее для проверки.
//
// СТРУКТУРА КОДА
// --------------
// Разделите код на смысловые части комментариями:
//   1. Данные (слоты, «сегодня»).
//   2. Состояние (месяц, день, время, слоты).
//   3. Чистые функции (для работы с датами).
//   4. Отрисовка и обработчики.
//   5. Инициализация.
//
// ЧИСТЫЕ ФУНКЦИИ
// --------------
// Если понадобится строить сетку календаря — вот функция,
// которую можно использовать. Она не зависит от DOM,
// просто принимает год и месяц и возвращает массив недель.
//
// function buildCalendarGrid(year, month) {
//   const firstDay = new Date(year, month, 1);
//   const lastDay = new Date(year, month + 1, 0);
//   const daysInMonth = lastDay.getDate();
//   const startDayOfWeek = firstDay.getDay();
//   const offset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
//   const prevMonthLastDay = new Date(year, month, 0).getDate();
//
//   const cells = [];
//
//   for (let i = offset - 1; i >= 0; i--) {
//     cells.push({ day: prevMonthLastDay - i, otherMonth: true });
//   }
//   for (let d = 1; d <= daysInMonth; d++) {
//     cells.push({ day: d, otherMonth: false });
//   }
//   const totalCells = Math.ceil(cells.length / 7) * 7;
//   let nextDay = 1;
//   while (cells.length < totalCells) {
//     cells.push({ day: nextDay, otherMonth: true });
//     nextDay++;
//   }
//
//   const weeks = [];
//   for (let i = 0; i < cells.length; i += 7) {
//     weeks.push(cells.slice(i, i + 7));
//   }
//   return weeks;
// }

// 1. ДАННЫЕ ------------------

const now = new Date();
const TODAY = new Date(now.getFullYear(), now.getMonth(), now.getDate());
// Доступные слоты времени
const SLOTS = [
    { time: "10:00", available: true},
    { time: "11:00", available: false},
    { time: "12:00", available: true},
    { time: "13:00", available: false},
    { time: "14:00", available: true},
    { time: "15:00", available: true},
    { time: "16:00", available: true},
    { time: "17:00", available: true},
]
// Массивы для красивого форматирования дат 
const MONTHS_NOMINATIVE = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", 
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];
const MONTHS_GENITIVE = [
  "января", "февраля", "марта", "апреля", "мая", "июня", 
  "июля", "августа", "сентября", "октября", "ноября", "декабря"
];
const DAYS_OF_WEEK = [
  "Воскресенье", "Понедельник", "Вторник", "Среда", 
  "Четверг", "Пятница", "Суббота"
];



// 2. СОСТОЯНИЕ --------------------

const state = {
    currentMonth: now.getMonth(),
    currentYear: now.getFullYear(),
    selectedDay:null,
    selectedTime: null,
};



// 3. ЧИСТЫЕ ФУНКЦИИ ------------------

// Построение сетки календаря
function buildCalendarGrid(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();
    const offset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    const cells = [];

    for (let i = offset - 1; i >= 0; i--) {
        cells.push({day: prevMonthLastDay - i, otherMonth: true});
    }
    for (let d = 1; d <= daysInMonth; d++) {
        cells.push({ day: d, otherMonth: false});
    }
    const totalCells = Math.ceil(cells.length / 7) * 7;
    let nextDay = 1;
    while (cells.length < totalCells) {
        cells.push({ day: nextDay, otherMonth: true});
        nextDay++;
    }

    const weeks = [];
    for (let i = 0; i < cells.length; i += 7) {
        weeks.push(cells.slice(i, i + 7));
    }
    return weeks;
}

// Сравнивает две даты 
function compareDates(date1, date2) {
  const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return d1.getTime() - d2.getTime();
}

// Проверяет, можно ли выбрать день 
function isDateSelectable(day, month, year) {
  const dateToCheck = new Date(year, month, day);
  return compareDates(dateToCheck, TODAY) >= 0;
}

// 4. ОТРИСОВКА И ОБРАБОТКА

// Сетка календаря
function renderCalendar(){
    const gridContainer = document.getElementById("calendarGrid");
    const monthTitle = document.getElementById("calendarMonthTitle");

    monthTitle.textContent = `${MONTHS_NOMINATIVE[state.currentMonth]} ${state.currentYear}`;

    const weeks = buildCalendarGrid(state.currentYear, state.currentMonth);
    let html = "";

    const flatDays = weeks.flat();

    flatDays.forEach((cell) => {
    const isOtherMonth = cell.otherMonth;
    const isSelected = !isOtherMonth && cell.day === state.selectedDay;
    const canSelect = !isOtherMonth && isDateSelectable(cell.day, state.currentMonth, state.currentYear);

    // Формировка классов
    let classes = "day";
    if (isOtherMonth) classes += " other-month";
    if (isSelected) classes += " selected";

    // Блокировка кнопки
    const disabledAttr = (!canSelect || isOtherMonth) ? "disabled" : "";

    html += `
      <button 
        type="button" 
        class="${classes}" 
        data-day="${cell.day}"
        data-other-month="${isOtherMonth}"
        ${disabledAttr}
      >
        ${cell.day}
      </button>
    `;
  });

  gridContainer.innerHTML = html;

  // После перерисовки вешаем обработчики заново
  const dayButtons = gridContainer.querySelectorAll(".day:not(:disabled)");
  dayButtons.forEach((btn) => {
    btn.addEventListener("click", onDayClick);
  }); 
}

// Обработка клика по дню
function onDayClick(event){
    const btn = event.currentTarget;
    const day = parseInt(btn.getAttribute("data-day"));
    const isOtherMonth = btn.getAttribute("data-other-month") === "true";

    if (isOtherMonth) return;

    state.selectedDay = day;
    state.selectedTime = null;

    renderCalendar();
    renderTimeSlots();
    updateBottomBar();
}

// Рисует доступное время
function renderTimeSlots() {
  const timeContainer = document.getElementById("timeGrid");
  let html = "";

  // Проверяем, выбрана ли валидная (доступная) дата
  const isDaySelectable = state.selectedDay && isDateSelectable(state.selectedDay, state.currentMonth, state.currentYear);

  SLOTS.forEach((slot) => {
    const isSelected = state.selectedTime === slot.time;
    
    // Слот заблокирован, если он занят ИЛИ день не выбран/в прошлом
    const isSlotDisabled = !slot.available || !isDaySelectable;
    
    const disabledAttr = isSlotDisabled ? "disabled" : "";
    const activeClass = isSelected ? "active" : "";

    html += `
      <button 
        type="button" 
        class="time-slot ${activeClass}" 
        data-time="${slot.time}"
        ${disabledAttr}
      >
        ${slot.time}
        ${!slot.available ? "<span>Занято</span>" : ""}
      </button>
    `;
  });

  timeContainer.innerHTML = html;

  // Вешаем обработчики на доступные слоты
  const slotButtons = timeContainer.querySelectorAll(".time-slot:not(:disabled)");
  slotButtons.forEach((btn) => {
    btn.addEventListener("click", onTimeSlotClick);
  });
}

// Обработчик клика по слоту времени
function onTimeSlotClick(event) {
  const btn = event.currentTarget;
  state.selectedTime = btn.getAttribute("data-time");

  renderTimeSlots(); 
  updateBottomBar(); 
}

// Обновляет текст в нижней панели
function updateBottomBar() {
  const confirmText = document.getElementById("confirmText");
  const confirmBtn = document.querySelector(".confirm-btn");
  
  // Если день не выбран, показываем заглушку и блокируем кнопку
  if (!state.selectedDay) {
    confirmText.textContent = "Выберите желаемую дату и время";
    confirmText.classList.remove("has-value");
    confirmBtn.disabled = true;
    return;
  }

  // Собираем дату
  const dateObj = new Date(state.currentYear, state.currentMonth, state.selectedDay);
  const dayOfWeek = DAYS_OF_WEEK[dateObj.getDay()];
  const monthName = MONTHS_GENITIVE[state.currentMonth];
  
  let text = `${dayOfWeek}, ${state.selectedDay} ${monthName} ${state.currentYear}`;

  if (state.selectedTime) {
    text += ` • ${state.selectedTime}`;
    confirmText.classList.add("has-value");
    confirmBtn.disabled = false; // Разблокируем кнопку, если есть время
  } else {
    confirmText.classList.remove("has-value");
    confirmBtn.disabled = true; // Блокируем кнопку, если время не выбрано
  }

  confirmText.textContent = text;
}

// Переключение месяцев 
function setupMonthNavigation() {
  const prevBtn = document.getElementById("prevMonth");
  const nextBtn = document.getElementById("nextMonth");

  prevBtn.addEventListener("click", () => {
    state.currentMonth--;
    if (state.currentMonth < 0) {
      state.currentMonth = 11;
      state.currentYear--;
    }
    
    // Проверяем, доступно ли 1-е число нового месяца
    const firstDayAvailable = isDateSelectable(1, state.currentMonth, state.currentYear);
    state.selectedDay = firstDayAvailable ? 1 : null; 
    state.selectedTime = null;
    
    renderCalendar();
    renderTimeSlots();
    updateBottomBar();
  });

  nextBtn.addEventListener("click", () => {
    state.currentMonth++;
    if (state.currentMonth > 11) {
      state.currentMonth = 0;
      state.currentYear++;
    }

    const firstDayAvailable = isDateSelectable(1, state.currentMonth, state.currentYear);
    state.selectedDay = firstDayAvailable ? 1 : null; 
    state.selectedTime = null;
    
    renderCalendar();
    renderTimeSlots();
    updateBottomBar();
  });
}



// 5. ИНИЦИАЛИЗАЦИЯ ---------------

function init() {
  // Первый рендер
  const todayMonth = now.getMonth();
  const todayYear = now.getFullYear();
  const todayDate = now.getDate();

  if (state.currentMonth === todayMonth && state.currentYear === todayYear) {
    state.selectedDay = todayDate; // ИСПРАВЛЕНО: selectDay -> selectedDay
  } else {
    const firstDayAvailable = isDateSelectable(1, state.currentMonth, state.currentYear);
    state.selectedDay = firstDayAvailable ? 1 : null;
  }

  renderCalendar();
  renderTimeSlots();
  updateBottomBar();

  // Навигация по месяцам
  setupMonthNavigation();

  // Обработчик кнопки "Далее"
  const confirmBtn = document.querySelector(".confirm-btn");
  confirmBtn.addEventListener("click", () => {
    if (!state.selectedDay || !state.selectedTime) return;
    
    alert(`Вы записаны!\nДата: ${state.selectedDay} ${MONTHS_GENITIVE[state.currentMonth]} ${state.currentYear}\nВремя: ${state.selectedTime}`);
  });
}

// Запуск после загрузки DOM
document.addEventListener("DOMContentLoaded", init);