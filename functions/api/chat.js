export async function onRequest(context) {
    // Handle CORS preflight
    if (context.request.method === "OPTIONS") {
        return new Response(null, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        });
    }

    // Only allow POST
    if (context.request.method !== "POST") {
        return Response.json(
            { error: "Method not allowed" },
            { status: 405 }
        );
    }

    try {
        // 1. Get the customer's message from the request
        const { message } = await context.request.json();

        if (!message || typeof message !== "string" || message.trim().length === 0) {
            return Response.json(
                { error: "Message is required" },
                { status: 400 }
            );
        }

        // 2. Define the System Prompt
        // THIS IS THE MOST IMPORTANT PART.
        // This tells the AI who it is and how to behave.
        const systemPrompt = `
      You are the friendly customer service agent for [YOUR BUSINESS NAME].
      - Your tone is professional but warm.
      - You only answer questions about our products/services.
      - If you don't know the answer, ask them to email support@[yourbusiness].com.
      - Do not make up facts.
      - Key Business Info: We sell organic coffee beans. We ship within 24 hours. Refunds are available within 30 days.
    `;

        // 3. Send the conversation to Cloudflare Workers AI
        // We use Llama 3.1, which is very capable and fast.
        const response = await context.env.AI.run(
            "@cf/meta/llama-3.1-8b-instruct-fp8-fast",
            {
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: message },
                ],
            }
        );

        // 4. Return the AI's answer to the website
        return Response.json(
            { response: response.response },
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            }
        );
    } catch (err) {
        console.error("Chat API error:", err);
        return Response.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
