import { useEffect, useState } from "react";
import _ from "lodash";

import { PokeAPI } from "pokeapi-typescript";
import type {
	Pokemon,
	PokemonStat,
	FlavorText,
	Genus,
	PokemonAbility,
	Name,
	PokemonMove,
} from "pokeapi-typescript";

import { type FormattedMove } from "../types.ts";

import PkmnNameHeader from "./PkmnNameHeader";
import PkmnGenusHeader from "./PkmnGenusHeader";
import PkmnSprite from "./PkmnSprite";
import PkmnMenuContent from "./PkmnMenuContent";
import Types from "./Types";
import AbilityText from "./AbilityText";
import Stat from "./Stat";
import PokedexEntry from "./PokedexEntry";
import EntryBtn from "./EntryBtn";
import OptionCheck from "./OptionCheck";

import { Box, Tabs, Tab, List, ListItem, ListItemText, Divider } from "@mui/material";

import {
	twoDGames,
	getStatTotal,
	fancifyGameName,
	genusHandle,
	flavorTextHandle,
	getSingleLangEntry,
} from "../functions";

type PkmnMenuProps = {
	pkmn: number;
};

function PkmnMenu(props: PkmnMenuProps) {
	const [pkmnGeneral, setGeneralData] = useState<Pokemon>();
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

	const [moveList, setMoveList] = useState<FormattedMove[]>([]);

	var currentDexEntry = dexEntries![selectedEntry];

	function handleDupeEntriesCheck() {
		setDupeEntriesOption((prev) => !prev);
	}

	function handleTabChange(event: React.SyntheticEvent, newValue: number) {
		setTabValue(newValue);
	}

	function pokemonGet() {
		PokeAPI.Pokemon.resolve(props.pkmn!).then((res) => {
			setGeneralData(res);
			setStatTotal(getStatTotal(res.stats));
			moveListFetch(res.moves);
		});
	}

	function pokemonSpeciesGet() {
		PokeAPI.PokemonSpecies.resolve(props.pkmn!).then((res) => {
			setSelectedEntry(0);

			setGenus(genusHandle(res.genera));

			setDexEntries(flavorTextHandle(res.flavor_text_entries, twoDGames, seeDuplicateEntries));
		});
	}

	function moveListFetch(moves?: PokemonMove[]) {
		let movesPageArr: FormattedMove[] = [];

		if (moves) {
			let actedArray = moves;

			for (let currentMove of actedArray) {
				let fixedUrl: number = parseInt(currentMove.move.url.slice(31, -1));

				PokeAPI.Move.resolve(fixedUrl).then((res) => {
					movesPageArr.push({
						name: getSingleLangEntry(res.names).name.replace("-", " "),
						effect: getSingleLangEntry(res.effect_entries).short_effect,
						type: res.type.name,
					});
				});
			}
		}
		setMoveList(movesPageArr);
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

	useEffect(() => moveListFetch(pkmnGeneral?.moves), [pkmnGeneral]);

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

					<Tabs
						sx={{ marginTop: "32px" }}
						centered
						value={tabValue}
						onChange={handleTabChange}
						aria-label="basic tabs example">
						<Tab label="Info & Lore" />
						<Tab label="Battle Info & Moveset" />
						<Tab label="Item Three" />
					</Tabs>

					<PkmnMenuContent index={0} value={tabValue}>
						<div className="dex-entries">
							<PokedexEntry game={fancifyGameName(currentDexEntry!.version.name)}>
								{currentDexEntry!.flavor_text}
							</PokedexEntry>

							<div className="entry-buttons">
								{dexEntries!.map((entry: FlavorText, i: number) => (
									<EntryBtn selected={selectedEntry == i} key={i} click={() => setSelectedEntry(i)}>
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
					<PkmnMenuContent index={1} value={tabValue}>
						<div style={{ display: "flex", flexDirection: "column" }}>
							<List
								sx={{
									py: 0,
									width: "100%",
									maxWidth: 450,
									minWidth: 300,
									borderRadius: 2,
									border: "1px solid",
									borderColor: "divider",
									backgroundColor: "background.paper",
									height: "fit-content",
									paddingBottom: 4,
								}}>
								<ListItem>
									<ListItemText sx={{ textAlign: "center" }}>Abilities</ListItemText>
								</ListItem>
								{pkmnGeneral.abilities &&
									pkmnGeneral?.abilities.map((item: PokemonAbility, index) => (
										<>
											<AbilityText
												name={item.ability.name}
												url={item.ability.url}
												hidden={item.is_hidden}
											/>
											{index + 1 != pkmnGeneral!.abilities.length && <Divider variant="middle" />}
										</>
									))}
							</List>
							<List>
								{moveList.map((item) => (
									<ListItem>
										<ListItemText>
											<span className={item.type}>{item.name}</span>
										</ListItemText>
									</ListItem>
								))}
							</List>
						</div>
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
					</PkmnMenuContent>
				</>
			)}
		</Box>
	);
}

export default PkmnMenu;
