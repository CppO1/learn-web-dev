export default function TimeSlots({
  slots, loading, error, selectedDay, selectedTime, onTimeClick
}) {
  // Состояние загрузки
  if (loading) {
    return (
      <div className="time-card">
        <span className="time-title">Доступное время</span>
        <p style={{ marginTop: '20px', color: '#7f7f7f' }}>Загрузка слотов...</p>
      </div>
    );
  }

  // Состояние ошибки
  if (error) {
    return (
      <div className="time-card">
        <span className="time-title">Доступное время</span>
        <p style={{ marginTop: '20px', color: 'red' }}>Ошибка: {error}</p>
      </div>
    );
  }

  // Если день не выбран или слотов нет
  if (!selectedDay || slots.length === 0) {
    return (
      <div className="time-card">
        <span className="time-title">Доступное время</span>
        <p style={{ marginTop: '20px', color: '#7f7f7f' }}>Нет доступного времени</p>
      </div>
    );
  }

  // Рендер слотов
  return (
    <div className="time-card">
      <span className="time-title">Доступное время</span>
      <div className="time-grid">
        {slots.map((slot) => {
          const isSelected = selectedTime === slot.time;
          const isDisabled = !slot.available;
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
              {!slot.available && <span>Занято</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}