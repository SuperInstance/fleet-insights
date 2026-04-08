export interface Env {
  AI: any;
}

interface FleetData {
  timestamp: string;
  vehicleCount: number;
  operationalRate: number;
  fuelEfficiency: number;
  maintenanceCost: number;
  distanceTraveled: number;
  region: string;
}

interface Insight {
  id: string;
  title: string;
  description: string;
  category: 'health' | 'growth' | 'optimization' | 'anomaly';
  priority: 'low' | 'medium' | 'high';
  recommendation?: string;
  timestamp: string;
}

interface Trend {
  period: string;
  vehicleGrowth: number;
  efficiencyTrend: number;
  costTrend: number;
  utilizationRate: number;
}

interface Anomaly {
  id: string;
  vehicleId: string;
  type: 'fuel' | 'maintenance' | 'usage' | 'performance';
  severity: 'low' | 'medium' | 'high';
  description: string;
  detectedAt: string;
  resolved: boolean;
}

const generateMockData = (): {
  insights: Insight[];
  trends: Trend[];
  anomalies: Anomaly[];
} => {
  const insights: Insight[] = [
    {
      id: 'ins-001',
      title: 'Fuel Efficiency Decline',
      description: 'Average fuel efficiency decreased by 8% in the Northwest region',
      category: 'health',
      priority: 'high',
      recommendation: 'Schedule maintenance checks for vehicles NW-101 through NW-125',
      timestamp: new Date().toISOString()
    },
    {
      id: 'ins-002',
      title: 'Optimal Fleet Expansion Window',
      description: 'Analysis suggests Q3 is the optimal time for fleet expansion based on seasonal demand',
      category: 'growth',
      priority: 'medium',
      recommendation: 'Consider adding 5-7 vehicles in September',
      timestamp: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: 'ins-003',
      title: 'Route Optimization Opportunity',
      description: '23% of routes have suboptimal sequencing causing increased fuel consumption',
      category: 'optimization',
      priority: 'medium',
      recommendation: 'Implement dynamic routing algorithm for urban deliveries',
      timestamp: new Date(Date.now() - 172800000).toISOString()
    }
  ];

  const trends: Trend[] = [
    {
      period: 'Last 30 Days',
      vehicleGrowth: 12.5,
      efficiencyTrend: -2.3,
      costTrend: 4.1,
      utilizationRate: 78.4
    },
    {
      period: 'Last Quarter',
      vehicleGrowth: 28.7,
      efficiencyTrend: 1.2,
      costTrend: 8.9,
      utilizationRate: 82.1
    },
    {
      period: 'Year to Date',
      vehicleGrowth: 42.3,
      efficiencyTrend: 3.4,
      costTrend: 12.5,
      utilizationRate: 85.7
    }
  ];

  const anomalies: Anomaly[] = [
    {
      id: 'ano-001',
      vehicleId: 'VH-7892',
      type: 'fuel',
      severity: 'high',
      description: 'Fuel consumption 45% above expected range for vehicle class',
      detectedAt: new Date(Date.now() - 3600000).toISOString(),
      resolved: false
    },
    {
      id: 'ano-002',
      vehicleId: 'VH-4521',
      type: 'maintenance',
      severity: 'medium',
      description: 'Brake wear detected at 85% threshold, 2000km ahead of schedule',
      detectedAt: new Date(Date.now() - 7200000).toISOString(),
      resolved: true
    },
    {
      id: 'ano-003',
      vehicleId: 'VH-3367',
      type: 'performance',
      severity: 'low',
      description: 'Idle time increased by 22% compared to fleet average',
      detectedAt: new Date(Date.now() - 10800000).toISOString(),
      resolved: false
    }
  ];

  return { insights, trends, anomalies };
};

const generateHTML = (path: string): string => {
  const { insights, trends, anomalies } = generateMockData();
  
  const insightsHTML = insights.map(insight => `
    <div class="insight-card" data-category="${insight.category}">
      <div class="insight-header">
        <span class="insight-category">${insight.category}</span>
        <span class="insight-priority ${insight.priority}">${insight.priority}</span>
      </div>
      <h3>${insight.title}</h3>
      <p>${insight.description}</p>
      ${insight.recommendation ? `<div class="recommendation">${insight.recommendation}</div>` : ''}
      <div class="insight-footer">${new Date(insight.timestamp).toLocaleDateString()}</div>
    </div>
  `).join('');

  const trendsHTML = trends.map(trend => `
    <div class="trend-card">
      <h3>${trend.period}</h3>
      <div class="trend-metrics">
        <div class="metric ${trend.vehicleGrowth > 0 ? 'positive' : 'negative'}">
          <span>Fleet Growth</span>
          <strong>${trend.vehicleGrowth > 0 ? '+' : ''}${trend.vehicleGrowth}%</strong>
        </div>
        <div class="metric ${trend.efficiencyTrend > 0 ? 'positive' : 'negative'}">
          <span>Efficiency</span>
          <strong>${trend.efficiencyTrend > 0 ? '+' : ''}${trend.efficiencyTrend}%</strong>
        </div>
        <div class="metric ${trend.costTrend < 0 ? 'positive' : 'negative'}">
          <span>Cost Trend</span>
          <strong>${trend.costTrend > 0 ? '+' : ''}${trend.costTrend}%</strong>
        </div>
        <div class="metric">
          <span>Utilization</span>
          <strong>${trend.utilizationRate}%</strong>
        </div>
      </div>
    </div>
  `).join('');

  const anomaliesHTML = anomalies.map(anomaly => `
    <div class="anomaly-card ${anomaly.resolved ? 'resolved' : ''}">
      <div class="anomaly-header">
        <span class="vehicle-id">${anomaly.vehicleId}</span>
        <span class="anomaly-type">${anomaly.type}</span>
        <span class="severity ${anomaly.severity}">${anomaly.severity}</span>
        ${anomaly.resolved ? '<span class="resolved-badge">Resolved</span>' : ''}
      </div>
      <p>${anomaly.description}</p>
      <div class="anomaly-footer">
        Detected: ${new Date(anomaly.detectedAt).toLocaleString()}
      </div>
    </div>
  `).join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fleet Insights - AI-Powered Fleet Management</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --dark: #0a0a0f;
      --accent: #10b981;
      --accent-dark: #059669;
      --light: #f8fafc;
      --gray: #64748b;
      --gray-dark: #334155;
      --border: #1e293b;
      --positive: #10b981;
      --negative: #ef4444;
      --warning: #f59e0b;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', sans-serif;
      background-color: var(--dark);
      color: var(--light);
      line-height: 1.6;
      min-height: 100vh;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    header {
      background: linear-gradient(135deg, var(--dark) 0%, #111827 100%);
      border-bottom: 1px solid var(--border);
      padding: 2rem 0;
    }
    
    .hero {
      text-align: center;
      padding: 3rem 0;
    }
    
    .hero h1 {
      font-size: 3.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, var(--accent) 0%, #34d399 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 1rem;
    }
    
    .hero p {
      font-size: 1.25rem;
      color: var(--gray);
      max-width: 600px;
      margin: 0 auto 2rem;
    }
    
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin: 3rem 0;
    }
    
    .feature-card {
      background: rgba(30, 41, 59, 0.5);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.5rem;
      transition: transform 0.3s ease, border-color 0.3s ease;
    }
    
    .feature-card:hover {
      transform: translateY(-4px);
      border-color: var(--accent);
    }
    
    .feature-card h3 {
      color: var(--accent);
      margin-bottom: 0.5rem;
      font-size: 1.25rem;
    }
    
    .feature-card p {
      color: var(--gray);
      font-size: 0.95rem;
    }
    
    .section {
      margin: 4rem 0;
    }
    
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border);
    }
    
    .section-header h2 {
      font-size: 2rem;
      font-weight: 600;
    }
    
    .insights-grid, .trends-grid, .anomalies-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
    }
    
    .insight-card, .trend-card, .anomaly-card {
      background: rgba(30, 41, 59, 0.5);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.5rem;
    }
    
    .insight-header, .anomaly-header {
      display: flex;
      gap: 0.75rem;
      align-items: center;
      margin-bottom: 1rem;
      flex-wrap: wrap;
    }
    
    .insight-category, .anomaly-type {
      background: rgba(16, 185, 129, 0.1);
      color: var(--accent);
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 500;
    }
    
    .insight-priority, .severity {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 500;
    }
    
    .high { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
    .medium { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
    .low { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
    
    .recommendation {
      background: rgba(16, 185, 129, 0.05);
      border-left: 3px solid var(--accent);
      padding: 1rem;
      margin: 1rem 0;
      border-radius: 0 8px 8px 0;
    }
    
    .trend-metrics {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin-top: 1rem;
    }
    
    .metric {
      text-align: center;
      padding: 1rem;
      background: rgba(30, 41, 59, 0.3);
      border-radius: 8px;
    }
    
    .metric span {
      display: block;
      font-size: 0.875rem;
      color: var(--gray);
      margin-bottom: 0.5rem;
    }
    
    .metric strong {
      font-size: 1.5rem;
      font-weight: 600;
    }
    
    .positive { color: var(--positive); }
    .negative { color: var(--negative); }
    
    .resolved-badge {
      background: rgba(16, 185, 129, 0.1);
      color: var(--accent);
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 500;
    }
    
    .resolved {
      opacity: 0.7;
    }
    
    .insight-footer, .anomaly-footer {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border);
      color: var(--gray);
      font-size: 0.875rem;
    }
    
    .endpoints {
      background: rgba(30, 41, 59, 0.3);
      border-radius: 12px;
      padding: 2rem;
      margin: 3rem 0;
    }
    
    .endpoints h3 {
      color: var(--accent);
      margin-bottom: 1.5rem;
    }
    
    .endpoint-list {
      display: grid;
      gap: 1rem;
    }
    
    .endpoint {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: rgba(15, 23, 42, 0.5);
      border-radius: 8px;
      border: 1px solid var(--border);
    }
    
    .method {
      background: var(--accent);
      color: var(--dark);
      padding: 0.25rem 0.75rem;
      border-radius: 6px;
      font-weight: 600;
      font-size: 0.875rem;
    }
    
    .path {
      font-family: 'Monaco', 'Courier New', monospace;
      color: var(--light);
    }
    
    footer {
      background: rgba(15, 23, 42, 0.5);
      border-top: 1px solid var(--border);
      padding: 3rem 0;
      margin-top: 4rem;
    }
    
    .footer-content {
      text-align: center;
    }
    
    .footer-logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--accent);
      margin-bottom: 1rem;
    }
    
    .footer-text {
      color: var(--gray);
      max-width: 600px;
      margin: 0 auto;
    }
    
    @media (max-width: 768px) {
      .hero h1 {
        font-size: 2.5rem;
      }
      
      .insights-grid, .trends-grid, .anomalies-grid {
        grid-template-columns: 1fr;
      }
      
      .trend-metrics {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <div class="hero">
        <h1>Fleet Insights</h1>
        <p>AI-powered insights about fleet health, growth, and optimization. Make data-driven decisions with real-time analytics and predictive recommendations.</p>
      </div>
      
      <div class="features">
        <div class="feature-card">
          <h3>Growth Trends</h3>
          <p>Track fleet expansion, utilization rates, and performance metrics over time.</p>
        </div>
        <div class="feature-card">
          <h3>Health Patterns</h3>
          <p>Monitor vehicle health, maintenance schedules, and operational efficiency.</p>
        </div>
        <div class="feature-card">
          <h3>Optimization</h3>
          <p>Receive AI-powered suggestions for route optimization and cost reduction.</p>
        </div>
        <div class="feature-card">
          <h3>Anomaly Detection</h3>
          <p>Real-time detection of unusual patterns and potential issues in fleet operations.</p>
        </div>
      </div>
    </div>
  </header>
  
  <main class="container">
    <section class="section">
      <div class="section-header">
        <h2>Latest Insights</h2>
        <span class="badge">${insights.length} Active</span>
      </div>
      <div class="insights-grid">
        ${insightsHTML}
      </div>
    </section>
    
    <section class="section">
      <div class="section-header">
        <h2>Growth Trends</h2>
        <span class="badge">Quarterly Analysis</span>
      </div>
      <div class="trends-grid">
        ${trendsHTML}
      </div>
    </section>
    
    <section class="section">
      <div class="section-header">
        <h2>Recent Anomalies</h2>
        <span class="badge">${anomalies.filter(a => !a.resolved).length} Unresolved</span>
      </div>
      <div class="anomalies-grid">
        ${anomaliesHTML}
      </div>
    </section>
    
    <div class="endpoints">
      <h3>API Endpoints</h3>
      <div class="endpoint-list">
        <div class="endpoint">
          <span class="method">GET</span>
          <span class="path">/api/insights</span>
          <span class="desc">Retrieve AI-generated insights</span>
        </div>
        <div class="endpoint">
          <span class="method">GET</span>
          <span class="path">/api/trends</span>
          <span class="desc">Get growth and performance trends</span>
        </div>
        <div class="endpoint">
          <span class="method">GET</span>
          <span class="path">/api/anomalies</span>
          <span class="desc">Fetch detected anomalies</span>
        </div>
        <div class="endpoint">
          <span class="method">GET</span>
          <span class="path">/health</span>
          <span class="desc">Health check endpoint</span>
        </div>
      </div>
    </div>
  </main>
  
  <footer>
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">Fleet Insights</div>
        <p class="footer-text">AI-powered fleet management platform providing real-time insights, predictive analytics, and optimization recommendations for modern fleet operations.</p>
        <p class="footer-text" style="margin-top: 1rem; font-size: 0.875rem; color: #475569;">
          &copy; ${new Date().getFullYear()} Fleet Insights. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</body>
</html>
`;
};
const sh = {"Content-Security-Policy":"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; frame-ancestors 'none'","X-Frame-Options":"DENY"};
export default { async fetch(r: Request) { const u = new URL(r.url); if (u.pathname==='/health') return new Response(JSON.stringify({status:'ok'}),{headers:{'Content-Type':'application/json',...sh}}); return new Response(html,{headers:{'Content-Type':'text/html;charset=UTF-8',...sh}}); }};