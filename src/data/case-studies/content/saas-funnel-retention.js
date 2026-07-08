export default {
  sections: [
    {
      id: 'context',
      title: 'Business context',
      body: `
        <p>This case study is framed around a SaaS product with a multi-step onboarding flow and recurring usage after activation. The business question was not just <strong>how many users sign up</strong>, but <strong>where qualified users drop off</strong> and which acquisition sources produce better downstream retention.</p>
        <p>The goal was to define a reusable metric layer for funnel conversion and cohort retention so product, growth, and leadership teams could use the same definitions in dashboards and weekly reporting.</p>
      `,
    },
    {
      id: 'data',
      title: 'Data sources & grain',
      body: `
        <ul>
          <li><strong>User table</strong> — user id, signup date, acquisition channel, account metadata</li>
          <li><strong>Event stream</strong> — onboarding events, feature usage, activation milestones</li>
          <li><strong>Session data</strong> — visit dates and engagement frequency</li>
          <li><strong>Subscription / billing state</strong> — plan type, paid conversion, churn flags</li>
        </ul>
        <p><strong>Grain:</strong> user-level cohort definitions plus event-level funnel steps. The key challenge was making sure step conversion and retention metrics were calculated from a consistent source of truth rather than ad hoc dashboard formulas.</p>
      `,
    },
    {
      id: 'approach',
      title: 'Approach',
      body: `
        <ol>
          <li>Mapped the onboarding journey into named funnel stages: signup, workspace setup, first core action, activation, and repeat usage.</li>
          <li>Designed SQL transformations to assign each user to a single acquisition channel and first-seen cohort month.</li>
          <li>Built retention logic using cohort tables so week-1, week-4, and month-over-month comparisons used stable definitions.</li>
          <li>Prepared BI-ready outputs for funnel visuals, cohort heatmaps, and channel comparison dashboards.</li>
        </ol>
      `,
    },
    {
      id: 'insights',
      title: 'Key insights',
      body: `
        <ul>
          <li><strong>Funnel drop-off:</strong> early onboarding completion is usually the sharpest point of loss, so activation metrics matter more than top-of-funnel signup volume alone.</li>
          <li><strong>Channel quality:</strong> acquisition sources should be compared on activation and retention, not just first-touch signups.</li>
          <li><strong>Cohort clarity:</strong> product teams make better prioritization decisions when each cohort is measured against the same activation and retention definitions.</li>
          <li><strong>Metric consistency:</strong> documented SQL transformations reduce reporting drift between product, growth, and leadership views.</li>
        </ul>
      `,
    },
    {
      id: 'deliverables',
      title: 'Deliverables',
      body: `
        <ul>
          <li>Documented funnel-step definitions and cohort logic</li>
          <li>SQL models for onboarding conversion and retention reporting</li>
          <li>Dashboard-ready tables for channel, funnel, and cohort analysis</li>
          <li>BI design direction for an executive funnel + retention dashboard</li>
        </ul>
        <p>This case study is still marked <strong>in progress</strong> because the public dashboard and final screenshots are not yet embedded, but the analytics framing and metric design are already defined.</p>
      `,
    },
  ],
};
