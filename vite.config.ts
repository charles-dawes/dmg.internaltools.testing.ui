import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { appName } from "./appConfig.json";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        federation({
            name: appName,
            filename: "remoteEntry.js",
            // Modules to expose
            exposes: {
                "./ButtonModule": "./src/modules/ButtonModule.tsx",
            },
            shared: ["react", "react-dom"],
        }),
    ],
    //this build code to account for vite error where top level await not available
    build: {
        modulePreload: false,
        target: "esnext",
        minify: false,
        cssCodeSplit: false,
    },
    resolve: {
        alias: {
            "@appConfig": path.resolve(__dirname, "./appConfig.json"),
            "@models": path.resolve(__dirname, "./src/models.ts"),
        },
    },
});
