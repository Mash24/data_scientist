"""
Olist analysis pipeline — stdlib only (no pip install).
Usage: python scripts/run_pipeline.py
"""
from __future__ import annotations

import csv
import json
from collections import defaultdict
from datetime import datetime, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "data" / "raw"
EXPORTS = ROOT / "exports"
INSIGHTS = ROOT / "insights.json"


def read_csv(name: str) -> list[dict[str, str]]:
    path = RAW / name
    with path.open(encoding="utf-8-sig", newline="") as f:
        return list(csv.DictReader(f))


def parse_ts(value: str) -> datetime | None:
    if not value:
        return None
    return datetime.fromisoformat(value.replace(" ", "T"))


def write_csv(path: Path, rows: list[dict], fieldnames: list[str]) -> None:
    with path.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def main() -> None:
    EXPORTS.mkdir(parents=True, exist_ok=True)

    orders = {r["order_id"]: r for r in read_csv("olist_orders_dataset.csv")}
    items = read_csv("olist_order_items_dataset.csv")
    products = {r["product_id"]: r for r in read_csv("olist_products_dataset.csv")}
    customers = {r["customer_id"]: r for r in read_csv("olist_customers_dataset.csv")}
    payments = read_csv("olist_order_payments_dataset.csv")
    reviews = {r["order_id"]: r for r in read_csv("olist_order_reviews_dataset.csv")}
    cat_map = {
        r["product_category_name"]: r["product_category_name_english"]
        for r in read_csv("product_category_name_translation.csv")
    }

    delivered_items = []
    for row in items:
        order = orders.get(row["order_id"])
        if not order or order["order_status"] != "delivered":
            continue
        price = float(row["price"])
        delivered_items.append(
            {
                "order_id": row["order_id"],
                "price": price,
                "product_id": row["product_id"],
                "customer_id": order["customer_id"],
                "purchase_at": parse_ts(order["order_purchase_timestamp"]),
                "delivered_at": parse_ts(order.get("order_delivered_customer_date") or ""),
            }
        )

    # Monthly revenue
    order_month_rev: dict[str, dict[str, float]] = defaultdict(lambda: defaultdict(float))
    for row in delivered_items:
        month = row["purchase_at"].strftime("%Y-%m-01")
        order_month_rev[month][row["order_id"]] += row["price"]

    monthly_rows = []
    for month in sorted(order_month_rev):
        order_ids = order_month_rev[month]
        revenue = sum(order_ids.values())
        count = len(order_ids)
        monthly_rows.append(
            {
                "order_month": month,
                "orders": count,
                "revenue": round(revenue, 2),
                "avg_order_value": round(revenue / count, 2),
            }
        )
    write_csv(
        EXPORTS / "monthly_revenue.csv",
        monthly_rows,
        ["order_month", "orders", "revenue", "avg_order_value"],
    )

    # Categories
    cat_stats: dict[str, dict] = defaultdict(lambda: {"orders": set(), "revenue": 0.0})
    for row in delivered_items:
        product = products.get(row["product_id"], {})
        raw_cat = product.get("product_category_name", "unknown")
        category = cat_map.get(raw_cat, raw_cat)
        cat_stats[category]["orders"].add(row["order_id"])
        cat_stats[category]["revenue"] += row["price"]

    category_rows = sorted(
        [
            {
                "category": cat,
                "orders": len(v["orders"]),
                "revenue": round(v["revenue"], 2),
            }
            for cat, v in cat_stats.items()
        ],
        key=lambda x: x["revenue"],
        reverse=True,
    )
    write_csv(EXPORTS / "category_revenue.csv", category_rows, ["category", "orders", "revenue"])

    # States
    state_stats: dict[str, dict] = defaultdict(
        lambda: {"customers": set(), "orders": set(), "revenue": 0.0}
    )
    for row in delivered_items:
        customer = customers.get(row["customer_id"], {})
        state = customer.get("customer_state", "??")
        uid = customer.get("customer_unique_id", row["customer_id"])
        state_stats[state]["customers"].add(uid)
        state_stats[state]["orders"].add(row["order_id"])
        state_stats[state]["revenue"] += row["price"]

    state_rows = sorted(
        [
            {
                "state": state,
                "customers": len(v["customers"]),
                "orders": len(v["orders"]),
                "revenue": round(v["revenue"], 2),
            }
            for state, v in state_stats.items()
        ],
        key=lambda x: x["revenue"],
        reverse=True,
    )
    write_csv(
        EXPORTS / "state_revenue.csv",
        state_rows,
        ["state", "customers", "orders", "revenue"],
    )

    # Repeat customers
    customer_orders: dict[str, set[str]] = defaultdict(set)
    for row in delivered_items:
        uid = customers.get(row["customer_id"], {}).get(
            "customer_unique_id", row["customer_id"]
        )
        customer_orders[uid].add(row["order_id"])

    total_customers = len(customer_orders)
    repeat_customers = sum(1 for orders_set in customer_orders.values() if len(orders_set) > 1)
    repeat_rate = round(100.0 * repeat_customers / total_customers, 2) if total_customers else 0
    write_csv(
        EXPORTS / "repeat_customers.csv",
        [
            {
                "total_customers": total_customers,
                "repeat_customers": repeat_customers,
                "repeat_purchase_rate_pct": repeat_rate,
            }
        ],
        ["total_customers", "repeat_customers", "repeat_purchase_rate_pct"],
    )

    # Churn proxy
    last_purchase: dict[str, datetime] = {}
    for row in delivered_items:
        uid = customers.get(row["customer_id"], {}).get(
            "customer_unique_id", row["customer_id"]
        )
        ts = row["purchase_at"]
        if uid not in last_purchase or ts > last_purchase[uid]:
            last_purchase[uid] = ts
    dataset_end = max(last_purchase.values())
    at_risk = sum(1 for ts in last_purchase.values() if ts < dataset_end - timedelta(days=90))
    churn_pct = round(100.0 * at_risk / len(last_purchase), 2)

    # Payments
    pay_stats: dict[str, float] = defaultdict(float)
    for row in payments:
        pay_stats[row["payment_type"]] += float(row["payment_value"])
    pay_total = sum(pay_stats.values())
    payment_rows = sorted(
        [
            {
                "payment_type": k,
                "total_payment_value": round(v, 2),
                "pct_of_value": round(100.0 * v / pay_total, 2),
            }
            for k, v in pay_stats.items()
        ],
        key=lambda x: x["total_payment_value"],
        reverse=True,
    )
    write_csv(
        EXPORTS / "payment_mix.csv",
        payment_rows,
        ["payment_type", "total_payment_value", "pct_of_value"],
    )

    # Reviews vs delivery
    bucket_labels = ["0-7 days", "8-14 days", "15-21 days", "22+ days"]
    bucket_reviews: dict[str, list[int]] = {b: [] for b in bucket_labels}
    seen_orders: set[str] = set()
    for row in delivered_items:
        oid = row["order_id"]
        if oid in seen_orders or not row["delivered_at"]:
            continue
        seen_orders.add(oid)
        review = reviews.get(oid)
        if not review:
            continue
        days = (row["delivered_at"] - row["purchase_at"]).days
        if days <= 7:
            bucket = bucket_labels[0]
        elif days <= 14:
            bucket = bucket_labels[1]
        elif days <= 21:
            bucket = bucket_labels[2]
        else:
            bucket = bucket_labels[3]
        bucket_reviews[bucket].append(int(float(review["review_score"])))

    review_rows = []
    for bucket in bucket_labels:
        scores = bucket_reviews[bucket]
        if not scores:
            continue
        review_rows.append(
            {
                "delivery_bucket": bucket,
                "reviews": len(scores),
                "avg_review_score": round(sum(scores) / len(scores), 2),
            }
        )
    write_csv(
        EXPORTS / "reviews_vs_delivery.csv",
        review_rows,
        ["delivery_bucket", "reviews", "avg_review_score"],
    )

    total_revenue = sum(r["revenue"] for r in monthly_rows)
    total_orders = sum(r["orders"] for r in monthly_rows)

    insights = {
        "total_revenue": round(total_revenue, 2),
        "total_orders": total_orders,
        "avg_order_value": round(total_revenue / total_orders, 2) if total_orders else 0,
        "top_states": state_rows[:3],
        "top_categories": category_rows[:3],
        "repeat_purchase_rate_pct": repeat_rate,
        "customers_at_risk_pct": churn_pct,
        "top_payment_type": payment_rows[0]["payment_type"],
        "top_payment_pct": payment_rows[0]["pct_of_value"],
        "reviews_by_delivery": review_rows,
    }
    INSIGHTS.write_text(json.dumps(insights, indent=2), encoding="utf-8")

    print("Exports written to", EXPORTS)
    print(json.dumps(insights, indent=2))


if __name__ == "__main__":
    main()
