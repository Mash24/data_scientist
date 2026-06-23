-- Review score vs delivery lead time (days)
WITH delivery AS (
  SELECT
    o.order_id,
    DATE_DIFF(
      'day',
      CAST(o.order_purchase_timestamp AS TIMESTAMP),
      CAST(o.order_delivered_customer_date AS TIMESTAMP)
    ) AS delivery_days
  FROM orders o
  WHERE o.order_status = 'delivered'
    AND o.order_delivered_customer_date IS NOT NULL
)
SELECT
  CASE
    WHEN d.delivery_days <= 7 THEN '0-7 days'
    WHEN d.delivery_days <= 14 THEN '8-14 days'
    WHEN d.delivery_days <= 21 THEN '15-21 days'
    ELSE '22+ days'
  END AS delivery_bucket,
  COUNT(*) AS reviews,
  ROUND(AVG(r.review_score), 2) AS avg_review_score
FROM delivery d
INNER JOIN order_reviews r ON r.order_id = d.order_id
GROUP BY 1
ORDER BY MIN(d.delivery_days);
