
-----

# MockTankAI 🚀

> **MockTankAI** is an AI-powered pitch simulation platform designed to help founders practice startup pitches with realistic investor interactions. It uses a sophisticated AI model to simulate multiple investor personas, each with their own expertise, to ask insightful questions, provide feedback, and even negotiate deals.

![img](https://media.canva.com/v2/image-resize/format:PNG/height:248/quality:100/uri:ifs%3A%2F%2FM%2F9a6038ae-dc3a-4386-afd8-d63353141ccc/watermark:F/width:394?csig=AAAAAAAAAAAAAAAAAAAAAHYifxwfz3KgTZXOqRM9UOOWc7Lz-M53nSKI-Ooqxo5s&exp=1757078948&osig=AAAAAAAAAAAAAAAAAAAAAAZ1-UpQEqWhVZ2alw_AGzetIsg9bJ1nxE057V76-ya_&signer=media-rpc&x-canva-quality=thumbnail_large)

-----

## Badges
<p align="center">
<a href="https://github.com/yb175/MockTankAI/stargazers"><img src="https://img.shields.io/github/stars/yb175/MockTankAI?style=social" alt="GitHub stars"></a>
<a href="https://github.com/yb175/MockTankAI/network/members"><img src="https://img.shields.io/github/forks/yb175/MockTankAI?style=social" alt="GitHub forks"></a>
<a href="https://github.com/yb175/MockTankAI/issues"><img src="https://img.shields.io/github/issues/yb175/MockTankAI?color=blue" alt="GitHub issues"></a>
<br>
<img src="https://img.shields.io/github/last-commit/yb175/MockTankAI?color=orange" alt="GitHub last commit">
<a href="https://github.com/yb175/MockTankAI/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
<img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome">
</p>
<p align="center">
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
</p>
-----

## Table of Contents

1.  [Features](https://www.google.com/search?q=%23features)
2.  [Screenshots / Demo / GIFs](https://www.google.com/search?q=%23screenshots--demo--gifs)
3.  [Tech Stack / Built With](https://www.google.com/search?q=%23tech-stack--built-with)
4.  [Installation / Setup Guide](https://www.google.com/search?q=%23installation--setup-guide)
5.  [Usage Instructions](https://www.google.com/search?q=%23usage-instructions)
6.  [Project Structure](https://www.google.com/search?q=%23project-structure)
7.  [Contributing Guidelines](https://www.google.com/search?q=%23contributing-guidelines)
8.  [Roadmap / Future Improvements](https://www.google.com/search?q=%23roadmap--future-improvements)
9.  [License](https://www.google.com/search?q=%23license)
10. [Acknowledgements / Credits](https://www.google.com/search?q=%23acknowledgements--credits)
11. [Contact / Author Info](https://www.google.com/search?q=%23contact--author-info)


## Features ✨

  - **Dynamic Investor Simulation**: Interact with multiple pre-defined AI investors (e.g., Strategic, Technical, Financial), each asking questions relevant to their expertise.
  - **Structured Pitch Rounds**: Experience a realistic conversation flow that progresses through distinct stages:
      - Initial Questions
      - Deep-Dive Follow-ups
      - Valuation & Financials
      - Term Sheet Negotiation
      - Closing Remarks & Feedback
  - **Intelligent Model**: The AI can detect short/unproductive responses, guide the conversation, sanitize messages, and extract key metrics from your pitch.
  - **Interactive UI**: A simple and clean interface for live chat with the AI investors.
  - **Secure & Scalable**: Built with a robust backend for user management and data handling (see [mockTankBackend](https://github.com/yb175/mockTankBackend)).

-----

## Screenshots / Demo / GIFs

<p align="center"\>
<img src="https://i.ibb.co/G4F1fkMV/Screenshot-2025-09-05-144052.png" alt="Pitch Simulation Demo" width="700"/\>
</p\>

<p align="center"\>
<img src="https://i.ibb.co/wFtJK36L/Screenshot-2025-09-05-144209.png" alt="Pitch Simulation Demo" width="700"/\>
</p\>

<p align="center"\>
<img src="https://i.ibb.co/8LFGRxbd/Screenshot-2025-09-05-135528.png" alt="Pitch Simulation Demo" width="700"/\>
</p\>
-----

## Tech Stack / Built With 🛠️

### AI / Core Logic

  - Python
  - [Gradio](https://www.gradio.app/) (for the interactive UI)
  - Large Language Models (for investor simulation)
  - [Flask](https://flask.palletsprojects.com/) (for AI service layer)

### Backend

  - [Express.js](https://expressjs.com/) (See [mockTankBackend](https://github.com/yb175/mockTankBackend))
  - [MongoDB](https://www.mongodb.com/) (See [mockTankBackend](https://github.com/yb175/mockTankBackend))
  - REST API

### Frontend

  - [React.js](https://react.dev/) (For user dashboard, history, and overall platform shell)

-----

## Installation / Setup Guide

```bash
# Clone the repository
git clone https://github.com/yb175/MockTankAI.git
cd MockTankAI
npm i 
npm run dev
```

*Create a `.env` file for your AI service and add your API keys as needed. Refer to individual `README.md` files for more detailed setup instructions.*

-----

## Usage Instructions

1.  **Register/Login** to the platform.
2.  Navigate to the **Pitch Simulator**.
3.  Enter your startup's elevator pitch to begin.
4.  Engage with the AI investors as they ask their **initial questions**.
5.  Proceed through the **follow-up, valuation, and negotiation rounds**.
6.  Accept or reject the final deal proposed by the investors.
7.  After the simulation ends, **review the full conversation log (JSON output)** to analyze your performance.

-----

## Project Structure

```
.
├── public/
│   └── ... (Static assets like images, fonts, etc.)
│
├── src/
│   ├── components/
│   │   ├── CameraPreview/
│   │   ├── Dashboard/
│   │   ├── DeepAnalysis/
│   │   ├── FeedbackForm/
│   │   ├── Navbar/
│   │   ├── Recents/
│   │   ├── SessionDetails/
│   │   ├── Signin/
│   │   ├── Signup/
│   │   └── Simulation/
│   │
│   ├── context/
│   │   └── ... (Files related to React Context for state management)
│   │
│   ├── firebase/
│   │   └── ... (Firebase configuration and service files)
│   │
│   └── ui_components/
│       └── ... (Reusable, generic UI components like Buttons, Modals, etc.)
│
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js
```

*Backend code is located in the separate [mockTankBackend](https://github.com/yb175/mockTankBackend) repository.*

-----

## Contributing Guidelines

  - Fork the repository and create your branch (`git checkout -b feature/your-feature`)
  - Commit your changes (`git commit -am 'Add new feature'`)
  - Push to the branch (`git push origin feature/your-feature`)
  - Open a Pull Request

Please read [CONTRIBUTING.md](https://www.google.com/search?q=CONTRIBUTING.md) for details.

-----

## Roadmap / Future Improvements

  - Add more investor archetypes (e.g., Angel Investor, Corporate VC, Impact Investor).
  - Simulate different funding stages (Pre-seed, Seed, Series A).
  - Provide real-time feedback on pitch clarity, confidence, and keyword usage.
  - Integrate a pitch deck analysis feature.
  - Develop a scoring system to track pitch improvement over time.
  - Multi-language support for global founders.

-----

## License

This project is [MIT Licensed](https://www.google.com/search?q=LICENSE).

-----

## Contact / Author Info

  - **Pratham Arora** : [GitHub](https://github.com/Pratham-9365)
  - **Vansh Khurana** : [GitHub](https://github.com/vanshkhurana05)
  - **Yug Bhatia** : [GitHub](https://github.com/yb175)
  - **Yojit Jindal** : [GitHub](https://github.com/yj13273)

For any queries or suggestions, feel free to raise an issue or contact the authors via their GitHub profiles.