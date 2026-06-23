-- Revenue and customers by state
SELECT
  c.customer_state AS state,
  COUNT(DISTINCT c.customer_unique_id) AS customers,
  COUNT(DISTINCT o.order_id) AS orders,
  ROUND(SUM(oi.price), 2) AS revenue
FROM order_items oi
INNER JOIN orders o ON o.order_id = oi.order_id AND o.order_status = 'delivered'
INNER JOIN customers c ON c.customer_id = o.customer_id
GROUP BY c.customer_state
ORDER BY revenue DESC;
