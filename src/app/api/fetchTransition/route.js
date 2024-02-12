import { NextResponse} from "next/server";
import axios from "axios";


export async function POST(request) {

    const requestBody = await request.json()
    console.log(requestBody)
    const url = process.env.FETCHTRAN
  try {
    

    const res = await axios(url, {
      method: "POST",
      data: requestBody,
    });
    console.log(res)
    const data = res.data
    return NextResponse.json({ data }) 
  } catch (error) {
    console.log(error)
    return []
  }
}
