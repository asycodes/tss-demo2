import { NextResponse} from "next/server";// Adjust the path as needed
import axios from "axios";

export async function PUT(request) {
  console.log(request.body)
  fetch("https://pge5xyvb32.execute-api.ap-southeast-1.amazonaws.com/dev/tss-resume/{filename.pdf}",{
    method:"PUT",
    body:request.body
  })


}