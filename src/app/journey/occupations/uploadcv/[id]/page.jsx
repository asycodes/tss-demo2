import Header from "@/app/components/Header";
import Tasks from "./tasks"
import axios from "axios";
import { Suspense } from "react";
import LoadingPage from "./loading"

//server component
const url = "https://9hxkxfyhu4.execute-api.ap-southeast-1.amazonaws.com/dev/post-json";


const checkjob = async (id) =>{
  try {
    const json = JSON.stringify({
      action: "select",
      table: "resume_sent_job_done",
      task: "na",
      iwa: "na",
      filename: id + '.pdf',
      column: "job_done"
    });

    const res = await axios(url, {
      method: "POST",
      data: json,
    });
    const jsonData = await JSON.parse(res.data.body);
    return jsonData
  } catch (error) {
    console.error(error);
    return []
  }
}

const fetchData = async (id) =>{
  
  try {
    const json = JSON.stringify({
      action: "select",
      table: "tssresume",
      task: "na",
      iwa: "na",
      filename: id + '.pdf',
      column: "task"
    });

    const res = await axios(url, {
      method: "POST",
      data: json,
    });
    const jsonData = await JSON.parse(res.data.body);
    const check = await checkjob(id)
    if(check.length == 0){
      return fetchData(id)
    }
    else{
      console.log("checking:",check)
      return jsonData.flat()
    }
    
  } catch (error) {
    console.error(error);
    return fetchData(id)
  }
}

export default async function Page({params}) {
  const id = params.id
  const tasks = await fetchData(id)
  console.log(tasks)
  return (
    <div>
      <Header/>
      <Suspense fallback = {<LoadingPage/>}>
        <Tasks tasks = {tasks} fileid= {id}/>
      </Suspense>
    </div>
  );
}

