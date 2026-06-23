# Power BI — 3-page report layout

## Data model relationships

```
orders (1) ──< order_items (many)
orders (1) ──< order_payments (many)
orders (1) ──< order_reviews (1)
orders (many) >── customers (1)  via customer_id
order_items (many) >── products (1)  via product_id
products (many) >── category_translation (1)  via product_category_name
```

Use **English category** column from a merged table or relationship to `category_translation`.

## Page 1 — Executive overview

| Visual | Fields |
|--------|--------|
| Card | Total Revenue, Total Orders, AOV, Repeat Purchase Rate |
| Line chart | Revenue by month (`order_purchase_timestamp`) |
| Donut | Revenue by payment type |
| Map or bar | Revenue by `customer_state` |

**Slicers:** Year, State, Category

## Page 2 — Product categories

| Visual | Fields |
|--------|--------|
| Bar chart (horizontal) | Revenue by category (Top 10) |
| Matrix | Category × State revenue |
| Line | Monthly revenue for top 5 categories |

## Page 3 — Customer & retention

| Visual | Fields |
|--------|--------|
| Card | Repeat customers, At-risk customers (90d inactive) |
| Histogram | Orders per `customer_unique_id` |
| Scatter or bar | Avg review score by delivery bucket |

## Import options

1. **Direct:** PostgreSQL connector → `olist` schema tables.
2. **Simple:** Import CSV exports from DuckDB/SQL queries.

Copy measures from `DAX_MEASURES.md` into the model.

## Publish

1. Publish to Power BI Service.
2. Share → link for recruiters OR Publish to web (embed).
3. Paste URL into `powerBiUrl` in portfolio metadata.
