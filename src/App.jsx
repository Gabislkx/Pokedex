import { useEffect, useState } from "react";
import PokemonCard from "./CardPokemon";
import "./App.css";
import { TbPokeball } from "react-icons/tb";

export default function App() {
  const [pokemonsPorTipo, setPokemonsPorTipo] = useState({});

  useEffect(() => {
    async function buscarPokemons() {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=50"
      );
      const dados = await response.json();

      const pokemonsComTipo = await Promise.all(
        dados.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const detalhes = await res.json();
          return {
            ...pokemon,
            tipo: detalhes.types[0].type.name,
          };
        })
      );

      const agrupados = pokemonsComTipo.reduce((acc, pokemon) => {
        const tipo = pokemon.tipo;
        if (!acc[tipo]) {
          acc[tipo] = [];
        }
        acc[tipo].push(pokemon);
        return acc;
      }, {});

      setPokemonsPorTipo(agrupados);
    }
    buscarPokemons();
  }, []);

  return (
    <div className="app-container">
      <header>
        <h1>
          POKEDEX <TbPokeball />
        </h1>
        
      </header>

      {Object.entries(pokemonsPorTipo).map(([tipo, lista]) => (
        <section key={tipo} className="tipo-secao">
          <h2 className={`tipo-titulo tipo-${tipo}`}>{tipo.toUpperCase()}</h2>

          <div className="pokemon-grid">
            {lista.map((pokemon) => (
              <div key={pokemon.name} className={`card card-${tipo}`}>
                <PokemonCard pokemonUrl={pokemon.url} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}