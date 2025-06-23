import type { NamedApiResource, Language, Version } from "pokeapi-typescript";

export enum Region {
	Kanto = "kanto",
	Johto = "johto",
	Hoenn = "hoenn",
	Sinnoh = "sinnoh",
	Unova = "unova",
	Kalos = "kalos",
	Alola = "alola",
	Galar = "galar",
	Hisui = "hisui",
	Paldea = "paldea",
	Unknown = "unknown",
}

export type RegionObj = {
	name: string;
	start: number;
	end: number;
};

export enum GameName {
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

export type NameCode = keyof typeof GameName;

export type HasLanguage = {
	language: NamedApiResource<Language>;
};

export type HasVersion = {
	version: NamedApiResource<Version>;
};

export type DisplayProps = "none" | "inline" | "block" | "inline-block" | "flex";

export type FormattedMove = {
	name: string;
	effect: string;
	type: string;
};
