-- PostgreSQL versions (schema: olist)
-- Assumes tables loaded per DATA_SETUP.md

WITH delivered_orders AS (
  SELECT order_id, DATE_TRUNC('month', order_purchase_timestamp::timestamp) AS order_month
  FROM olist.orders
  WHERE order_status = 'delivered'
),
line_revenue AS (
  SELECT
    d.order_month,
    oi.order_id,
    SUM(oi.price) AS order_revenue
  FROM olist.order_items oi
  INNER JOIN delivered_orders d ON d.order_id = oi.order_id
  GROUP BY d.order_month, oi.order_id
)
SELECT
  order_month,
  COUNT(DISTINCT order_id) AS orders,
  ROUND(SUM(order_revenue)::numeric, 2) AS revenue,
  ROUND((SUM(order_revenue) / COUNT(DISTINCT order_id))::numeric, 2) AS avg_order_value
FROM line_revenue
GROUP BY order_month
ORDER BY order_month;
