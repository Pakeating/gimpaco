export async function POST({ request }) {
  try {
    const data = await request.json();
    console.log('Received exercise data:', data);

    // This is a mock endpoint. We're just confirming receipt of data.
    return new Response(JSON.stringify({
      success: true,
      message: 'Exercise data received successfully.',
      data: data,
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error('Error in /api/save-exercise.js:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Error processing request: ' + error.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
