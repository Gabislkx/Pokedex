import { useEffect, useState } from "react";

export default function PokemonCard({ pokemonUrl }) {
  const [detalhes, setDetalhes] = useState(null);

  useEffect(() => {
    async function buscarDetalhes() {
      const response = await fetch(pokemonUrl);
      const data = await response.json();
      setDetalhes(data);
    }
    buscarDetalhes();
  }, []);

  return (
    <div>
      {detalhes ? (
        <div>
          <img src={detalhes.sprites.other.home.front_default} alt="" />
          
          <p>{detalhes ? detalhes.name : "Carregando"}</p>
          <p>{detalhes ? detalhes.types[0].type.name : "Carregando"}</p>
        </div>
      ) : (
        "Carregando"
      )}
    </div>
  );
}
