import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "../../components/shared/FormField";
import Button from "../../components/shared/Button";
import { createAdvert, getTags } from "./service";

function NewAdvertPage() {
  const navigate = useNavigate();

  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const searchTags = async () => {
      try {
        const tagsData = await getTags();
        setTags(tagsData);
      } catch (error) {
        console.log(error);
      }
    }
    searchTags();
  }, []);

  const [name, setName] = useState("");
  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const [price, setPrice] = useState("");
  const handlePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const [trading, setTrading] = useState("venta");

  const [checkedTags, setCheckedTags] = useState<string[]>([]);

  const handleCheckboxChange = (tag: string) => {
    setCheckedTags((prevChecked) => {
      const isChecked = prevChecked.includes(tag);
      if (isChecked) {
        return prevChecked.filter((t) => t !== tag); // Desmarcar
      } else {
        return [...prevChecked, tag]; // Marcar
      }
    });
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] || null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const onSale = trading === "venta" ? "true" : "false";
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("sale", onSale);
      checkedTags.forEach((tag) => formData.append("tags", tag));
      if (selectedFile) {
        formData.append("photo", selectedFile);
      }

      const response = await createAdvert(formData);
      navigate(`adverts/${response.id}`)
    } catch (error) {
      console.log(error);
      /* TODOOOOOOOOO*/
    }
  };

  return (
    <div className="h-1/3 mt-10 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="text-white p-6 rounded-lg shadow-lg w-1/2 bg-sky-700 flex flex-col justify-center items-center text-center"
      >
        <h1 className="text-2xl mt-2.5 mb-1">Crear anuncio</h1>

        <FormField
          type="text"
          name="name"
          value={name}
          onChange={handleName}
          className="mt-4 border-2 rounded-lg "
          placeholder="Producto"
        />

        <FormField
          type="number"
          name="price"
          value={price}
          onChange={handlePrice}
          placeholder="Precio"
          className="mt-4 border-2 rounded-lg "
        />
        <select
          value={trading}
          onChange={(select) => setTrading(select.target.value)}
        >
          <option value="compra">Compra</option>
          <option value="venta">Venta</option>
        </select>

        <h3 className="text-xl mb-4">Selecciona tus categorías:</h3>

        <div className="flex flex-col gap-2">
          {tags.map((tag) => (
            <label key={tag} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={tag}
                checked={checkedTags.includes(tag)}
                onChange={() => handleCheckboxChange(tag)}
              />
              {tag}
            </label>
          ))}
        </div>
        <div className="mt-4 p-3 rounded-lg">
          <strong>Seleccionados:</strong>{" "}
          {checkedTags.length > 0 ? checkedTags.join(", ") : "Ninguno"}
        </div>

        <input type="file" onChange={handleFileChange} />
        <Button $variant="primary" type="submit" className="mt-4">
          Publicar
        </Button>
      </form>
    </div>
  );
}

export default NewAdvertPage;
