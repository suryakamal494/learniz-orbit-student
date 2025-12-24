import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SlideContent {
  title: string;
  content: string[];
  notes?: string;
}

interface PresentationData {
  title: string;
  slides: SlideContent[];
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { subjectName, chapterName, topicName, preferences, slideCount } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log(`Generating presentation for: ${subjectName} - ${chapterName} - ${topicName}`);

    const systemPrompt = `You are an expert educational content creator specializing in creating engaging and informative presentation slides for teachers. Your presentations are well-structured, visually appealing when described, and optimized for classroom teaching on digital boards.

Create presentations that:
- Have clear, concise bullet points (3-5 per slide)
- Use simple, understandable language appropriate for students
- Include key concepts, definitions, and examples
- Progress logically from introduction to conclusion
- Are engaging and suitable for classroom display

IMPORTANT: Return ONLY valid JSON, no markdown or other formatting.`;

    const userPrompt = `Create an educational presentation with the following details:

Subject: ${subjectName}
Chapter: ${chapterName}
Topic: ${topicName}
Number of Slides: ${slideCount}
${preferences ? `Additional Requirements: ${preferences}` : ""}

Generate a JSON response with this exact structure:
{
  "title": "Main presentation title",
  "slides": [
    {
      "title": "Slide title",
      "content": ["Bullet point 1", "Bullet point 2", "Bullet point 3"],
      "notes": "Optional speaker notes"
    }
  ],
  "theme": {
    "primaryColor": "#HEX",
    "secondaryColor": "#HEX",
    "fontFamily": "font name"
  }
}

Requirements:
1. First slide should be a title slide with the presentation title and subtitle
2. Include an "Introduction/Overview" slide
3. Main content slides with key concepts, definitions, examples
4. Include a "Summary/Key Takeaways" slide
5. Last slide should be "Questions & Discussion"
6. Each slide should have 3-5 concise bullet points
7. Content should be educational and appropriate for classroom teaching
8. Make the content engaging and easy to understand

Return ONLY the JSON object, no additional text.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add more credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content received from AI");
    }

    console.log("AI Response received, parsing...");

    // Parse the JSON response - handle potential markdown code blocks
    let presentationData: PresentationData;
    try {
      // Remove markdown code blocks if present
      let jsonStr = content.trim();
      if (jsonStr.startsWith("```json")) {
        jsonStr = jsonStr.slice(7);
      } else if (jsonStr.startsWith("```")) {
        jsonStr = jsonStr.slice(3);
      }
      if (jsonStr.endsWith("```")) {
        jsonStr = jsonStr.slice(0, -3);
      }
      jsonStr = jsonStr.trim();

      // Escape problematic backslash sequences that aren't valid JSON escapes
      // Valid JSON escapes: \", \\, \/, \b, \f, \n, \r, \t, \uXXXX
      // LaTeX symbols like \sin, \theta, \frac cause issues
      jsonStr = jsonStr.replace(/\\([^"\\\/bfnrtu])/g, '\\\\$1');

      presentationData = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("JSON Parse error:", parseError);
      console.error("Raw content:", content);
      throw new Error("Failed to parse AI response as JSON");
    }

    // Validate the structure
    if (!presentationData.title || !Array.isArray(presentationData.slides)) {
      throw new Error("Invalid presentation structure");
    }

    console.log(`Presentation generated with ${presentationData.slides.length} slides`);

    return new Response(
      JSON.stringify({ presentation: presentationData }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-ppt function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
