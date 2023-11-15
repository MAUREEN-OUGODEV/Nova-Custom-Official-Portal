import { BASE_URL } from "@/config";

export async function GET(request: Request, { params }: { params: { id: number } }) {
  const id = params.id;
  try {
    if (!BASE_URL) {
      return new Response("Base URL is not found", {
        status: 400,
        statusText: "Failed"
      });
    }

    const response = await fetch(`${BASE_URL}/api/drivers/${id}`,{ cache: 'no-store' });

    if (!response.ok) {
      // Handle non-2xx responses if needed
      return new Response("Failed to fetch data", {
        status: response.status,
        statusText: response.statusText
      });
    }

    const result = await response.json();
    console.log(result);

    return new Response(JSON.stringify(result), {
      status: 200,
      statusText: "Success"
    });
  } catch (error) {
    return new Response(error.message, {
      status: 500,
      statusText: 'Failed'
    });
  }
}
