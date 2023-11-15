import {BASE_URL} from "@/config";

export async function GET(_request:Request,{params}:{params:{slug:number}}){
    const slug=params.slug
    try{
        if(!BASE_URL){
            return new Response("Base url is not found",{
                status:400,
                statusText:"failed"
            })
        }

        const response=await fetch(`${BASE_URL}/api/drivers/${slug}`,{ cache: 'no-store' })
        const result=await response .json();
        console.log()

        return new Response (JSON.stringify(result),{
            status:200,
            statusText:"success"
        })

    }
    catch(error:any){
        return new Response(error.message,{
            status:500,
            statusText:'failed'
        })

    }
}
