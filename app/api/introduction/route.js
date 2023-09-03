import Introduction from '@models/introduction';
import {connectToDB} from '@utils/database';
export const GET = async (request) => {
  try {
    await connectToDB();
    const introductions = await Introduction.find({}).sort({order: 1});

    return new Response(JSON.stringify(introductions), {status: 200});
  } catch (error) {
    return new Response('Failed to fetch all introductions', {status: 500});
  }
}
