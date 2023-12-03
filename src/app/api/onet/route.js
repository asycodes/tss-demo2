import { NextResponse} from "next/server";// Adjust the path as needed
import axios from "axios";

export async function GET(request) {
    const searchparams = new URL(request.url)
    const userInput = searchparams.searchParams.get('userInput')
    const username = "singapore_university";
    const password = "3594cgj";

      const authHeader =
        "Basic " + Buffer.from(`${username}:${password}`).toString("base64");
    const response = await axios.get(
      `https://thingproxy.freeboard.io/fetch/https://services.onetcenter.org/ws/online/search?keyword=${userInput}&start=1&end=10`,
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );
    const data = await response.data.occupation
    return NextResponse.json({ res:data }) }