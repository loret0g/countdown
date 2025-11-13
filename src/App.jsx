import "./index.css";
import CountdownForm from "./components/CountdownForm.jsx";
import TimerSection from "./components/TimerSection.jsx";
import useTimers from "./hooks/useTimers.js";

const CATEGORIES = [
  { key: "construccion", label: "Construcción" },
  { key: "investigacion", label: "Investigación" },
  { key: "entrenamiento", label: "Entrenamiento" },
];

function App() {
  const { timers, addTimer, deleteTimer, clearTimers } = useTimers();

  const now = new Date();

  const handleAddTimer = (timer /*, targetDate*/) => {
    // ya no usamos targetDate para mostrar el recuadro
    addTimer(timer);
  };

  const groupedTimers = CATEGORIES.map((cat) => ({
    ...cat,
    timers: timers
      .filter((t) => t.category === cat.key)
      .sort((a, b) => new Date(a.target) - new Date(b.target)),
  }));

  return (
    <div className="app">
      <div className="card">

        <CountdownForm onAddTimer={handleAddTimer} />

        <section className="sections-container">
          <div className="sections-header">
            <button
              type="button"
              className="clear-all-btn"
              onClick={clearTimers}
              disabled={timers.length === 0}
            >
              Borrar todo
            </button>
          </div>

          <div className="sections-grid">
            {groupedTimers.map((cat) => (
              <TimerSection
                key={cat.key}
                title={cat.label}
                timers={cat.timers}
                onDelete={deleteTimer}
                variant={cat.key}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;