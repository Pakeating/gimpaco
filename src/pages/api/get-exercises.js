export async function GET() {
  try {
    console.log("Returning mocked exercises...");
    // This is a mock endpoint. We are returning a hardcoded list of exercises.
    const mockExercises = [
      { id: "ex001", name: "Press de Banca" },
      { id: "ex002", name: "Sentadilla" },
      { id: "ex003", name: "Peso Muerto" },
      { id: "ex004", name: "Dominadas" },
      { id: "ex005", name: "Press Militar" },
      { id: "ex006", name: "Remo con Barra" },
      { id: "ex007", name: "Curl de Bíceps" },
      { id: "ex008", name: "Extensiones de Tríceps" },
    ];

    return new Response(JSON.stringify(mockExercises), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error('Error in /api/get-exercises.js:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Error processing request: ' + error.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
