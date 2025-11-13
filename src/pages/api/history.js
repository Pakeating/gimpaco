// src/pages/api/history.js

// Simulación de una base de datos o fuente de datos.
const workoutHistory = [
  {
    id: 'workout-1',
    date: '2024-07-28',
    name: 'Lunes - Pecho y Tríceps',
    exercises: [
      { name: 'Press de Banca', sets: 4, reps: 8, weight: 80 },
      { name: 'Aperturas con Mancuernas', sets: 3, reps: 12, weight: 20 },
      { name: 'Fondos en Paralelas', sets: 3, reps: 10, weight: 0 },
    ]
  },
  {
    id: 'workout-2',
    date: '2024-07-26',
    name: 'Viernes - Pierna',
    exercises: [
      { name: 'Sentadillas', sets: 5, reps: 5, weight: 120 },
      { name: 'Prensa de Piernas', sets: 4, reps: 10, weight: 180 },
      { name: 'Extensiones de Cuádriceps', sets: 3, reps: 15, weight: 60 },
    ]
  },
  {
    id: 'workout-3',
    date: '2024-07-24',
    name: 'Miércoles - Espalda y Bíceps',
    exercises: [
      { name: 'Dominadas', sets: 4, reps: 8, weight: 0 },
      { name: 'Remo con Barra', sets: 4, reps: 8, weight: 70 },
      { name: 'Curl de Bíceps', sets: 3, reps: 12, weight: 15 },
    ]
  }
];

/**
 * @param {object} _ 
 * @returns {Response} 
 */
export async function GET(_) {
  // En una aplicación real, aquí se haría una llamada a una base de datos.
  // Por ahora, simplemente devolvemos los datos de ejemplo con un pequeño retardo.
  await new Promise(resolve => setTimeout(resolve, 500)); // Simular latencia de red

  return new Response(
    JSON.stringify(workoutHistory), 
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}
