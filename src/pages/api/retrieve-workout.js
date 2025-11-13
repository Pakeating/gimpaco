// Tell Astro to treat this as a server-rendered endpoint, not a static file.
export const prerender = false;

// NOTE: These sample workouts are now updated to match the new data model.
const sampleWorkouts = [
  {
    workoutId: "training-01",
    name: "Día de Empuje - Pecho y Tríceps",
    createdAt: "2023-10-01T10:00:00Z",
    comments: null,
    exercises: [
      { 
        exerciseId: "ex-01-01", 
        name: "Press de Banca", 
        sets: [
          { setId: 0, planned: { reps: 5, intensity: "RPE 7", weight: 80 }, performed: null },
          { setId: 1, planned: { reps: 5, intensity: "RPE 8", weight: 82.5 }, performed: null },
          { setId: 2, planned: { reps: 5, intensity: "RPE 9", weight: 85 }, performed: null }
        ]
      },
      { 
        exerciseId: "ex-01-02", 
        name: "Fondos en Paralelas", 
        sets: [
          { setId: 0, planned: { reps: 10, intensity: "RIR 2", weight: 0 }, performed: null },
          { setId: 1, planned: { reps: 10, intensity: "RIR 1", weight: 0 }, performed: null },
          { setId: 2, planned: { reps: 10, intensity: "RIR 0", weight: 0 }, performed: null }
        ]
      },
      { 
        exerciseId: "ex-01-03", 
        name: "Press Francés con Mancuernas", 
        sets: [
          { setId: 0, planned: { reps: 12, intensity: "70%", weight: 12 }, performed: null },
          { setId: 1, planned: { reps: 12, intensity: "70%", weight: 12 }, performed: null }
        ]
      },
    ],
  },
  {
    workoutId: "training-02",
    name: "Día de Tirón - Espalda y Bíceps",
    createdAt: "2023-10-02T10:00:00Z",
    comments: null,
    exercises: [
      { 
        exerciseId: "ex-02-01", 
        name: "Dominadas (con lastre)", 
        sets: [
          { setId: 0, planned: { reps: 8, intensity: "RIR 2", weight: 5 }, performed: null },
          { setId: 1, planned: { reps: 8, intensity: "RIR 1", weight: 5 }, performed: null }
        ]
      },
      { 
        exerciseId: "ex-02-02", 
        name: "Remo con Barra", 
        sets: [
          { setId: 0, planned: { reps: 10, intensity: "RPE 8", weight: 70 }, performed: null },
          { setId: 1, planned: { reps: 10, intensity: "RPE 8", weight: 70 }, performed: null },
          { setId: 2, planned: { reps: 10, intensity: "RPE 9", weight: 70 }, performed: null }
        ]
      },
    ],
  },
];

export async function GET({ request }) {
  try {
    const url = new URL(request.url);
    const workoutId = url.searchParams.get('id');

    if (workoutId) {
      // Find by 'workoutId' now, not 'id'
      const singleWorkout = sampleWorkouts.find(w => w.workoutId === workoutId);
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

/**
 * Maneja las peticiones POST para obtener el número de entrenamientos.
 * Por ahora, devuelve un número fijo.
 */
export async function POST({ request }) {
  const workoutCount = 3; // Número hardcodeado

  return new Response(JSON.stringify({ count: workoutCount }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
