import { NextResponse} from "next/server";// Adjust the path as needed
import axios from "axios";


export async function POST(request) {
  // Replace 'accessToken' with your actual authorization token

  // Use backticks for string interpolation and provide the actual filename
  const url = `https://pge5xyvb32.execute-api.ap-southeast-1.amazonaws.com/dev/tss-resume/filename.pdf`;
  
  try {
    const response = await axios.put(url, {
      body: request.body,
      headers: {
        "Content-Type": 'multipart/form-data'
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
  }
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