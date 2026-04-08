import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Inline assets smaller than 8KB to reduce HTTP requests
    assetsInlineLimit: 8192,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split heavy 3D libs into their own chunk (loaded lazily via TechStack)
          three: ["three", "@react-three/fiber", "@react-three/drei", "@react-three/postprocessing", "@react-three/rapier"],
          // Split React core into a stable, cacheable chunk
          vendor: ["react", "react-dom"],
        },
      },
    },
  },
});
