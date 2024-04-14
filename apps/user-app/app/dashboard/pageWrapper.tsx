import React from "react";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";

export const Wrapper = ({title,children}:{title:string,children:React.ReactNode}) => {
    return (
      <>
        <div>
          <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
        </div>
        <ScrollArea className="h-[85vh] md:h-[78vh] pr-4 overscroll-none">
            {children}
        </ScrollArea>
      </>
    );
  };