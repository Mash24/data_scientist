export default {
  sections: [
    {
      id: 'context',
      title: 'Business context',
      body: `
        <p>This case study focuses on a learning platform serving multiple schools, where administrators and operators need a reliable view of <strong>active users</strong>, <strong>course engagement</strong>, and <strong>school-level usage patterns</strong>.</p>
        <p>The business need was to move from raw transactional records toward dashboard-ready reporting that can answer practical questions: which schools are active, which courses are being used, and where adoption or engagement is slowing down.</p>
      `,
    },
    {
      id: 'data',
      title: 'Data sources & grain',
      body: `
        <ul>
          <li><strong>Users</strong> — learner and admin accounts, school mapping, registration dates</li>
          <li><strong>Courses</strong> — course metadata, school assignment, ownership</li>
          <li><strong>Activity logs</strong> — login activity, lesson access, completion events</li>
          <li><strong>School dimension</strong> — school grouping for operational reporting</li>
        </ul>
        <p><strong>Grain:</strong> daily user activity and course interactions rolled into weekly and monthly reporting layers for WAU / MAU, engagement, and school comparisons.</p>
      `,
    },
    {
      id: 'approach',
      title: 'Approach',
      body: `
        <ol>
          <li>Defined core KPIs for platform operations: active users, engagement rate, course usage, and school-level adoption.</li>
          <li>Structured SQL queries for per-school and per-course rollups using PostgreSQL as the reporting layer.</li>
          <li>Separated user, course, and school dimensions so dashboard filters stay consistent.</li>
          <li>Prepared visual outputs for leadership and school admins who need fast, operational reporting rather than exploratory notebooks.</li>
        </ol>
      `,
    },
    {
      id: 'insights',
      title: 'Key insights',
      body: `
        <ul>
          <li><strong>Adoption visibility:</strong> school-level rollups make it easier to identify underused schools before they become churn risks.</li>
          <li><strong>Engagement tracking:</strong> WAU / MAU is more useful when paired with course interaction depth, not just login counts.</li>
          <li><strong>Operational reporting:</strong> leaders need a short list of trusted KPIs rather than fragmented spreadsheets from multiple teams.</li>
          <li><strong>Reusable reporting layer:</strong> consistent SQL definitions reduce rework whenever a new dashboard or stakeholder request appears.</li>
        </ul>
      `,
    },
    {
      id: 'deliverables',
      title: 'Deliverables',
      body: `
        <ul>
          <li>Platform KPI definitions for active users, engagement, and school reporting</li>
          <li>SQL reporting layer for school, course, and user rollups</li>
          <li>Dashboard-ready outputs for operational BI and leadership updates</li>
          <li>Reporting structure suitable for Looker Studio or Power BI delivery</li>
        </ul>
        <p>This case study is also <strong>in progress</strong>; the write-up is now available, while the polished public dashboard screenshots are the remaining step.</p>
      `,
    },
  ],
};
