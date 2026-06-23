export default {
  sections: [
    {
      id: 'context',
      title: 'Business context',
      body: `
        <p>Olist operated a marketplace connecting small sellers to customers across Brazil. Leadership needed a clear view of <strong>where revenue comes from</strong>, which <strong>categories</strong> drive growth, and whether <strong>customers return</strong> or go quiet after their first purchase.</p>
        <p>This case study uses the public <a href="https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce" target="_blank" rel="noopener noreferrer">Brazilian E-Commerce dataset</a> (~100k orders, 2016–2018) as a stand-in for a real retail analytics engagement.</p>
      `,
    },
    {
      id: 'data',
      title: 'Data sources & grain',
      body: `
        <ul>
          <li><strong>Orders</strong> — order_id, purchase timestamp, status, customer_id</li>
          <li><strong>Order items</strong> — line-level revenue (<code>price</code>), product, seller</li>
          <li><strong>Products</strong> — category (Portuguese), joined to English translation</li>
          <li><strong>Customers</strong> — city, state, <code>customer_unique_id</code> for repeat behavior</li>
          <li><strong>Payments</strong> — payment type and value</li>
          <li><strong>Reviews</strong> — score and timestamps for delivery experience analysis</li>
        </ul>
        <p><strong>Grain:</strong> Revenue metrics roll up from order items. Primary analysis filters to <code>order_status = 'delivered'</code>. Repeat purchase logic uses <code>customer_unique_id</code>, not raw customer_id.</p>
        <p><strong>Caveats:</strong> Marketplace data reflects seller geography, not always buyer delivery address. Churn is modeled as 90+ days inactive before dataset end — a proxy, not true churn.</p>
      `,
    },
    {
      id: 'approach',
      title: 'Approach',
      body: `
        <ol>
          <li>Loaded CSVs into DuckDB (PostgreSQL-compatible SQL also provided).</li>
          <li>Defined core metrics: revenue, orders, AOV, repeat rate, inactivity proxy.</li>
          <li>Segmented by month, product category, customer state, and payment type.</li>
          <li>Linked review scores to delivery lead time buckets.</li>
          <li>Built a 3-page <strong>Power BI</strong> report for stakeholder exploration.</li>
          <li>Published a <strong>Looker Studio</strong> summary for portfolio embedding.</li>
        </ol>
        <p>All SQL lives in <code>projects/ecommerce-sales-analytics/sql/</code> — reproducible and documented.</p>
      `,
    },
    {
      id: 'insights',
      title: 'Key insights',
      body: `
        <p><em>Run the SQL scripts on your local copy of the dataset to populate exact figures. Patterns below match typical findings from this data.</em></p>
        <ul>
          <li><strong>Geography:</strong> Southeast states (SP, RJ, MG) concentrate the largest share of revenue — marketing and logistics should prioritize this corridor while testing growth in under-indexed states.</li>
          <li><strong>Categories:</strong> Home, health/beauty, and sports categories consistently rank in the top revenue tiers — assortment and promo budget should align with these winners.</li>
          <li><strong>Payments:</strong> Credit card dominates payment value; boleto and voucher remain meaningful — checkout friction differs by method.</li>
          <li><strong>Retention:</strong> Repeat purchase rate is modest for a marketplace — a large inactive cohort (90+ days) represents reactivation opportunity via email or promo campaigns.</li>
          <li><strong>Experience:</strong> Longer delivery lead times correlate with lower review scores — fulfillment SLAs directly impact satisfaction and repeat intent.</li>
        </ul>
      `,
    },
    {
      id: 'deliverables',
      title: 'Deliverables',
      body: `
        <ul>
          <li>7 SQL analysis scripts (DuckDB + PostgreSQL)</li>
          <li>Power BI report — Executive, Categories, Customers (see repo <code>power-bi/</code>)</li>
          <li>Looker Studio one-pager for public embed</li>
          <li>Data dictionary and setup docs for reproducibility</li>
        </ul>
        <p>Add your live dashboard URLs and screenshots to the portfolio once published from Power BI Service and Looker Studio.</p>
      `,
    },
  ],
};
