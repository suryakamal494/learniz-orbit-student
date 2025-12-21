import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { title, className, chapterName, topicName, detailedRequirements } = await req.json();
    
    const SLIDESGPT_API_KEY = Deno.env.get('SLIDESGPT_API_KEY');
    if (!SLIDESGPT_API_KEY) {
      console.error('SLIDESGPT_API_KEY is not configured');
      throw new Error('SLIDESGPT_API_KEY is not configured');
    }

    // Construct the prompt for educational presentation
    const prompt = `Create a professional educational presentation for ${className}:

Title: ${title}
Chapter: ${chapterName}
Topic: ${topicName}

Requirements:
${detailedRequirements}

Make it engaging, visually appealing, and suitable for classroom teaching. Include clear explanations, examples, and key takeaways.`;

    console.log('Generating presentation with prompt:', prompt);

    const response = await fetch('https://api.slidesgpt.com/v1/presentations/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SLIDESGPT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('SlidesGPT API error:', response.status, errorText);
      throw new Error(`SlidesGPT API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('SlidesGPT response:', data);

    return new Response(JSON.stringify({
      success: true,
      id: data.id,
      embedUrl: data.embed,
      downloadUrl: data.download,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-slidesgpt function:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
