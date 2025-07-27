import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();
    const NUTRITIONIX_APP_ID = process.env.NUTRITIONIX_APP_ID;
    const NUTRITIONIX_APP_KEY = process.env.NUTRITIONIX_APP_KEY;
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!NUTRITIONIX_APP_ID || !NUTRITIONIX_APP_KEY || !OPENAI_API_KEY) {
      return new NextResponse('Missing API keys. Please check your environment variables.', { status: 500 });
    }

    // Nutritionix APIコール
    const nutritionixRes = await fetch(`https://api.nutritionix.com/v1_1/search/${query}?appId=${NUTRITIONIX_APP_ID}&appKey=${NUTRITIONIX_APP_KEY}&fields=item_name,nf_calories,nf_vitamin_c`);
    if (!nutritionixRes.ok) {
      throw new Error(`Nutritionix API error: ${nutritionixRes.statusText}`);
    }
    const nutritionData = await nutritionixRes.json();
    const nutrients = nutritionData.hits?.[0]?.fields || {};

    // OpenAI APIコール
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: `クエリ: ${query}\nNutritionixデータ: カロリー ${nutrients.nf_calories}, ビタミンC ${nutrients.nf_vitamin_c}mg\nこれに基づき、安全で安いサプリを提案してください。` }]
      }),
    });
    if (!openaiRes.ok) {
      throw new Error(`OpenAI API error: ${openaiRes.statusText}`);
    }
    const aiData = await openaiRes.json();
    const recommendation = aiData.choices[0].message.content;

    console.log('Nutrition Data:', nutrients);
    console.log('AI Recommendation:', recommendation);

    return NextResponse.json({ nutrients, recommendation });

  } catch (error: any) {
    console.error('API call failed:', error);
    return new NextResponse(`API call failed: ${error.message}`, { status: 500 });
  }
}
