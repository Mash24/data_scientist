-- Export aggregated tables for Power BI / Looker Studio (CSV)
-- Run after 00_load_tables.sql

COPY (
  WITH delivered_orders AS (
    SELECT order_id, DATE_TRUNC('month', CAST(order_purchase_timestamp AS TIMESTAMP)) AS order_month
    FROM orders WHERE order_status = 'delivered'
  ),
  line_revenue AS (
    SELECT d.order_month, oi.order_id, SUM(oi.price) AS order_revenue
    FROM order_items oi
    INNER JOIN delivered_orders d ON d.order_id = oi.order_id
    GROUP BY d.order_month, oi.order_id
  )
  SELECT order_month, COUNT(DISTINCT order_id) AS orders,
         ROUND(SUM(order_revenue), 2) AS revenue,
         ROUND(SUM(order_revenue) / COUNT(DISTINCT order_id), 2) AS avg_order_value
  FROM line_revenue GROUP BY order_month ORDER BY order_month
) TO 'exports/monthly_revenue.csv' (HEADER, DELIMITER ',');

COPY (
  SELECT COALESCE(ct.product_category_name_english, p.product_category_name) AS category,
         COUNT(DISTINCT oi.order_id) AS orders,
         ROUND(SUM(oi.price), 2) AS revenue
  FROM order_items oi
  INNER JOIN orders o ON o.order_id = oi.order_id AND o.order_status = 'delivered'
  INNER JOIN products p ON p.product_id = oi.product_id
  LEFT JOIN category_translation ct ON ct.product_category_name = p.product_category_name
  GROUP BY 1 ORDER BY revenue DESC
) TO 'exports/category_revenue.csv' (HEADER, DELIMITER ',');

COPY (
  SELECT c.customer_state AS state,
         COUNT(DISTINCT c.customer_unique_id) AS customers,
         COUNT(DISTINCT o.order_id) AS orders,
         ROUND(SUM(oi.price), 2) AS revenue
  FROM order_items oi
  INNER JOIN orders o ON o.order_id = oi.order_id AND o.order_status = 'delivered'
  INNER JOIN customers c ON c.customer_id = o.customer_id
  GROUP BY c.customer_state ORDER BY revenue DESC
) TO 'exports/state_revenue.csv' (HEADER, DELIMITER ',');

COPY (
  SELECT payment_type,
         ROUND(SUM(payment_value), 2) AS total_payment_value
  FROM order_payments GROUP BY payment_type ORDER BY total_payment_value DESC
) TO 'exports/payment_mix.csv' (HEADER, DELIMITER ',');

COPY (
  WITH customer_orders AS (
    SELECT c.customer_unique_id, COUNT(DISTINCT o.order_id) AS order_count
    FROM orders o
    INNER JOIN customers c ON c.customer_id = o.customer_id
    WHERE o.order_status = 'delivered'
    GROUP BY c.customer_unique_id
  )
  SELECT COUNT(*) AS total_customers,
         SUM(CASE WHEN order_count > 1 THEN 1 ELSE 0 END) AS repeat_customers,
         ROUND(100.0 * SUM(CASE WHEN order_count > 1 THEN 1 ELSE 0 END) / COUNT(*), 2) AS repeat_purchase_rate_pct
  FROM customer_orders
) TO 'exports/repeat_customers.csv' (HEADER, DELIMITER ',');
