# ContextPlate v2.0
Context-Driven Dietary Nudging Engine designed for the AMD Slingshot Campus Days Hackathon.

## Architecture & Design
- **Stateless Client-Side Architecture**: Vanilla JS, HTML5, CSS3. Zero backend.
- **CIS Compliant Docker Image**: Uses a non-root `nginx:alpine` image.
- **Zero Network Round-trips**: Uses modular static files. Data injected immediately.
- **Accessibility**: High contrast glassmorphism, semantic HTML.

## Getting Started

### Local Development
The app is entirely static. You can run it locally without Docker:
```bash
npx http-server . -p 3000
```
*(Need a server to deal with CORS on `fetch('data/swaps.json')`)*

### Docker Build & Run
```bash
docker build -t contextplate .
docker run -p 8080:8080 contextplate
```

### Google Cloud Run Deployment
```bash
gcloud run deploy contextplate --source . --platform managed --allow-unauthenticated
```
