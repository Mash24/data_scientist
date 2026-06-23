-- Inactivity proxy: customers whose last order was 90+ days before dataset end
WITH last_order AS (
  SELECT
    c.customer_unique_id,
    MAX(CAST(o.order_purchase_timestamp AS TIMESTAMP)) AS last_purchase_at
  FROM orders o
  INNER JOIN customers c ON c.customer_id = o.customer_id
  WHERE o.order_status = 'delivered'
  GROUP BY c.customer_unique_id
),
bounds AS (
  SELECT MAX(last_purchase_at) AS dataset_end FROM last_order
)
SELECT
  COUNT(*) AS customers_at_risk,
  ROUND(100.0 * COUNT(*) / (SELECT COUNT(*) FROM last_order), 2) AS pct_of_base
FROM last_order l
CROSS JOIN bounds b
WHERE l.last_purchase_at < b.dataset_end - INTERVAL 90 DAY;
