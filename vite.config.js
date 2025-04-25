import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "/bootstrap-react-dex/",
	resolve: {
		alias: {
			"~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
			"~bootstrap-icons": path.resolve(
				__dirname,
				"node_modules/bootstrap-icons/font/bootstrap-icons.scss"
			),
		},
	},
	build: {
		outDir: "./dist",
		emptyOutDir: true,
	},
});
