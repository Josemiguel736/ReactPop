import Button from "../../components/shared/Button";

export default function Page501({error}:{error:Error}) {
  return (
    <div className="flex items-center justify-center text-center text-amber-50 bg-sky-500 h-screen">
      <div className="mt-20 bg-sky-700 p-11 ">
        <h1 className="text-3xl">
          Ups! Parece que hemos tenido un error!
        </h1>
        <h3 className="text-1xl ">{error.message}</h3>
        <h2 className="text-2xl mt-3.5">Intentamos volver al inicio?</h2>
        <div className="mt-2.5">
        <a  href="/">
        <Button $variant="primary">Si llevame al inicio</Button></a>
      </div></div>
    </div>
  );
}
