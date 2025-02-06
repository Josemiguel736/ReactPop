import { ComponentProps } from "react";


interface Props extends ComponentProps<"input">{
    label:String
}

const FormField = ({label, ...props}:Props)=>{
    return (
        <div>
            <label>
                <span>{label}</span>
                <input {...props} />
            </label>
        </div>
    )
}

export default FormField