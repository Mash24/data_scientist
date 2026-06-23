# Data setup — Olist Brazilian E-Commerce

## Download

1. Create a Kaggle account (free).
2. Download [Brazilian E-Commerce Public Dataset by Olist](https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce).
3. Extract all CSV files into:

```
projects/ecommerce-sales-analytics/data/raw/
```

## Required files

| File | Purpose |
|------|---------|
| `olist_orders_dataset.csv` | Order dates, status, customer |
| `olist_order_items_dataset.csv` | Line items, price, freight |
| `olist_products_dataset.csv` | Category, attributes |
| `olist_customers_dataset.csv` | City, state |
| `olist_order_payments_dataset.csv` | Payment type, installments |
| `olist_order_reviews_dataset.csv` | Review score, timestamps |
| `product_category_name_translation.csv` | Portuguese → English categories |

Optional: `olist_sellers_dataset.csv`, `olist_geolocation_dataset.csv`.

## PostgreSQL load (outline)

```sql
CREATE SCHEMA olist;

-- Example for orders (repeat pattern per table)
CREATE TABLE olist.orders (
  order_id TEXT PRIMARY KEY,
  customer_id TEXT,
  order_status TEXT,
  order_purchase_timestamp TIMESTAMP,
  order_approved_at TIMESTAMP,
  order_delivered_carrier_date TIMESTAMP,
  order_delivered_customer_date TIMESTAMP,
  order_estimated_delivery_date TIMESTAMP
);

\copy olist.orders FROM 'data/raw/olist_orders_dataset.csv' CSV HEADER;
```

Run analogous `CREATE` + `\copy` for items, products, customers, payments, reviews, category_translation.

Point Power BI to PostgreSQL or import CSVs directly.

## DuckDB load

Use `sql/duckdb/00_load_tables.sql` — reads CSVs from `data/raw/` relative to project root.

## Data dictionary notes

- **Grain:** `order_items` is line-level; revenue = `price` (freight often analyzed separately).
- **Dates:** Filter `order_status = 'delivered'` for fulfilled revenue analysis.
- **Customers:** `customer_unique_id` identifies repeat buyers across `customer_id` rows.
- **Categories:** Join `products.product_category_name` to translation table for English labels.
