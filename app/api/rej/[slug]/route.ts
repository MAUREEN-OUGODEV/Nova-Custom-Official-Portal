import { BASE_URL } from "@/config";

export async function POST(request: Request, { params }: { params: { slug: number } }) {
    const slug = params.slug;

    try {
        if (!BASE_URL) {
            return new Response("Base URL not found", {
                status: 404,
                statusText: "Failed",
            });
        }

        
        const body = await request.json();
        console.log(body);
        

        const response = await fetch(`${BASE_URL}/api/driver/reject/${slug}/`, {
            cache: 'no-store',
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        console.log(response);
        

        if (response.ok) {
            const user = await response.json();
            console.log(user);
            
            return new Response(JSON.stringify(user), {
                status: 201,
                statusText: "Success",
            });
        } else {
            
            return new Response("Request failed", {
                status: response.status,
                statusText: "Failed",
            });
        }
    } catch (error) {
        return new Response(error.message, {
            status: 500,
            statusText: "Failed",
        });
    }
}
