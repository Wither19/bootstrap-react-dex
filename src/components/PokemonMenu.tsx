import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";

import Stat from "./Stat";
import PokedexEntry from "./PokedexEntry";

import { PokemonContext } from "../contexts/PokemonContext";

import type {
	PokemonGeneral,
	PokemonSpecies,
	Stats,
	DexEntry,
} from "../types/types";

function PokemonMenu() {
	const pokemon = useContext(PokemonContext);

	const [pkmnGeneral, setGeneralData] = useState<PokemonGeneral | null>(null);
	const [genus, setGenus] = useState<string>("");
	const [dexEntries, setDexEntries] = useState<DexEntry[]>([]);

	const [isShiny, setShinyState] = useState<boolean>(false);
	const artworkType = isShiny ? "shiny/" : "";

	const [selectedEntry, setSelectedEntry] = useState<number>(0);

	function fancifyGameName(name: string) {
		const names = {
			firered: "Fire Red",
			leafgreen: "Leaf Green",
			heartgold: "Heart Gold",
			soulsilver: "Soul Silver",
			x: "X",
			y: "Y",
			"omega-ruby": "Omega Ruby",
			"alpha-sapphire": "Alpha Sapphire",
		};
		if (names[name]) {
			return names[name];
		} else {
			return name.charAt(0).toUpperCase() + name.slice(1).replace("-", " ");
		}
	}

	useEffect(() => {
		axios
			.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
			.then((response) => {
				setGeneralData({
					id: response.data.id,
					name: response.data.name,
					stats: response.data.stats,
				});
			})
			.catch(() => {});

		axios
			.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`)
			.then((response) => {
				setGenus(response.data.genus);
				setDexEntries(response.data.flavor_text_entries);
				setDexEntries((prev) =>
					_.values(_.pickBy(prev, (item) => item.language.name == "en"))
				);
			})
			.catch(() => {});
	}, [pokemon]);

	return (
		<>
			<PokemonContext.Provider value={pokemon}>
				{/* 
	    • Core information
        ◦ Name
        ◦ Genus
        ◦ Types
				{pkmnGeneral !== null && (
    • All available Dex entries for the Pokémon
    • In the interest of condensing the menu, only feature Pokémon HOME artwork
    • Click Sprite to toggle shiny
    • Make Pokémon name header turn gold with shiny toggle (Framer Motion animated shiny icon)
		 */}
				{pkmnGeneral && (
					<>
						<div>
							<div
								className={`display-5 pkmn-name-header ${
									isShiny ? "shiny" : "regular"
								}`}>
								#{pkmnGeneral.id?.toString().padStart(4, "0")}
								{" - "}
								{pkmnGeneral.name?.replace("-", " ")}
							</div>
							<div
								onClick={() => setShinyState((prev) => !prev)}
								style={{ textAlign: "center" }}>
								<img
									src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${artworkType}${pkmnGeneral?.id}.png`}
									className={`artwork ${isShiny ? "shiny" : "regular"}`}
								/>
							</div>
							<div className="d-flex flex-evenly">
								<div className="stats">
									{pkmnGeneral.stats ? (
										pkmnGeneral!.stats.map((item: Stats) => (
											<Stat name={item.stat.name} value={item.base_stat} />
										))
									) : (
										<>
											<Stat name="HP" value={0} />
											<Stat name="Attack" value={0} />
											<Stat name="Defense" value={0} />
											<Stat name="Special Attack" value={0} />
											<Stat name="Special Defense" value={0} />
											<Stat name="Speed" value={0} />
										</>
									)}
								</div>
								<div className="dex-entries">
									<PokedexEntry game={dexEntries![selectedEntry]!.version.name}>
										{dexEntries![selectedEntry]!.flavor_text.replace("\f", " ")}
									</PokedexEntry>
									<div className="entry-buttons">
										{dexEntries!.map((entry: DexEntry, i: number) => (
											<button
												key={i}
												onClick={() => {
													setSelectedEntry(i);
												}}>
												{entry.version.name}
											</button>
										))}
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</PokemonContext.Provider>
		</>
	);
}

export default PokemonMenu;
