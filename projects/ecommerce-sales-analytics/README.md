# E-commerce Sales & Customer Insights

Case study #1 for the analytics portfolio. Uses the **[Brazilian E-Commerce Public Dataset (Olist)](https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce)** on Kaggle.

## Business question

> Which product categories and customer segments drive revenue, and where is repeat-purchase risk rising?

## Deliverables

| Deliverable | Location |
|-------------|----------|
| SQL analysis | `sql/duckdb/` and `sql/postgresql/` |
| Power BI report | `power-bi/` (build guide + DAX measures) |
| Looker Studio embed | `looker-studio/SETUP.md` |
| Portfolio write-up | `../../src/data/case-studies/content/ecommerce-sales-analytics.js` |

## Quick start (recommended)

```bash
cd projects/ecommerce-sales-analytics
python scripts/run_pipeline.py
```

This loads CSVs from `data/raw/`, writes `exports/*.csv` and `insights.json` — no DuckDB or pandas required.

Then build Power BI from `exports/` (see `power-bi/IMPORT_FROM_EXPORTS.md`) and Looker Studio from the same files.

## Quick start (DuckDB)

## Quick start (PostgreSQL)

See `DATA_SETUP.md` for `COPY` commands and schema notes.

## Power BI

1. Import these tables (or exported CSVs): orders, order_items, products, customers, payments, category_translation.
2. Follow `power-bi/REPORT_PAGES.md` for 3-page layout.
3. Copy measures from `power-bi/DAX_MEASURES.md`.
4. Publish to Power BI Service → copy share link into portfolio metadata `powerBiUrl`.

## Looker Studio

Follow `looker-studio/SETUP.md` — connect Google Sheet exports from SQL results.

## After dashboards are live

Update `src/data/case-studies/index.js`:

```js
powerBiUrl: 'https://...',
lookerStudioUrl: 'https://lookerstudio.google.com/embed/...',
githubUrl: 'https://github.com/Mash24/ecommerce-sales-analytics',
status: 'published',
```

Add screenshots to `public/images/case-studies/ecommerce-*.png`.
