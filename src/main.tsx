import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./scss/App.scss";

// Roboto fallback for Material UI
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/400-italic.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/700-italic.css";

import "@fontsource/ubuntu-sans/400.css";
import "@fontsource/ubuntu-sans/400-italic.css";
import "@fontsource/ubuntu-sans/700.css";
import "@fontsource/ubuntu-sans/700-italic.css";

import "@fontsource/inter/400.css";
import "@fontsource/inter/400-italic.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/700-italic.css";

import App from "./App.js";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
