
import { Astro } from 'astro';

export async function GET() {
  // NOTE: This sample workout is designed to match the data model precisely.
  // In a real application, this data would be fetched from a database
  // based on the user's selected training plan.
  const sampleWorkout = {
    workoutId: "training-session-01",
    name: "Día de Empuje - Sesión Actual",
    startedAt: new Date().toISOString(),
    exercises: [
      {
        exerciseId: "ex-01",
        name: "Press de Banca",
        sets: [
          { setId: 1, planned: { reps: 8, intensity: "RPE 7", weight: 80 }, performed: { reps: null, intensity: null, weight: null } },
          { setId: 2, planned: { reps: 8, intensity: "RPE 8", weight: 82.5 }, performed: { reps: null, intensity: null, weight: null } },
          { setId: 3, planned: { reps: 8, intensity: "RPE 9", weight: 85 }, performed: { reps: null, intensity: null, weight: null } }
        ]
      },
      {
        exerciseId: "ex-02",
        name: "Fondos en Paralelas",
        sets: [
          { setId: 1, planned: { reps: 12, intensity: "RIR 2", weight: 0 }, performed: { reps: null, intensity: null, weight: null } },
          { setId: 2, planned: { reps: 12, intensity: "RIR 1", weight: 0 }, performed: { reps: null, intensity: null, weight: null } },
          { setId: 3, planned: { reps: 12, intensity: "RIR 0", weight: 0 }, performed: { reps: null, intensity: null, weight: null } }
        ]
      },
      {
        exerciseId: "ex-03",
        name: "Flexiones con Inclinación",
        sets: [
          { setId: 1, planned: { reps: 15, intensity: "Al fallo", weight: 0 }, performed: { reps: null, intensity: null, weight: null } },
          { setId: 2, planned: { reps: 15, intensity: "Al fallo", weight: 0 }, performed: { reps: null, intensity: null, weight: null } }
        ]
      }
    ]
  };

  return new Response(JSON.stringify(sampleWorkout), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
