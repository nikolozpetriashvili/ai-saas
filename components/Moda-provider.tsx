'use client'

import { useEffect, useState } from "react"
import ProModal from "./Pro-modal";

export const ModalProvider =() =>  {
  const [isMounted,setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true)
  },[])

  if(!isMounted){
    return;
  }


  return(
    <>
      <ProModal/>
    </>
  )

}