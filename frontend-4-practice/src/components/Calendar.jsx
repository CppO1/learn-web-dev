import { MONTHS_NOMINATIVE, buildCalendarGrid, compareDates } from "../utils/date";

export default function Calendar({
  year, month, selectedDay, today, onDayClick, onPrevMonth, onNextMonth
}) {
  const weeks = buildCalendarGrid(year, month);
  const flatDays = weeks.flat();
  
  
  const todayDate = new Date(today.year, today.month, today.day);

  return (
    <div className="calendar-card">
      <div className="calendar-header">
        <span className="calendar-month">{MONTHS_NOMINATIVE[month]} {year}</span>
        <div className="calendar-nav">
          <button className="nav-arrow" onClick={onPrevMonth}>‹</button>
          <button className="nav-arrow" onClick={onNextMonth}>›</button>
        </div>
      </div>

      <div className="calendar-weekdays">
        <span>Пн</span><span>Вт</span><span>Ср</span>
        <span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span>
      </div>

      <div className="calendar-grid">
        {flatDays.map((cell, index) => {
          const isOther = cell.otherMonth;
          const isSelected = !isOther && cell.day === selectedDay;
          
          const dateToCheck = new Date(year, month, cell.day);
          const canSelect = !isOther && compareDates(dateToCheck, todayDate) >= 0;

          let classes = "day";
          if (isSelected) classes += " selected";

          return (
            <button
              key={index}
              type="button"
              className={classes}
              disabled={!canSelect}
              onClick={() => onDayClick(cell.day)}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}