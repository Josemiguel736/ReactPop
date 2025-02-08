import Button from "../../components/shared/Button";


const EmptyList = () => (
  <div className="tweetsPage-empty">
    <p>Se el primero!</p>
    <Button $variant="primary">Publica un anuncio</Button>
  </div>
);

export default EmptyList