// Tell Astro to treat this as a server-rendered endpoint, not a static file.
export const prerender = false;

// We'''ll need Node'''s crypto module to generate unique IDs
import { randomUUID } from 'crypto';

export async function POST({ request }) {
  try {
    // 1. Get the raw workout data from the request body.
    const rawData = await request.json();

    // 2. Transform the raw data into the new datamodel structure.
    const newWorkout = {
      // Use crypto for robust unique IDs
      workoutId: `workout-${randomUUID()}`,
      name: rawData.name,
      // The 'createdAt' field could be useful. For a new template, we will add a 'createdAt' timestamp.
      createdAt: new Date().toISOString(), 
      exercises: rawData.exercises.map((rawExercise, exerciseIndex) => ({
        exerciseId: `ex-${exerciseIndex + 1}-${randomUUID()}`,
        name: rawExercise.name,
        sets: rawExercise.sets.map((rawSet, setIndex) => ({
          // The setId will now come from the frontend, so we just use it.
          setId: rawSet.id,
          // 3. Populate the 'planned' object from the form data.
          planned: {
            reps: parseInt(rawSet.repetitions, 10) || 0,
            intensity: rawSet.intensity || '',
            // Ensure weight is a number, default to 0 if not provided. Using 'weight' as requested.
            weight: parseFloat(rawSet.weight) || 0, 
          },
          // 4. Initialize the 'performed' object as null. This is key.
          performed: null,
        })),
      })),
      // Comments will be empty when creating a template.
      comments: null, 
    };

    // 5. Log the transformed data to the server'''s terminal for verification.
    console.log('--- [POST API Endpoint] Transformed Workout Data ---');
    console.log(JSON.stringify(newWorkout, null, 2));
    console.log('--------------------------------------------------');
    
    // In a future step, we would save this `newWorkout` to our `workouts.json` file.
    // For now, logging is sufficient to confirm the logic is correct.
    // await saveWorkoutToFile(newWorkout);

    // 6. Send a success response back to the client.
    return new Response(JSON.stringify({
      success: true,
      message: 'Workout template processed and transformed successfully.',
      data: newWorkout // It can be helpful to send the new object back
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error('Error in /api/save-workout.js:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Error processing request: ' + error.message 
    }), {
      status: 400, // Bad Request
      headers: { "Content-Type": "application/json" },
    });
  }
}
