import { ComponentProps, ReactNode} from "react";

interface Props extends ComponentProps<"input"> {
    children:ReactNode

}


export default function ErrorSpan({children,...props}:Props){

    return <span className="text-red-500 bg-sky-950/50 pl-3.5 pr-3.5 " {...props}/>

}