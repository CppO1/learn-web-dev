import { isDateSelectable } from "../utils/date";

export default function TimeSlots({
  slots, selectedDay, selectedTime, currentMonth, currentYear, onTimeClick
}) {
  const isDaySelectable = selectedDay && isDateSelectable(selectedDay, currentMonth, currentYear);

  return (
    <div className="time-card">
      <span className="time-title">Доступное время</span>
      <div className="time-grid">
        {slots.map((slot) => {
          const isSelected = selectedTime === slot.time;
          const isDisabled = !slot.available || !isDaySelectable;
          const activeClass = isSelected ? "active" : "";

          return (
            <button
              key={slot.time}
              type="button"
              className={`time-slot ${activeClass}`}
              disabled={isDisabled}
              onClick={() => onTimeClick(slot.time)}
            >
              {slot.time}
              {!slot.available && <span></span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}