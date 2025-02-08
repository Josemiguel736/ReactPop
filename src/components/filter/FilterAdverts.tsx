import { useEffect, useState } from "react";
import { AdvertType } from "../../pages/adverts/types";
import Button from "../shared/Button";
import FormField from "../shared/FormField";
import RangeSlider from "./filterComponents/RangeSlider";
import { getTags } from "../../pages/adverts/service";
import { useFilter } from "../../pages/adverts/context";
import { ApiClientError } from "../../api/error";
import { isApiClientError } from "../../api/client";
import Page501 from "../../pages/ErrorPages/501";
import ErrorSpan from "../errors/ErrorSpan";

interface Props {
  adverts: AdvertType[];
}

interface FilterSettings {
  name: string;
  priceMin: number;
  priceMax: number;
}

function filter(
  filterSettings: FilterSettings,
  tagsToFilter: string[],
  adverts: AdvertType[]
) {
  const includesName = (advert: AdvertType, name: string) =>
    advert.name.includes(name);

  const filterPrice = (
    advert: AdvertType,
    priceMin: number,
    priceMax: number
  ) => {
    if (priceMin > priceMax) return advert.price >= priceMin;

    return advert.price >= priceMin && advert.price <= priceMax;
  };

  const filterTags = (advert: AdvertType, tagsToFilter: string[]) => {
    const searchTags = advert.tags.filter((tag) => tagsToFilter.includes(tag));
    return searchTags.length === tagsToFilter.length;
  };

  let filteredAdverts = adverts;
  if (filterSettings.name) {
    filteredAdverts = filteredAdverts.filter((add) =>
      includesName(add, filterSettings.name)
    );
  }

  if (filterSettings.priceMax != 0 || filterSettings.priceMin != 0) {
    filteredAdverts = filteredAdverts.filter((add) =>
      filterPrice(add, filterSettings.priceMin, filterSettings.priceMax)
    );
  }

  if (tagsToFilter.length != 0) {
    filteredAdverts = filteredAdverts.filter((add) =>
      filterTags(add, tagsToFilter)
    );
  }

  return filteredAdverts;
}

export default function FilterAdverts({ adverts }: Props) {
  const [error, setError] = useState<ApiClientError | null>(null);

  const [filterContent, setFilter] = useState({
    name: "",
    priceMin: 0,
    priceMax: 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilter((filterContent) => ({
      ...filterContent,
      [name]:
        name === "priceMin" || name === "priceMax" ? Number(value) : value,
    }));
  };

  const priceMax =
    filterContent.priceMax < filterContent.priceMin
      ? filterContent.priceMin
      : filterContent.priceMax;

  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const searchTags = async () => {
      try {
        const tagsData = await getTags();
        setTags(tagsData);
      } catch (error) {
        if (isApiClientError(error)) {
          setError(error);
          console.warn("ERROR IN API CALL TO TAGS FROM FILTER", error);
        } else if (error instanceof Error) {
          console.warn("GENERIC ERROR IN ADVERTS", error);
          return <Page501 error={error} />;
        }
      }
    };
    searchTags();
  }, []);

  const [tagsToFilter, setCheckedTags] = useState<string[]>([]);

  const handleCheckboxChange = (tag: string) => {
    setCheckedTags((tagsToFilter) => {
      const isChecked = tagsToFilter.includes(tag);
      if (isChecked) {
        return tagsToFilter.filter((t) => t !== tag);
      } else {
        return [...tagsToFilter, tag];
      }
    });
  };
  const { setFilteredAdverts } = useFilter();

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const filteredAdds = filter(filterContent, tagsToFilter, adverts);
    setFilteredAdverts(filteredAdds);
  };

  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  useEffect(() => {
    if (adverts && adverts.length > 0) {
      const calculateMaxPrice = adverts.reduce((prev, curr) =>
        curr.price > prev.price ? curr : prev
      );
      setMaxPrice(calculateMaxPrice.price);
    }
  }, [adverts]);

  return error instanceof ApiClientError ? (
    <ErrorSpan children="No se ha podido cargar el filtro" />
  ) : (
    <form
      onSubmit={handleOnSubmit}
      className="text-white p-6 rounded-lg shadow-lg  flex flex-col  text-center bg-sky-800"
    >
      <h1 className="text-2xl mt-2.5 mb-1">Filtrar Productos</h1>

      <FormField
        type="text"
        name="name"
        value={filterContent.name}
        onChange={handleChange}
        className="mt-4 border-2 rounded-lg "
        placeholder="Texto"
      />

      <RangeSlider
        showValue={filterContent.priceMin}
        spanName="Precio Mínimo"
        name="priceMin"
        min={0}
        max={maxPrice ?? 1000}
        step={1}
        onChange={handleChange}
        value={filterContent.priceMin}
      />

      <RangeSlider
        showValue={priceMax}
        spanName="Precio Máximo"
        name="priceMax"
        min={0}
        max={maxPrice ?? 1000}
        step={1}
        onChange={handleChange}
        value={priceMax}
      />

      <h3 className="text-xl mb-4">Selecciona tus categorías:</h3>

      <div className="flex flex-col gap-2">
        {tags.map((tag) => (
          <label key={tag} className="flex items-center gap-2">
            <input
              type="checkbox"
              value={tag}
              checked={tagsToFilter.includes(tag)}
              onChange={() => handleCheckboxChange(tag)}
            />
            {tag}
          </label>
        ))}
      </div>
      <div className="mt-4 p-3 rounded-lg">
        <strong>Seleccionados:</strong>{" "}
        {tagsToFilter.length > 0 ? tagsToFilter.join(", ") : "Ninguno"}
      </div>

      <Button $variant="primary" type="submit" className="mt-4">
        Filtrar
      </Button>
    </form>
  );
}
