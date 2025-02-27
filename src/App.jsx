import "./scss/App.scss";

import PokedexApp from "./components/PokedexApp";

import { useContext, useEffect, useState } from "react";

function App() {
	return (
		<>
			<div className="container-md">
				<div className="row">
					<div className="col-4"></div>
					<div className="col-4 d-flex justify-content-center">
						<div className="display-4 pokedex-title">Pokédex</div>
					</div>
					<div className="col-4">
						<div className="icon grass">
							<img
								src={`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/5781623f147f1bf850f426cfe1874ba56a9b75ee/icons/grass.svg`}
							/>
						</div>
					</div>
				</div>
				<PokedexApp />
			</div>
		</>
	);
}

export default App;
