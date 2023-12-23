'use client'

import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";

interface MobileSidebarProps{
  apiLimitCount:number;
}


const MobileSidebar:React.FC<MobileSidebarProps> = ({
  apiLimitCount = 0
}) => {
  const [isMounted,setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  },[]);

  if(!isMounted){
    return;
  }

  return(
    <Sheet>
      <SheetTrigger>
        <Button variant={"ghost"} size={'icon'} className="md:hidden">
          <Menu/>
        </Button>        
      </SheetTrigger>
      <SheetContent side={'left'} className="p-0"  >
        <Sidebar apiLimitCount={apiLimitCount}/>
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar;