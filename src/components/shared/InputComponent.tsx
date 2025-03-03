import { useState } from "react";


function useForm<T extends Record<string, unknown>>(initialState: T) {
    const [values, setValues] = useState<T>(initialState);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValues((values) => ({
			...values,
			[event.target.name]: event.target.value,
		}));
	};

    return {values,handleChange}
    
}

export default useForm

