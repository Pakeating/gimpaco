// Tell Astro to treat this as a server-rendered endpoint, not a static file.
export const prerender = false;

export async function POST({ request }) {
  // The request method is guaranteed to be POST by Astro's file-based routing.
  try {
    // Get the workout data from the request body.
    const workoutData = await request.json();

    // Log the received data to the server's terminal.
    console.log('--- [POST API Endpoint] Workout Data Received ---');
    console.log(JSON.stringify(workoutData, null, 2));
    console.log('-----------------------------------------------');

    // Send a success response back to the client.
    return new Response(JSON.stringify({
      success: true,
      message: 'Workout data processed successfully.',
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    // This will catch errors like malformed JSON from the client.
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
