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
	Genus,
} from "../types/types";

function PokemonMenu() {
	const pokemon = useContext(PokemonContext);

	const [pkmnGeneral, setGeneralData] = useState<PokemonGeneral | null>(null);
	const [genus, setGenus] = useState<Genus | null>(null);

	const [dexEntries, setDexEntries] = useState<DexEntry[]>([]);
	const [showAllBtns, setShowAll] = useState<boolean>(false);

	const [isShiny, setShinyState] = useState<boolean>(false);
	const artworkType = isShiny ? "shiny/" : "";

	const [selectedEntry, setSelectedEntry] = useState<number>(0);

	enum Name {
		"red" = "Red",
		"blue" = "Blue",
		"yellow" = "Yellow",
		"gold" = "Gold",
		"silver" = "Silver",
		"crystal" = "Crystal",
		"ruby" = "Ruby",
		"sapphire" = "Sapphire",
		"emerald" = "Emerald",
		"firered" = "Fire Red",
		"leafgreen" = "Leaf Green",
		"diamond" = "Diamond",
		"pearl" = "Pearl",
		"platinum" = "Platinum",
		"heartgold" = "Heart Gold",
		"soulsilver" = "Soul Silver",
		"black" = "Black",
		"white" = "White",
		"black-2" = "Black 2",
		"white-2" = "White 2",
		"x" = "X",
		"y" = "Y",
		"omega-ruby" = "Omega Ruby",
		"alpha-sapphire" = "Alpha Sapphire",
		"sun" = "Sun",
		"moon" = "Moon",
		"ultra-sun" = "Ultra Sun",
		"ultra-moon" = "Ultra Moon",
		"lets-go-pikachu" = "Let's Go Pikachu",
		"lets-go-eevee" = "Let's Go Eevee",
		"sword" = "Sword",
		"shield" = "Shield",
		"brilliant-diamond" = "Brilliant Diamond",
		"shining-pearl" = "Shining Pearl",
		"legends-arceus" = "Legends: Arceus",
		"scarlet" = "Scarlet",
		"violet" = "Violet",
	}

	function fancifyGameName(name: string): Name {
		return Name[name as keyof typeof Name];
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
				setSelectedEntry(0);
				setGenus(
					response.data.genera.find((item: Genus) => item.language.name == "en")
				);
				setDexEntries(
					_.values(
						_.pickBy(
							response.data.flavor_text_entries,
							(item) => item.language.name == "en"
						)
					)
				);
			})
			.catch(() => {});
	}, [pokemon]);

	return (
		<>
			<PokemonContext.Provider value={pokemon}>
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

							<div className="pkmn-genus-header">
								<sub>The {genus?.genus}</sub>
							</div>

							<div
								onClick={() => setShinyState((prev) => !prev)}
								style={{ textAlign: "center" }}>
								<img
									src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${artworkType}${pkmnGeneral?.id}.png`}
									className={`artwork ${isShiny ? "shiny" : "regular"}`}
								/>
							</div>

							<div className="d-flex justify-content-evenly">
								<div className="stats">
									{pkmnGeneral.stats &&
										pkmnGeneral!.stats.map((item: Stats) => (
											<Stat
												key={`stat-${item.stat.name}`}
												name={item.stat.name}
												value={item.base_stat}
											/>
										))}
								</div>

								<div className="dex-entries">
									<PokedexEntry
										game={
											dexEntries[selectedEntry]
												? fancifyGameName(
														dexEntries[selectedEntry]!.version?.name
												  )
												: ""
										}
										showGame>
										{dexEntries[selectedEntry]
											? dexEntries![selectedEntry]!.flavor_text.replace(
													"\f",
													" "
											  )
											: ""}
									</PokedexEntry>

									<button onClick={() => setShowAll((prev) => !prev)}>
										<i
											className={`bi bi-caret-${
												showAllBtns ? "down" : "up"
											}`}></i>
									</button>
									<div className={`entry-buttons ${showAllBtns ? "" : "hide"}`}>
										{dexEntries!.map((entry: DexEntry, i: number) => (
											<button
												key={i}
												className={selectedEntry == i ? "highlight" : ""}
												onClick={() => {
													setSelectedEntry(i);
												}}>
												{fancifyGameName(entry.version.name)}
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
