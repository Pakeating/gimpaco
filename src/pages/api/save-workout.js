export async function POST({ request }) {
  try {
    // 1. Parse the incoming workout data from the request body
    const workoutData = await request.json();

    // 2. Log the data to the server console for verification
    // In a real app, you would save this to a database.
    console.log("Received workout data to save:");
    console.log(JSON.stringify(workoutData, null, 2));

    // 3. Respond with a success message
    return new Response(JSON.stringify({ message: "Workout saved successfully!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error saving workout:", error);
    return new Response(JSON.stringify({ message: "Failed to save workout." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
