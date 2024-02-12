import axios from "axios"
import { NextResponse} from "next/server";// Adjust the path as needed

export async function POST(request){
    const url1 = "https://bcjz9dawg3.execute-api.ap-southeast-1.amazonaws.com/dev/post-json"
    const data1 = {
        "iwa": [
          "Implemented application’s UI using NextJS deployed on Vercel and backend using ExpressJS deployed using DigitalOcean’s Virtual Machine (Droplet).",
          "Design computer or information systems or applications.",
          "Read documents or materials to inform work processes.",
          "Administer diagnostic tests to assess patient health."
        ]
      }
      
    const url2 = "https://38d91xvz4d.execute-api.ap-southeast-1.amazonaws.com/dev/post-json"
    const data2 = {
      "filename":"Consolidated_plus_skills_comp.csv",
      "sql_command":"select s.\"IWA Title\",s.\"Skills Element Name\" from s3object s where s.\"Title\"='Chief Executives'"
  }
    const url3 = "https://rjiu5d34rj.execute-api.ap-southeast-1.amazonaws.com/test/post-json"
    const data3 = {
      "job_level": "entry/experience",
      "input_title": "",
      "onet_title": ["Software Developer"],
      "title_id": "test",
      "skill_list": [],
      "task_list": [
        {
          "IWA_Title": "Administer emergency medical treatment."
        },
        {
          "IWA_Title": "Prepare health or medical documents."
        }
      ]
      }

      const promises = [
        axios.post(url1, data1),
        axios.post(url2, data2),
        axios.post(url3, data3),
      ];
      try {
        // Wait for all promises to resolve
        const responses = await Promise.all(promises);
    
        // Check if all responses are successful
        responses.forEach((res, index) => {
          if (res.status == 200) {
            console.log(`Warm-up call ${index + 1} successful`);
          } else {

            console.log(`Warm-up call ${index + 1} failed with status ${res.status}`);
          }
        }
        )
        return NextResponse.json( 'Warm up success' );
      } catch (error) {
        console.error('Error during warm-up:', error);
        return NextResponse.error("Error failed warm up");
      }
    }