import Header from "@/app/components/Header";
import Tasks from "./tasks"
import axios from "axios";


//server component

const fetchData = async () =>{
  const url = "https://9hxkxfyhu4.execute-api.ap-southeast-1.amazonaws.com/dev/post-json";
  try {
    const json = JSON.stringify({
      action: "select",
      table: "tss_task_iwa_mapping",
      task: "na",
      iwa: "na",
      filename: "9.pdf",
      column: "task"
    });

    const res = await axios(url, {
      method: "POST",
      data: json,
    });
    console.log(res.data.body)
    const jsonData = await JSON.parse(res.data.body);
    return jsonData.flat()
  } catch (error) {
    console.error(error);
  }
}

export default async function Page() {
  const tasks = await fetchData()
  console.log(tasks)
  return (
    <div>
      <Header/>
      <Tasks tasks = {tasks}/>
    </div>
  );
}

