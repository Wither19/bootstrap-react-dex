import "./scss/App.scss";

import PokedexApp from "./components/PokedexApp";

import React, { useContext, useEffect, useState } from "react";

function App() {
	return (
		<>
			<div className="container-md">
				<PokedexApp />
			</div>
		</>
	);
}

export default App;
