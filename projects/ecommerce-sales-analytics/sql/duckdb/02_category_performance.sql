-- Top product categories by revenue (English labels)
SELECT
  COALESCE(ct.product_category_name_english, p.product_category_name) AS category,
  COUNT(DISTINCT oi.order_id) AS orders,
  ROUND(SUM(oi.price), 2) AS revenue,
  ROUND(SUM(oi.price) / COUNT(DISTINCT oi.order_id), 2) AS avg_order_value
FROM order_items oi
INNER JOIN orders o ON o.order_id = oi.order_id AND o.order_status = 'delivered'
INNER JOIN products p ON p.product_id = oi.product_id
LEFT JOIN category_translation ct ON ct.product_category_name = p.product_category_name
GROUP BY 1
ORDER BY revenue DESC
LIMIT 15;
