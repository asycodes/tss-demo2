import { NextResponse} from "next/server";
import axios from "axios";


export async function POST(request) {

    const requestBody = await request.json()
    console.log(requestBody)
    const url = "https://rjiu5d34rj.execute-api.ap-southeast-1.amazonaws.com/test/post-json";
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
