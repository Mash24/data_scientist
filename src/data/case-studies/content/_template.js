/**
 * Template for case study content modules.
 * Copy this file when starting a real project: content/{slug}.js
 */
export default {
  sections: [
    {
      id: 'context',
      title: 'Business context',
      body: '<p>Replace with the stakeholder problem, company context, and why this analysis mattered.</p>',
    },
    {
      id: 'data',
      title: 'Data sources',
      body: '<p>Describe tables, grain, date range, and data quality caveats.</p>',
    },
    {
      id: 'approach',
      title: 'Approach',
      body: '<p>Explain SQL logic, modeling choices, and statistical methods if any.</p>',
    },
    {
      id: 'insights',
      title: 'Key insights',
      body: '<ul><li>Insight one</li><li>Insight two</li><li>Insight three</li></ul>',
    },
    {
      id: 'deliverables',
      title: 'Deliverables',
      body: '<p>Link or embed dashboard screenshots, notebooks, and documentation.</p>',
    },
  ],
};
