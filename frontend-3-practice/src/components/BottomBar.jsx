import { DAYS_OF_WEEK, MONTHS_GENITIVE } from "../utils/date";

export default function BottomBar({ selectedDay, selectedTime, currentMonth, currentYear }) {
  const isReady = selectedDay !== null && selectedTime !== null;

  const getText = () => {
    if (!selectedDay) return "Выберите желаемую дату и время";
    
    const dateObj = new Date(currentYear, currentMonth, selectedDay);
    const dayOfWeek = DAYS_OF_WEEK[dateObj.getDay()];
    const monthName = MONTHS_GENITIVE[currentMonth];
    
    let text = `${dayOfWeek}, ${selectedDay} ${monthName} ${currentYear}`;
    if (selectedTime) {
      text += `  ${selectedTime}`;
    }
    return text;
  };

  const handleConfirm = () => {
    if (isReady) {
      alert(`Вы записаны!\nВремя: ${selectedTime}`);
    }
  };

  return (
    <div className="confirm-row">
      <div className="confirm-info">
        <span className={`confirm-label ${isReady ? "has-value" : ""}`}>
          {getText()}
        </span>
      </div>
      <button 
        type="button" 
        className="confirm-btn" 
        disabled={!isReady}
        onClick={handleConfirm}
      >
        Далее
      </button>
    </div>
  );
}