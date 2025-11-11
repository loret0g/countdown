import { useState, useEffect } from "react";

const STORAGE_KEY = "countdownTimers";

function normalizeTimers(raw) {
  return raw.map((t) => ({
    id: t.id,
    name: t.name || "Sin nombre",
    target: t.target,
    category: t.category || "construccion",
  }));
}

function useTimers() {
  const [timers, setTimers] = useState([]);

  // Cargar al inicio
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setTimers(normalizeTimers(parsed));
      }
    } catch (error) {
      console.error("Error leyendo localStorage:", error);
    }
  }, []);

  // Guardar cada vez que cambien
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(timers));
    } catch (error) {
      console.error("Error guardando en localStorage:", error);
    }
  }, [timers]);

  const addTimer = (timer) => {
    setTimers((prev) => [timer, ...prev]);
  };

  const deleteTimer = (id) => {
    setTimers((prev) => prev.filter((t) => t.id !== id));
  };

  const clearTimers = () => {
    if (!timers.length) return;
    const confirmClear = window.confirm(
      "¿Seguro que quieres borrar todos los registros?"
    );
    if (!confirmClear) return;
    setTimers([]);
  };

  return { timers, addTimer, deleteTimer, clearTimers };
}

export default useTimers;