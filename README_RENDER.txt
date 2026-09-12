THE LAST PORT — Render Fixed
1. Render -> New -> Web Service.
2. Upload/connect this ZIP.
3. Environment: Node.
4. Build Command: npm install
5. Start Command: npm start
6. Do NOT use Static Site for this package.
7. Render supplies PORT automatically; server listens on 0.0.0.0.
8. Health check: /health
9. The HTML includes a renderer-independent fallback scene so the page is not blank if the external 3D library fails.
