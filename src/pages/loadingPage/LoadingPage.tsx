import ProgresIndicator from "../../assets/ProgressIndicator.tsx";

export default function LoadingPage(){

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
    <h1 className="text-3xl"> Cargando... </h1>
    <ProgresIndicator className="max-h-90" />
</div>
    )

}