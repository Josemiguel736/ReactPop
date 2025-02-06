import { ComponentProps } from "react";



const FormField = ({ ...props}:ComponentProps<"input">)=>{
    return (
        <div>
            <label>                
                <input {...props} />
            </label>
        </div>
    )
}

export default FormField