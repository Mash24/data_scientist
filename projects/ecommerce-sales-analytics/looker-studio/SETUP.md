# Looker Studio setup

Use Looker Studio for a **single-page public embed** on the portfolio case study.

## 1. Export SQL results to Google Sheets

Run these DuckDB queries and export CSV → upload to Google Drive as Sheets:

| Sheet tab | SQL file |
|-----------|----------|
| `monthly_revenue` | `sql/duckdb/01_revenue_overview.sql` |
| `category_revenue` | `sql/duckdb/02_category_performance.sql` |
| `state_revenue` | `sql/duckdb/03_revenue_by_state.sql` |
| `payment_mix` | `sql/duckdb/06_payment_mix.sql` |

## 2. Create report

1. [lookerstudio.google.com](https://lookerstudio.google.com) → Create → Report.
2. Add data source → Google Sheets → select your workbook.
3. Build one page:

| Chart | Data | Type |
|-------|------|------|
| Scorecard row | `monthly_revenue` | SUM revenue, SUM orders, AVG avg_order_value |
| Time series | `monthly_revenue` | Line: order_month × revenue |
| Categories | `category_revenue` | Bar: category × revenue (Top 10 filter) |
| Geography | `state_revenue` | Bar or geo: state × revenue |
| Payments | `payment_mix` | Pie: payment_type × total_payment_value |

## 3. Embed on portfolio

1. Share report → Anyone with link can view.
2. File → Embed report → copy embed URL.
3. Set `lookerStudioUrl` in `src/data/case-studies/index.js`.

The portfolio page renders the embed in an iframe when the URL is set.

## Branding

- Primary: `#059669` (matches analytics portfolio)
- Font: default or Google Sans
- Add footer: "Source: Olist Brazilian E-Commerce (Kaggle)"
