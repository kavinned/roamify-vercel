import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:3000",
            },
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    "vendor-react": [
                        "react",
                        "react-dom",
                        "react-router-dom",
                        "react-redux",
                        "react-icons",
                    ],
                    "vendor-ui": [
                        "@radix-ui/react-dialog",
                        "@radix-ui/react-dropdown-menu",
                        "@radix-ui/react-label",
                        "@radix-ui/react-slot",
                        "lucide-react",
                    ],
                    "vendor-utils": [
                        "@reduxjs/toolkit",
                        "class-variance-authority",
                        "clsx",
                        "tailwind-merge",
                    ],
                },
            },
        },
        chunkSizeWarningLimit: 500, // in kbs
        minify: true,
    },
});
