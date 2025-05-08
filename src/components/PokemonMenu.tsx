import React, { useContext, useEffect, useState, useReducer } from "react";
import _ from "lodash";

import Stat from "./Stat";
import PokedexEntry from "./PokedexEntry";

import { PokemonContext } from "../contexts/PokemonContext";

import { PokeAPI } from "pokeapi-typescript";
import type {
	Pokemon,
	PokemonStat,
	PokemonSpecies,
	FlavorText,
	Genus,
} from "pokeapi-typescript";
import type { HasLang, HasVersion } from "../types/types";

function PokemonMenu() {
	const pokemon = useContext(PokemonContext);

	const [pkmnGeneral, setGeneralData] = useState<Pokemon | undefined>();
	const [genus, setGenus] = useState<Genus>({
		genus: "Seed Pokémon",
		language: {
			name: "en",
			url: "",
		},
	});

	const [bst, setStatTotal] = useState<number>(0);

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
		type NameCode = keyof typeof Name;
		return Name[name as NameCode];
	}

	function getLangEntries<T extends HasLang>(
		arr: T[],
		lang: string = "en"
	): T[] {
		return _.values(_.pickBy(arr, (item: T) => item.language.name === lang));
	}

	function getSingleLangEntry<T extends HasLang>(
		arr: T[],
		lang: string = "en"
	): T {
		return getLangEntries(arr, lang)[0]!;
	}

	function omitVersionEntries<T extends HasLang & HasVersion>() {
		
	}

	function getStatTotal(stats: PokemonStat[]): number {
		return stats.map((stat) => stat.base_stat).reduce((sum, num) => sum + num);
	}

	useEffect(() => {
		PokeAPI.Pokemon.fetch(pokemon!).then((res) => {
			setGeneralData(res);
			setStatTotal(getStatTotal(res.stats));
		});

		PokeAPI.PokemonSpecies.fetch(pokemon!).then((res) => {
			setSelectedEntry(0);

			let g = getSingleLangEntry(res.genera);
			let d = getLangEntries(res.flavor_text_entries);

			setGenus(g);
			setDexEntries(d);
		});
	}, [pokemon]);

	return (
		<>
			<PokemonContext.Provider value={pokemon}>
				{pkmnGeneral && (
					<>
						<div>
							<div
								className={`display-6 pkmn-name-header ${
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
									<br />
									<Stat name="Base Stat Total" value={bst} />
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
												onClick={() => setSelectedEntry(i)}>
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
