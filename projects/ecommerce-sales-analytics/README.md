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

## Quick start (DuckDB — fastest)

1. Download the Kaggle dataset and extract CSVs into `data/raw/`.
2. Install [DuckDB CLI](https://duckdb.org/docs/installation/) or use the DuckDB VS Code extension.
3. Run load script, then queries:

```bash
cd projects/ecommerce-sales-analytics
duckdb analytics.duckdb < sql/duckdb/00_load_tables.sql
duckdb analytics.duckdb < sql/duckdb/01_revenue_overview.sql
```

4. Export key query results to CSV for Looker Studio / Power BI import.

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
