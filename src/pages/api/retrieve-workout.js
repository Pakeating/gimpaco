// Tell Astro to treat this as a server-rendered endpoint, not a static file.
export const prerender = false;

const sampleWorkouts = [
  {
    id: "training-01",
    name: "Día de Empuje - Pecho y Tríceps",
    exercises: [
      { id: "ex-01-01", name: "Press de Banca", sets: [{ id: "set-01-01-01", repetitions: 5, intensity: "RPE 7", weight_kg: 80 },{ id: "set-01-01-02", repetitions: 5, intensity: "RPE 8", weight_kg: 82.5 },{ id: "set-01-01-03", repetitions: 5, intensity: "RPE 9", weight_kg: 85 }]},
      { id: "ex-01-02", name: "Fondos en Paralelas", sets: [{ id: "set-01-02-01", repetitions: 10, intensity: "RIR 2", weight_kg: null },{ id: "set-01-02-02", repetitions: 10, intensity: "RIR 1", weight_kg: null },{ id: "set-01-02-03", repetitions: 10, intensity: "RIR 0", weight_kg: null }]},
      { id: "ex-01-03", name: "Press Francés con Mancuernas", sets: [{ id: "set-01-03-01", repetitions: 12, intensity: "70%", weight_kg: 12 },{ id: "set-01-03-02", repetitions: 12, intensity: "70%", weight_kg: 12 }]},
    ],
  },
  {
    id: "training-02",
    name: "Día de Tirón - Espalda y Bíceps",
    exercises: [
      { id: "ex-02-01", name: "Dominadas (con lastre)", sets: [{ id: "set-02-01-01", repetitions: 8, intensity: "RIR 2", weight_kg: 5 },{ id: "set-02-01-02", repetitions: 8, intensity: "RIR 1", weight_kg: 5 }]},
      { id: "ex-02-02", name: "Remo con Barra", sets: [{ id: "set-02-02-01", repetitions: 10, intensity: "RPE 8", weight_kg: 70 },{ id: "set-02-02-02", repetitions: 10, intensity: "RPE 8", weight_kg: 70 },{ id: "set-02-02-03", repetitions: 10, intensity: "RPE 9", weight_kg: 70 }]},
    ],
  },
  {
    id: "training-03",
    name: "Día de Pierna - Completo",
    exercises: [
      { id: "ex-03-01", name: "Sentadillas", sets: [{ id: "set-03-01-01", repetitions: 4, intensity: "85%", weight_kg: 100 },{ id: "set-03-01-02", repetitions: 4, intensity: "85%", weight_kg: 100 },{ id: "set-03-01-03", repetitions: 4, intensity: "85%", weight_kg: 100 }]},
      { id: "ex-03-02", name: "Peso Muerto Rumano", sets: [{ id: "set-03-02-01", repetitions: 12, intensity: "RPE 7", weight_kg: 80 },{ id: "set-03-02-02", repetitions: 12, intensity: "RPE 8", weight_kg: 80 }]},
    ],
  },
  {
    id: "training-04",
    name: "Hombros y Brazos",
    exercises: [
      { id: "ex-04-01", name: "Press Militar", sets: [{ id: "set-04-01-01", repetitions: 8, intensity: "RPE 8", weight_kg: 40 },{ id: "set-04-01-02", repetitions: 8, intensity: "RPE 8", weight_kg: 40 },{ id: "set-04-01-03", repetitions: 8, intensity: "RPE 9", weight_kg: 40 }]},
      { id: "ex-04-02", name: "Elevaciones Laterales", sets: [{ id: "set-04-02-01", repetitions: 15, intensity: "RIR 1", weight_kg: 8 },{ id: "set-04-02-02", repetitions: 15, intensity: "RIR 0", weight_kg: 8 }]},
      { id: "ex-04-03", name: "Curl de Bíceps Martillo", sets: [{ id: "set-04-03-01", repetitions: 12, intensity: "RPE 9", weight_kg: 14 },{ id: "set-04-03-02", repetitions: 12, intensity: "RPE 9", weight_kg: 14 }]},
    ],
  },
  {
    id: "training-05",
    name: "Full Body Hipertrofia",
    exercises: [
      { id: "ex-05-01", name: "Sentadilla Goblet", sets: [{ id: "set-05-01-01", repetitions: 12, intensity: "75%", weight_kg: 24 },{ id: "set-05-01-02", repetitions: 12, intensity: "75%", weight_kg: 24 }]},
      { id: "ex-05-02", name: "Press de Banca con Mancuernas", sets: [{ id: "set-05-02-01", repetitions: 12, intensity: "RIR 2", weight_kg: 20 },{ id: "set-05-02-02", repetitions: 12, intensity: "RIR 1", weight_kg: 20 }]},
      { id: "ex-05-03", name: "Remo en Polea Baja", sets: [{ id: "set-05-03-01", repetitions: 15, intensity: "RPE 8", weight_kg: 50 },{ id: "set-05-03-02", repetitions: 15, intensity: "RPE 9", weight_kg: 50 }]},
    ],
  },
];

export async function GET({ request }) {
  try {
    const url = new URL(request.url);
    const workoutId = url.searchParams.get('id');

    // If a specific workout ID is requested, find and return that workout.
    if (workoutId) {
      const singleWorkout = sampleWorkouts.find(w => w.id === workoutId);
      if (singleWorkout) {
        return new Response(JSON.stringify(singleWorkout), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        return new Response(JSON.stringify({ message: `Workout with id ${workoutId} not found.` }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    // Otherwise, return the full list of workouts.
    return new Response(JSON.stringify(sampleWorkouts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error('Error in /api/retrieve-workout.js:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Error retrieving workouts: ' + error.message 
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
