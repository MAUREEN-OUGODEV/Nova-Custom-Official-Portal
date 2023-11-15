import { BASE_URL } from "@/config";

export async function POST(request: Request, { params }: { params: { id: number } }) {
    const id = params.id;

    try {
        if (!BASE_URL) {
            return new Response("Base URL not found", {
                status: 404,
                statusText: "Failed",
            });
        }

        const body = new FormData();
        body.append("is_verified", "True");
    
        const response = await fetch(`${BASE_URL}/api/documents/verify/${id}/`, {
            cache: 'no-store' ,
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data', 
            },
            body: body,
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
            // Handle HTTP errors here
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
