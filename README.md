# 🌐 ContextPlate v2.0
### *Context-Driven Dietary Nudging Engine*

**ContextPlate** is a proactive health application designed to shift the focus from retrospective calorie counting to real-time, context-aware behavioral nudges. Built for the **AMD Slingshot Campus Days Hackathon**, it leverages physiological and psychological contexts to provide scientifically-backed healthy food swaps.

---

## 🚀 Live Links
- **Live Deployment:** [https://contextplate-444510432834.us-central1.run.app](https://contextplate-444510432834.us-central1.run.app)
- **Source Code:** [https://github.com/ABHISHEK-DBZ/healthcare.git](https://github.com/ABHISHEK-DBZ/healthcare.git)

---

## ✨ Core Features
- **Context-Aware Engine:** Maps current mood (Stressed, Tired, Bored, etc.) and cravings (Sweet, Salty, Crunchy, etc.) to the most effective healthy alternative.
- **Scientific Rationale:** Every swap includes a "Biological Impact" explanation based on nutritional science (e.g., magnesium for stress, L-Theanine for focus).
- **Interactive Metrics:** Real-time SVG progress rings visualize the health impact (Calories, Sugar, Nutrient Density) of the recommended swap compared to the original urge.
- **Premium UI/UX:** A high-performance "Neon Nocturne" dark-mode interface using glassmorphism and smooth CSS animations (60fps).
- **Zero-Trust Privacy:** Fully stateless client-side architecture. No PII is collected, stored, or transmitted.

---

## 🏗️ Technical Architecture
ContextPlate follows a **Stateless Client-Side Architecture** optimized for speed, security, and scalability.

- **Frontend:** Pure HTML5, CSS3, and Vanilla JavaScript (ES Modules).
- **Modular Data:** Recommendations are decoupled into a structured JSON engine (`data/swaps.json`).
- **Containerization:** Production-grade `nginx:alpine` Docker image.
- **Security:** Strict Content Security Policy (CSP), non-root user execution, and hardened Nginx headers.
- **Deployment:** Native integration with **Google Cloud Run** for serverless, global scaling.

---

## 🛠️ Technology Stack
| Layer | Technology |
| :--- | :--- |
| **Logic** | Vanilla JavaScript (ES6+) |
| **Styling** | Vanilla CSS (Glassmorphism, Grid, Flexbox) |
| **Server** | Nginx Alpine (Hardened) |
| **Container** | Docker |
| **Infrastructure** | Google Cloud Run / Google Artifact Registry |
| **CI/CD** | Cloud Build (Source-to-Service) |

---

## 📋 Hackathon Rubric Alignment
- **Code Quality:** Modular ES6 modules, clean separation of concerns, and JSDoc documentation.
- **Efficiency:** Zero external library weight (no React/Angular), sub-second Time-to-Interactive (TTI).
- **Security:** CIS Benchmarks compliant Dockerfile, no database (zero SQLi/PII risk), strict CSP headers.
- **Accessibility:** WCAG AA compliant contrast ratios, full keyboard navigation support, and semantic HTML.
- **GCP Integration:** Native deployment on Cloud Run using Artifact Registry and Cloud Build.

---

## 🚦 Getting Started

### Local Development
To run the project locally with full `fetch()` functionality:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server . -p 8000
```
*Access at `http://localhost:8000`*

### Docker Environment
```bash
# Build the image
docker build -t contextplate .

# Run the container
docker run -p 8080:8080 contextplate
```

### Deployment to Google Cloud Run
```bash
gcloud run deploy contextplate \
  --source . \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated
```

---

## 📜 License
Built exclusively for the AMD Slingshot Campus Days Hackathon. All rights reserved.
