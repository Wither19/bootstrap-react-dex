import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import _, { type NumericDictionary } from "lodash";

import Stat from "./Stat";
import PokedexEntry from "./PokedexEntry";

import { PokemonContext } from "../contexts/PokemonContext";

import { PokeAPI } from "pokeapi-typescript";
import type { Pokemon, PokemonStat, FlavorText, Genus } from "pokeapi-typescript";
import type { HasLang } from "../types/types";

function PokemonMenu() {
	const pokemon = useContext(PokemonContext);

	const [pkmnGeneral, setGeneralData] = useState<Pokemon | undefined>();
	const [genus, setGenus] = useState<Genus | undefined>();

	const [dexEntries, setDexEntries] = useState<FlavorText[]>([]);

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


	/**
	 * A function that had smoke coming out of my ears while I tried to make it, isolates the entries from PokeAPI flavor text, genuses, etc that are of a given language. If there is only one entry in the language, returns the index out of the array. 
	 * @param [arr] The array to filter through. Must have the PokeAPI language object.
	 * @param [lang="en"] The language to check for, by an abbreviation.
	 * @returns 
	 */
	function getLangEntries<T extends HasLang>(arr: T[], lang: string = "en"): T[] | T {
		let newArr = _.values(_.pickBy(arr, (item: T) => item.language.name == lang));
		
		if (newArr.length == 1) {
			return newArr[0]!;
		}
		else {
			return newArr;
		}
	}

	useEffect(() => {
		PokeAPI.Pokemon.fetch(pokemon as string).then((res) => setGeneralData(res));
		
		PokeAPI.PokemonSpecies.fetch(pokemon as string).then((res) => {
			const flavors = res.flavor_text_entries;

			setSelectedEntry(0);
			setGenus(
					res.genera.find((item: Genus) => item.language.name == "en")
			);
			setDexEntries(
					_.values(_.pickBy(flavors, (item) => item.language.name == "en"))
			);
		});
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
										pkmnGeneral!.stats.map((item: PokemonStat) => (
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

									<div className="entry-buttons">
										{dexEntries!.map((entry: FlavorText, i: number) => (
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
