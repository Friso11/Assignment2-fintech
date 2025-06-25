# ClearVest: Investing Without Hidden Fees
ClearVest helps retail investors uncover and reduce hidden investment costs like TERs, FX spreads, and platform fees. Our MVP syncs portfolios, analyzes cost layers, and provides smart, personalized suggestions, all in one intuitive dashboard.

## Why It Matters
Retail investors across Europe unknowingly lose 1–2% of their portfolio value annually due to hidden costs. With over €125B in assets held by retail investors, ClearVest addresses a major pain point: lack of cost transparency.

## MVP Features
- Connect Portfolio – via CSV or manual input (Open Banking simulated)
- Cost Analyzer – break down TERs, FX fees, transaction costs
- Smart Suggestions – personalized, actionable insights
- Future AI Assistant – explain costs & suggest actions via RAG (planned)

## Folder Structure
src/
│
├── main.py               # MVP launcher
├── cost_analysis.py      # Core logic to break down investment costs
├── data_loader.py        # CSV reader & portfolio simulation
├── suggestions.py        # Personalized saving suggestions
├── ui_app.py             # Optional: Streamlit or CLI interface
└── utils/                # Shared helper functions

## Install required packages:
pip install -r requirements.txt

## Run the MVP:
Clone the repository:

*```bash
git clone https://github.com/your-username/clearvest.git
cd clearvest
pip install -r requirements.txt
python src/main.py

## Business Model Summary:
	•	Freemium: basic portfolio scan is free
	•	Premium: in-depth savings reports + AI assistant
	•	B2B API: banks/advisors can license our engine
	•	Referral revenue: for switching to cheaper brokers/funds

See business plan and slide deck for more.

## Technology Highlights:
	•	Python MVP architecture
	•	Modular design (separate logic for data, calculations, suggestions)
	•	Styled via Tailwind in index.css (if frontend used)
	•	RAG-based AI module designed (GPT + retrieval), not yet deployed

 ## How to Run Locally
To run the ClearVest app locally, follow these steps:
	1.	Clone the repository from GitHub and open the project folder.
	2.	Make sure you have Node.js installed (version 18 or higher).
	3.	Open your terminal, go to the project folder, and run npm install to install all necessary packages.
	4.	After installation, run npm run dev to start the app.
	5.	Open your browser and go to http://localhost:5173 to use the app.

This launches the development version of ClearVest on your computer. 

Lastly, if you do not want to go through this process, here is the link open to the public:
https://dreamy-biscuit-325d3f.netlify.app/ 


## Team:
Friso Sterken
MSc Business Analytics, RSM
Strategy, data modeling, and fintech MVP development

Attached in the repository: src/ – cleaned code repository

_“People focus on returns. Smart investors focus on costs.”_
