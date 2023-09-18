import { NextResponse } from "next/server";
import OnetWebService from "../../journey/occupations/OnetWebService"; // Adjust the path as needed

export default async function handler(req, res) {
  const { keyword } = req.query;
  const username = "singapore_university";
  const onetWebService = new OnetWebService(username);
  const path = "online/search";

  try {
    const response = await onetWebService.call(path, { keyword });
    res.status(200).json(response);
  } catch (error) {
    console.error("Error making OnetWebService API call:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
