import { useState } from "react";

const CATEGORIES = [
  { key: "construccion", label: "Construcción" },
  { key: "investigacion", label: "Investigación" },
  { key: "entrenamiento", label: "Entrenamiento" },
];

function CountdownForm({ onAddTimer }) {
  const [label, setLabel] = useState("");
  const [category, setCategory] = useState("construccion");
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const d = Number(days) || 0;
    const h = Number(hours) || 0;
    const m = Number(minutes) || 0;

    const totalMinutes = d * 24 * 60 + h * 60 + m;
    if (totalMinutes <= 0) {
      return;
    }

    const totalMs = totalMinutes * 60 * 1000;
    const targetDate = new Date(Date.now() + totalMs);

    const name =
      label.trim() ||
      `Cuenta sin nombre (${new Date().toLocaleString("es-ES")})`;

    const newTimer = {
      id: Date.now(),
      name,
      target: targetDate.toISOString(),
      category,
    };

    onAddTimer(newTimer, targetDate);

    // limpiamos tiempos; dejamos nombre y categoría
    setDays("");
    setHours("");
    setMinutes("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label>Nombre de la cuenta atrás</label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </div>

      <div className="form-field">
        <label>Tipo</label>
        <div className="category-buttons">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              type="button"
              className={`category-btn ${category === cat.key ? "active" : ""}`}
              onClick={() => setCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="form-grid">
        <div className="form-field">
          <label>Días</label>
          <input
            type="number"
            min="0"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="centered-input"
          />
        </div>
        <div className="form-field">
          <label>Horas</label>
          <input
            type="number"
            min="0"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="centered-input"
          />
        </div>
        <div className="form-field">
          <label>Minutos</label>
          <input
            type="number"
            min="0"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            className="centered-input"
          />
        </div>
      </div>

      <button type="submit" className="primary-btn">
        Calcular y guardar
      </button>
    </form>
  );
}

export default CountdownForm;
