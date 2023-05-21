import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate('author');
    
    if (!prompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    // return new Response('Failed to fetch specific prompt', { status: 500 });
    return new Response(err, { status: 500 });
  }
}

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();

    const originalPrompt = await Prompt.findById(params.id);
    if (!originalPrompt) return new Response("Prompt not found", { status: 404 });

    originalPrompt.prompt = prompt;
    originalPrompt.tag = tag;

    await originalPrompt.save();

    return new Response(JSON.stringify(originalPrompt), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to update prompt", { status: 500 });
  }
}

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndRemove(params.id);

    return new Response("Successfully deleted prompt", { status: 200 });
  } catch (err) {
    return new Response("Failed to delete prompt", { status: 500 })
  }
}