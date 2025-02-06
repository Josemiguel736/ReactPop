import AuthButton from "../shared/AuthButton";

export default function Header(){
    return (
        <header className="bg-indigo-700 h-[40px] flex items-center px-4">
            <h3 className="text-amber-100 ">Header</h3>
            <AuthButton/>
        </header>
    )
}