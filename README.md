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

## Team:
Friso Sterken
MSc Business Analytics, RSM
Strategy, data modeling, and fintech MVP development

Attached
	•	src/ – cleaned code repository
	•	Fintech_business_plan__assignment_1_.pdf
	•	Slide_deck_final.pdf

_“People focus on returns. Smart investors focus on costs.”_
