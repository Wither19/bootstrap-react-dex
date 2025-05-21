import { useEffect, useState } from "react";
import _ from "lodash";

import { PokeAPI } from "pokeapi-typescript";
import type { Pokemon, PokemonStat, FlavorText, Genus } from "pokeapi-typescript";

import PkmnNameHeader from "./PkmnNameHeader";
import PkmnGenusHeader from "./PkmnGenusHeader";
import PkmnSprite from "./PkmnSprite";
import Types from "./Types";
import Stat from "./Stat";
import PokedexEntry from "./PokedexEntry";
import EntryBtn from "./EntryBtn";
import OptionCheck from "./OptionCheck";

import {
	twoDGames,
	getStatTotal,
	fancifyGameName,
	genusHandle,
	flavorTextHandle,
} from "../functions.ts";

type PkmnMenuProps = {
	pkmn: number;
};

function PkmnMenu({ pkmn }: PkmnMenuProps) {
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

	const [selectedEntry, setSelectedEntry] = useState<number>(0);
	const [seeDuplicateEntries, setDupeEntriesOption] = useState<boolean>(false);

	var currentDexEntry = dexEntries![selectedEntry];

	function pokemonGet() {
		PokeAPI.Pokemon.fetch(pkmn!).then((res) => {
			setGeneralData(res);
			setStatTotal(getStatTotal(res.stats));
		});
	}

	function pokemonSpeciesGet() {
		PokeAPI.PokemonSpecies.fetch(pkmn!).then((res) => {
			setSelectedEntry(0);

			setGenus(genusHandle(res.genera));

			setDexEntries(flavorTextHandle(res.flavor_text_entries, twoDGames, seeDuplicateEntries));
		});
	}

	useEffect(() => {
		pokemonGet();
		pokemonSpeciesGet();
	}, [pkmn]);

	useEffect(() => pokemonSpeciesGet(), [seeDuplicateEntries]);

	return (
		<>
			{pkmnGeneral && (
				<>
					<PkmnNameHeader id={pkmnGeneral.id} name={pkmnGeneral.name} shiny={isShiny} />
					<PkmnGenusHeader genus={genus?.genus} />

					<PkmnSprite
						id={pkmnGeneral?.id}
						shiny={isShiny}
						click={() => setShinyState((prev) => !prev)}
					/>

					<Types types={pkmnGeneral?.types} />

					<div style={{ display: "flex", justifyContent: "space-evenly" }}>
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
								game={currentDexEntry ? fancifyGameName(currentDexEntry!.version.name) : ""}>
								{currentDexEntry ? currentDexEntry!.flavor_text.replace("\f", " ") : ""}
							</PokedexEntry>

							<div className="entry-buttons">
								{dexEntries!.map((entry: FlavorText, i: number) => (
									<EntryBtn key={i} click={() => setSelectedEntry(i)}>
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
				</>
			)}
		</>
	);
}

export default PkmnMenu;
