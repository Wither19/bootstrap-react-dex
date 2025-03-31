import "./scss/App.scss";

import PokedexApp from "./components/PokedexApp";

import React, { useContext, useEffect, useState } from "react";

function App() {
	return (
		<>
			<div className="container-md">
				<div className="row">
					<div className="col-4"></div>
					<div className="col-4 d-flex justify-content-center">
						<div className="display-3 pokedex-title">Pokédex</div>
					</div>
					<div className="col-4"></div>
				</div>
				<PokedexApp />
			</div>
		</>
	);
}

export default App;
