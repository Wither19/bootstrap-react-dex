import { useContext, useEffect, useState } from "react";
import _ from "lodash";

import PkmnNameHeader from "./PkmnNameHeader";
import PkmnGenusHeader from "./PkmnGenusHeader";
import PkmnSprite from "./PkmnSprite";
import Stat from "./Stat";
import PokedexEntry from "./PokedexEntry";
import EntryBtn from "./EntryBtn";
import OptionCheck from "./OptionCheck";

import { PokemonContext } from "../contexts/PokemonContext";

import { PokeAPI } from "pokeapi-typescript";
import type { Pokemon, PokemonStat, FlavorText, Genus } from "pokeapi-typescript";

import { getLangEntries, removeVersions, stripDuplicateEntries, twoDGames } from "../functions.ts";

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

	const [seeDuplicateEntries, setDupeEntriesOption] = useState<boolean>(false);

	function genusHandle<T extends HasLanguage>(genus: Genus[]): Genus {
		return getSingleLangEntry(genus);
	}

	function flavorTextHandle(flavorText: FlavorText[], omissions: string[]): FlavorText[] {
		let d = getLangEntries(flavorText);

		d = removeVersions(d, omissions);

		if (!seeDuplicateEntries) {
			d = stripDuplicateEntries(d);
		}

		return d;
	}

	var currentDexEntry = dexEntries[selectedEntry];

	useEffect(() => {
		PokeAPI.Pokemon.fetch(pokemon!).then((res) => {
			setGeneralData(res);
			setStatTotal(getStatTotal(res.stats));
		});

		PokeAPI.PokemonSpecies.fetch(pokemon!).then((res) => {
			setSelectedEntry(0);

			setGenus(genusHandle(res.genera));

			setDexEntries(flavorTextHandle(res.flavor_text_entries, twoDGames));
		});
	}, [pokemon]);

	useEffect(() => {
		PokeAPI.PokemonSpecies.fetch(pokemon!).then((res) => {
			setSelectedEntry(0);

			setDexEntries(flavorTextHandle(res.flavor_text_entries, twoDGames));
		});
	}, [seeDuplicateEntries]);

	return (
		<>
			<PokemonContext.Provider value={pokemon}>
				{pkmnGeneral && (
					<>
						<div>
							<PkmnNameHeader id={pkmnGeneral.id} name={pkmnGeneral.name} shiny={isShiny} />

							<PkmnGenusHeader genus={genus?.genus} />

							<PkmnSprite
								id={pkmnGeneral?.id}
								shiny={isShiny}
								click={() => setShinyState((prev) => !prev)}
							/>

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
									<PokedexEntry game={fancifyGameName(currentDexEntry!.version.name)} showGame>
										{dexEntries![selectedEntry]!.flavor_text.replace("\f", " ")}
									</PokedexEntry>

									<div className="entry-buttons">
										{dexEntries!.map((entry: FlavorText, i: number) => (
											<EntryBtn
												key={i}
												highlight={selectedEntry == i}
												click={() => setSelectedEntry(i)}>
												{fancifyGameName(entry.version.name)}
											</EntryBtn>
										))}
									</div>
									<div className="entry-options">
										<OptionCheck
											option={seeDuplicateEntries}
											setOption={() => setDupeEntriesOption((prev) => !prev)}>
											Show duplicate entries
										</OptionCheck>
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
