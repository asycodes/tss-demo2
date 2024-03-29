import { NextResponse} from "next/server";
import axios from "axios";


export async function POST(request) {
    const searchparams = new URL(request.url)
    const job = searchparams.searchParams.get('jobtitle')
    const url = process.env.FETCHIWA
  
  try {
    const json = JSON.stringify({
      filename:"Consolidated_plus_skills_comp.csv",
      sql_command:"select s.\"IWA Title\" from s3object s where s.\"Title\"=" + "'" + job +"'"
  }
  );

    const res = await axios(url, {
      method: "POST",
      data: json,
    });

    return NextResponse.json({ res:res.data.body }) 
  } catch (error) {
    console.log(error)
    return []
  }
}
