import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        clientsClaim: true,
        skipWaiting: true
      },
      includeAssets: [
        "icons/favicon.ico",
        "robots.txt",
        "icons/apple-touch-icon.png",
        "assets/data/*.js", 
        "assets/*.png",
        "pwaicons/*.png"],
      manifest: {
        short_name: "Hummingbird",
        name: "Hummingbird",
        description: "hope is the thing with feathers",
        theme_color: "#a6c9ff",
        background_color: "#a6c9ff",
        orientation: "portrait",
        start_url: "./",
        scope: ".",
        display: "standalone",
        icons: [
          {
            src: "icons/favicon.ico",
            sizes: "48x48",
            type: "image/x-icon",
          },
          {
            src: "icons/android-chrome-192x192.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "maskable any",
          },
          {
            src: "icons/android-chrome-512x512",
            type: "image/png",
            sizes: "512x512",
            purpose: "maskable any",
          },
        ],
      },
    }),
  ],
  build: {
    outDir: "build"
  },
  server: {
    strictPort: true,
    hmr: {
      port: 443 // Run the websocket server on the SSL port
    }
  }
});
