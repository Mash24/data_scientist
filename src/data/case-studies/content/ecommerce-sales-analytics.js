export default {
  sections: [
    {
      id: 'context',
      title: 'Business context',
      body: `
        <p>Olist operated a marketplace connecting small sellers to customers across Brazil. Leadership needed a clear view of <strong>where revenue comes from</strong>, which <strong>categories</strong> drive growth, and whether <strong>customers return</strong> or go quiet after their first purchase.</p>
        <p>This case study uses the public <a href="https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce" target="_blank" rel="noopener noreferrer">Brazilian E-Commerce dataset</a> (96,478 delivered orders, 2016–2018). Analysis was run with reproducible SQL logic and a Python export pipeline.</p>
      `,
    },
    {
      id: 'data',
      title: 'Data sources & grain',
      body: `
        <ul>
          <li><strong>Orders</strong> — order_id, purchase timestamp, status, customer_id</li>
          <li><strong>Order items</strong> — line-level revenue (<code>price</code>)</li>
          <li><strong>Products</strong> — category joined to English translation</li>
          <li><strong>Customers</strong> — state, <code>customer_unique_id</code> for repeat behavior</li>
          <li><strong>Payments</strong> — payment type and value</li>
          <li><strong>Reviews</strong> — score linked to delivery lead time</li>
        </ul>
        <p><strong>Scope:</strong> Delivered orders only. Total revenue analyzed: <strong>R$ 13.22M</strong> across <strong>96,478 orders</strong> (AOV <strong>R$ 137.04</strong>).</p>
      `,
    },
    {
      id: 'approach',
      title: 'Approach',
      body: `
        <ol>
          <li>Loaded 7 Olist CSV tables from the public dataset mirror.</li>
          <li>Ran documented SQL (DuckDB/PostgreSQL) plus a stdlib Python pipeline (<code>scripts/run_pipeline.py</code>).</li>
          <li>Exported BI-ready aggregates to <code>exports/</code> for Power BI and Looker Studio.</li>
          <li>Built stakeholder dashboards (Power BI 3-page report + Looker Studio summary).</li>
        </ol>
      `,
    },
    {
      id: 'insights',
      title: 'Key insights',
      body: `
        <ul>
          <li><strong>Geography:</strong> São Paulo (SP) alone drives <strong>R$ 5.07M</strong> in revenue — 38% of analyzed sales. RJ and MG follow (R$ 1.76M and R$ 1.55M). National campaigns should overweight the Southeast corridor.</li>
          <li><strong>Categories:</strong> Top revenue categories are <strong>health_beauty</strong> (R$ 1.23M), <strong>watches_gifts</strong> (R$ 1.17M), and <strong>bed_bath_table</strong> (R$ 1.02M). Promo and assortment should anchor on these winners.</li>
          <li><strong>Payments:</strong> <strong>Credit card</strong> accounts for <strong>78.3%</strong> of payment value — checkout and installment UX for card users is critical.</li>
          <li><strong>Retention:</strong> Repeat purchase rate is only <strong>3.0%</strong> — typical marketplace leakage. <strong>80.2%</strong> of customers show 90+ day inactivity before dataset end → large reactivation opportunity.</li>
          <li><strong>Delivery experience:</strong> Avg review score drops from <strong>4.41</strong> (0–7 day delivery) to <strong>3.01</strong> (22+ days). Fulfillment SLAs directly impact satisfaction and likely repeat intent.</li>
        </ul>
      `,
    },
    {
      id: 'deliverables',
      title: 'Deliverables',
      body: `
        <ul>
          <li>7 SQL analysis scripts + Python pipeline with <code>insights.json</code></li>
          <li>CSV exports: monthly revenue, categories, states, payments, repeat rate, reviews</li>
          <li>Power BI — Executive, Categories, Customers (import from <code>exports/</code>)</li>
          <li>Looker Studio — public embed from same exports</li>
        </ul>
      `,
    },
  ],
};
