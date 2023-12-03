'use client'

import { openDB,getLatestData } from "@/app/utils/indexdb";
import Getindex from "./iwas"
import { useState, useEffect, useRef, Suspense } from "react";

function Page() {
  const [filename,setFilename] = useState()
  const [occupations, setOccupations] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getLatestData();
      const data = response
      setFilename(data.id)
      setOccupations(JSON.parse(data.data))
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if(occupations.length != 0){
    console.log(occupations)
    return (
      <div>
        <Suspense>
          <Getindex jobarray = {occupations}/>
        </Suspense>
        
      </div>
      
    )

  }
  
  
}

export default Page
