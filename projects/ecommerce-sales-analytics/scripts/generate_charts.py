"""
Generate SVG chart images from exports/ for the portfolio (stdlib only).
Usage: python scripts/generate_charts.py
"""
from __future__ import annotations

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
EXPORTS = ROOT / "exports"
INSIGHTS = ROOT / "insights.json"
OUT = ROOT.parent.parent / "public" / "images" / "case-studies" / "ecommerce"

BRAND = "#059669"
BRAND_LIGHT = "#d1fae5"
SLATE = "#334155"
MUTED = "#64748b"
GRID = "#e2e8f0"
BG = "#ffffff"


def read_csv(name: str) -> list[dict[str, str]]:
    with (EXPORTS / name).open(encoding="utf-8-sig", newline="") as f:
        return list(csv.DictReader(f))


def svg_header(w: int, h: int) -> str:
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
        f'role="img" font-family="system-ui,Segoe UI,sans-serif">'
        f'<rect width="100%" height="100%" fill="{BG}"/>'
    )


def svg_footer() -> str:
    return "</svg>"


def title_block(title: str, subtitle: str = "", y: int = 36) -> str:
    parts = [
        f'<text x="40" y="{y}" fill="{SLATE}" font-size="20" font-weight="700">{title}</text>'
    ]
    if subtitle:
        parts.append(
            f'<text x="40" y="{y + 22}" fill="{MUTED}" font-size="13">{subtitle}</text>'
        )
    return "\n".join(parts)


def revenue_trend() -> str:
    rows = [r for r in read_csv("monthly_revenue.csv") if r["order_month"] >= "2017-01-01"]
    w, h = 900, 420
    pad_l, pad_r, pad_t, pad_b = 70, 30, 80, 60
    chart_w = w - pad_l - pad_r
    chart_h = h - pad_t - pad_b
    values = [float(r["revenue"]) for r in rows]
    vmax = max(values)
    n = len(values)

    lines = [svg_header(w, h), title_block("Monthly revenue trend", "Olist delivered orders · BRL", 40)]

    y0 = pad_t + chart_h
    lines.append(f'<line x1="{pad_l}" y1="{y0}" x2="{w - pad_r}" y2="{y0}" stroke="{GRID}" stroke-width="1"/>')

    points = []
    for i, row in enumerate(rows):
        x = pad_l + (i / max(n - 1, 1)) * chart_w
        y = pad_t + chart_h - (float(row["revenue"]) / vmax) * chart_h
        points.append(f"{x:.1f},{y:.1f}")
        if i % 3 == 0:
            label = row["order_month"][:7]
            lines.append(
                f'<text x="{x:.1f}" y="{h - 20}" fill="{MUTED}" font-size="10" '
                f'text-anchor="middle">{label}</text>'
            )

    lines.append(
        f'<polyline fill="none" stroke="{BRAND}" stroke-width="3" '
        f'points="{" ".join(points)}"/>'
    )
    area = f'{pad_l},{y0} ' + " ".join(points) + f' {pad_l + chart_w},{y0}'
    lines.append(f'<polygon fill="{BRAND}" fill-opacity="0.12" points="{area}"/>')
    lines.append(
        f'<text x="{pad_l - 10}" y="{pad_t + 10}" fill="{MUTED}" font-size="11" '
        f'text-anchor="end">R$ {vmax/1e6:.1f}M</text>'
    )
    lines.append(svg_footer())
    return "\n".join(lines)


def horizontal_bars(rows: list[dict], label_key: str, value_key: str, title: str, subtitle: str, fmt) -> str:
    w, h = 900, 460
    pad = 40
    bar_h = 28
    gap = 10
    max_val = max(float(r[value_key]) for r in rows)

    lines = [svg_header(w, h), title_block(title, subtitle, 36)]
    y = 90
    for row in rows:
        val = float(row[value_key])
        bw = (val / max_val) * (w - pad * 2 - 220)
        label = row[label_key].replace("_", " ")[:22]
        lines.append(f'<text x="{pad}" y="{y + 18}" fill="{SLATE}" font-size="13">{label}</text>')
        lines.append(
            f'<rect x="{220}" y="{y}" width="{bw:.1f}" height="{bar_h}" rx="6" fill="{BRAND}"/>'
        )
        lines.append(
            f'<text x="{230 + bw:.1f}" y="{y + 19}" fill="{SLATE}" font-size="12" '
            f'font-weight="600">{fmt(val)}</text>'
        )
        y += bar_h + gap
    lines.append(svg_footer())
    return "\n".join(lines)


def category_chart() -> str:
    rows = read_csv("category_revenue.csv")[:8]
    return horizontal_bars(
        rows, "category", "revenue", "Top categories by revenue", "Delivered order items", lambda v: f"R$ {v/1e6:.2f}M"
    )


def state_chart() -> str:
    rows = read_csv("state_revenue.csv")[:8]
    return horizontal_bars(
        rows, "state", "revenue", "Revenue by state", "Top Brazilian states", lambda v: f"R$ {v/1e6:.2f}M"
    )


def reviews_chart() -> str:
    rows = read_csv("reviews_vs_delivery.csv")
    w, h = 900, 400
    pad_l, pad_t, chart_w, chart_h = 70, 80, 760, 260
    lines = [svg_header(w, h), title_block("Review score vs delivery time", "Lower scores when delivery exceeds 21 days", 40)]
    vmax = 5
    bar_w = chart_w / len(rows) - 20
    y0 = pad_t + chart_h

    for i, row in enumerate(rows):
        score = float(row["avg_review_score"])
        x = pad_l + i * (chart_w / len(rows)) + 10
        bh = (score / vmax) * chart_h
        y = y0 - bh
        lines.append(f'<rect x="{x:.0f}" y="{y:.0f}" width="{bar_w:.0f}" height="{bh:.0f}" rx="8" fill="{BRAND}"/>')
        lines.append(
            f'<text x="{x + bar_w/2:.0f}" y="{y - 8}" fill="{SLATE}" font-size="14" '
            f'font-weight="700" text-anchor="middle">{score}</text>'
        )
        lines.append(
            f'<text x="{x + bar_w/2:.0f}" y="{y0 + 22}" fill="{MUTED}" font-size="11" '
            f'text-anchor="middle">{row["delivery_bucket"]}</text>'
        )
    lines.append(svg_footer())
    return "\n".join(lines)


def executive_summary() -> str:
    data = json.loads(INSIGHTS.read_text(encoding="utf-8"))
    w, h = 900, 520
    lines = [
        svg_header(w, h),
        title_block("Executive summary", "E-commerce sales & customer insights · Olist", 40),
        f'<rect x="40" y="90" width="820" height="390" rx="16" fill="#f8fafc" stroke="{GRID}"/>',
    ]
    kpis = [
        ("Total revenue", f"R$ {data['total_revenue']/1e6:.2f}M"),
        ("Orders", f"{data['total_orders']:,}"),
        ("Avg order value", f"R$ {data['avg_order_value']:.2f}"),
        ("Repeat rate", f"{data['repeat_purchase_rate_pct']}%"),
    ]
    x = 60
    for label, value in kpis:
        lines.append(f'<rect x="{x}" y="110" width="185" height="90" rx="12" fill="{BG}" stroke="{GRID}"/>')
        lines.append(f'<text x="{x + 16}" y="140" fill="{MUTED}" font-size="12">{label}</text>')
        lines.append(
            f'<text x="{x + 16}" y="172" fill="{SLATE}" font-size="22" font-weight="700">{value}</text>'
        )
        x += 200

    lines.append(
        f'<text x="60" y="240" fill="{SLATE}" font-size="15" font-weight="600">Key takeaways</text>'
    )
    takeaways = [
        f"SP leads with R$ {data['top_states'][0]['revenue']/1e6:.2f}M ({100*data['top_states'][0]['revenue']/data['total_revenue']:.0f}% of revenue)",
        f"Top category: {data['top_categories'][0]['category'].replace('_', ' ')}",
        f"{data['top_payment_pct']}% of payments via {data['top_payment_type'].replace('_', ' ')}",
        f"{data['customers_at_risk_pct']}% of customers inactive 90+ days",
    ]
    y = 268
    for t in takeaways:
        lines.append(f'<circle cx="68" cy="{y - 4}" r="4" fill="{BRAND}"/>')
        lines.append(f'<text x="82" y="{y}" fill="{SLATE}" font-size="14">{t}</text>')
        y += 32

    lines.append(
        f'<text x="60" y="430" fill="{MUTED}" font-size="12">'
        "Charts generated from SQL pipeline · Power BI report can be added later"
        "</text>"
    )
    lines.append(svg_footer())
    return "\n".join(lines)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    charts = {
        "revenue-trend.svg": revenue_trend(),
        "top-categories.svg": category_chart(),
        "revenue-by-state.svg": state_chart(),
        "reviews-vs-delivery.svg": reviews_chart(),
        "executive-summary.svg": executive_summary(),
    }
    for name, content in charts.items():
        (OUT / name).write_text(content, encoding="utf-8")
        print("Wrote", OUT / name)


if __name__ == "__main__":
    main()
