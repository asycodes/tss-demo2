import { NextResponse} from "next/server";// Adjust the path as needed
import axios from "axios";
import { headers } from "../../../../next.config";


export async function POST(request) {
  const searchparams = new URL(request.url)
  const getfilename = searchparams.searchParams.get('filename2')


  const url = 'https://pge5xyvb32.execute-api.ap-southeast-1.amazonaws.com/dev/tss-resume/' + getfilename + '.pdf'
  console.log(getfilename)
  console.log(url)
  try{
    const res = await fetch(url,{
      method: 'PUT',
      headers:{
        "Content-Type": "application/pdf",
        'x-api-key': "oUemqLJLfh2JIsTfamWcU88wYcnkAj6N73JDR9Jo"
      },
      body:request.body,
      duplex: "half"
    }  
    ).then((res) => {
      console.log(res.status)
      if (res.status===200) {
        console.log("IT WORKS")
        const data = true
        return NextResponse.json({ data });
      } else {
        console.error("Error uploading the PDF:", response.status, response.statusText);
        return NextResponse.error(`Error uploading the PDF: ${response.statusText}`, response.status);
      }
    });
  }catch(error){
    console.log(error)
    return []
  }


 /*  try {
    const response = await axios.put(url, {
      body: request.body,
      headers: {
        "x-api-key":"oUemqLJLfh2JIsTfamWcU88wYcnkAj6N73JDR9Jo"
      },
    });
    console.log(response.status)
    if (response.status===200) {
      console.log("IT WORKS")
      const data = true
      return NextResponse.json({ data });
    } else {
      console.error("Error uploading the PDF:", response.status, response.statusText);
      return NextResponse.error(`Error uploading the PDF: ${response.statusText}`, response.status);
    }
  } catch (error) {
    console.error("Error during the fetch:", error);
    return NextResponse.error("Internal Server Error", 500);
  } */
}

/*

export async function POST(request) {
  console.log(request.body)
  const data = fetch("https://pge5xyvb32.execute-api.ap-southeast-1.amazonaws.com/dev/tss-resume/${filename.pdf}",{
    method:"PUT",
    body:request.body,
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": `multipart/form-data; boundary=${data.getBoundary()}`
  },
  })
  console.log(data)

  return NextResponse.json({ data })
} */