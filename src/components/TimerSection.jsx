function TimerSection({ title, timers, onDelete }) {
  return (
    <section className="timer-section">
      <h3 className="timer-section-title">{title}</h3>

      {timers.length === 0 ? (
        <p className="timer-section-empty">
          No hay registros en esta sección.
        </p>
      ) : (
        <ul className="timer-list">
          {timers.map((timer) => (
            <li key={timer.id} className="timer-item">
              <div className="timer-item-info">
                <strong>{timer.name}</strong>
                <span className="timer-item-date">
                  Termina:{" "}
                  {new Date(timer.target).toLocaleString("es-ES")}
                </span>
              </div>
              <button
                type="button"
                className="delete-btn"
                onClick={() => onDelete(timer.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default TimerSection;