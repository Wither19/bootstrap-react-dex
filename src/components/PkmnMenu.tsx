import { useEffect, useState } from "react";
import _ from "lodash";

import { PokeAPI } from "pokeapi-typescript";
import type { Pokemon, PokemonStat, FlavorText, Genus } from "pokeapi-typescript";

import PkmnNameHeader from "./PkmnNameHeader";
import PkmnGenusHeader from "./PkmnGenusHeader";
import PkmnSprite from "./PkmnSprite";
import PkmnMenuContent from "./PkmnMenuContent";
import Types from "./Types";
import Stat from "./Stat";
import PokedexEntry from "./PokedexEntry";
import EntryBtn from "./EntryBtn";
import OptionCheck from "./OptionCheck";

import { Box, Tabs, Tab } from "@mui/material";

import {
	twoDGames,
	getStatTotal,
	fancifyGameName,
	genusHandle,
	flavorTextHandle,
	checkForDuplicates,
} from "../functions.ts";

type PkmnMenuProps = {
	pkmn: number;
};

function PkmnMenu(props: PkmnMenuProps) {
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

	const [tabValue, setTabValue] = useState<number>(0);

	var currentDexEntry = dexEntries![selectedEntry];

	function handleDupeEntriesCheck() {
		setDupeEntriesOption((prev) => !prev);
	}

	function pokemonGet() {
		PokeAPI.Pokemon.fetch(props.pkmn!).then((res) => {
			setGeneralData(res);
			setStatTotal(getStatTotal(res.stats));
		});
	}

	function pokemonSpeciesGet() {
		PokeAPI.PokemonSpecies.fetch(props.pkmn!).then((res) => {
			setSelectedEntry(0);

			setGenus(genusHandle(res.genera));

			setDexEntries(flavorTextHandle(res.flavor_text_entries, twoDGames, seeDuplicateEntries));
		});
	}

	function handleTabChange(event: React.SyntheticEvent, newValue: number) {
		setTabValue(newValue);
	}

	function resetTabValue() {
		setTabValue(0);
	}

	useEffect(() => {
		pokemonGet();
		pokemonSpeciesGet();
		resetTabValue();
	}, [props.pkmn]);

	useEffect(() => pokemonSpeciesGet(), [seeDuplicateEntries]);

	return (
		<Box sx={{ width: "95%" }}>
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

					<Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
						<Tab label="Stats and Lore" />
						<Tab label="Battle Info and Moveset" />
						<Tab label="Item Three" />
					</Tabs>

					<PkmnMenuContent index={0} value={tabValue}>
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
							<PokedexEntry game={fancifyGameName(currentDexEntry!.version.name)}>
								{currentDexEntry!.flavor_text}
							</PokedexEntry>

							<div className="entry-buttons">
								{dexEntries!.map((entry: FlavorText, i: number) => (
									<EntryBtn key={i} click={() => setSelectedEntry(i)}>
										{fancifyGameName(entry.version.name)}
									</EntryBtn>
								))}
							</div>
							<div className="entry-options">
								<OptionCheck option={seeDuplicateEntries} setOption={handleDupeEntriesCheck}>
									Show duplicate entries
								</OptionCheck>
							</div>
						</div>
					</PkmnMenuContent>
				</>
			)}
		</Box>
	);
}

export default PkmnMenu;
