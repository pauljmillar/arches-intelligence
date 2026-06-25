// Scripted AI response objects. Pattern-match router lives in App.jsx.

export const responses = [
  {
    id: 'comp-sales-drop',
    triggers: ['comp sales', 'sales drop', 'why did', 'sales fall', 'tuesday', 'drop 4'],
    body: 'Comp sales in Germany North fell 4.2% vs. prior Tuesday (Tue Jun 17 vs. Tue Jun 10). Three contributing factors identified.',
    sectionLabel: 'KEY FACTORS',
    factors: [
      'Weather event: avg temp 9°C below seasonal norm in Munich submarket — historically correlates with -2.8% traffic on comparable days.',
      'Loyalty redemption: Tuesday redemption rate down 18% vs. 4-week average, suggesting McValue offer was not surfaced in app for this region.',
      'Competitor promo: Burger King Germany ran a 2-for-1 Whopper offer Tue–Thu. Comp-period share data shows -1.1% estimated guest count shift.',
    ],
    recLabel: 'RECOMMENDED ACTIONS',
    recommendations: [
      'Confirm McValue offer visibility with digital ops.',
      'Revisit drive-thru throughput on weather days — Ready on Arrival geofence radius may be too tight for cold-weather behavior.',
    ],
    confidence: 'High',
    confidencePct: 87,
    sources: ['Weather API', 'Loyalty Platform', 'Comp Intelligence feed'],
    followUps: [
      'Show me the loyalty redemption trend for the last 4 Tuesdays',
      'How did other Germany markets perform on the same day?',
    ],
  },
  {
    id: 'loyalty-growth',
    triggers: ['loyalty', '250m', '250 million', 'tracking toward', 'loyalty user', 'how is my market tracking'],
    body: 'Germany North currently has 1.24M 90-day active loyalty users, up 8.3% YTD. At this pace, your market reaches 1.41M by year-end — ahead of your pro-rated target of 1.38M.',
    sectionLabel: 'KEY DRIVER',
    factors: [
      'Tuesday lunchtime push notification sent May 28 drove a 22% spike in app opens and 14% same-day new enrollment.',
    ],
    recLabel: 'WATCH ITEM',
    recommendations: [
      'Lapsed user reactivation rate declined 3 months in a row. If this trend continues, net active users will plateau by Q3.',
    ],
    confidence: 'High',
    confidencePct: 91,
    sources: ['Loyalty Platform (EDAA standardized: active = at least 1 redemption or app open in trailing 90 days)'],
    chartTitle: '90-day active loyalty users — Germany North',
    chartData: [
      { label: 'Jan', value: 1.05 },
      { label: 'Feb', value: 1.09 },
      { label: 'Mar', value: 1.14 },
      { label: 'Apr', value: 1.17 },
      { label: 'May', value: 1.21 },
      { label: 'Jun W1', value: 1.23 },
      { label: 'Jun W3', value: 1.24 },
    ],
    followUps: [
      'What drove the May 28 spike?',
      'Compare to Germany South loyalty growth',
    ],
  },
  {
    id: 'drive-thru-outliers',
    triggers: ['drive-thru', 'drive thru', 'dt time', 'worst', 'outlier', 'service time'],
    body: 'Bottom 5 drive-thru locations by average service time, Germany North (last 7 days):',
    sectionLabel: 'RANKED LIST',
    factors: [
      'Munich-Schwabing — 4m 47s avg (+38s vs. market avg)',
      'Berlin-Mitte — 4m 31s avg (+22s vs. market avg)',
      'Hamburg-Altona — 4m 28s avg (+19s vs. market avg)',
      'Frankfurt-Sachsenhausen — 4m 19s avg (+10s vs. market avg)',
      'Cologne-Ehrenfeld — 4m 14s avg (+5s vs. market avg)',
    ],
    recLabel: 'RECOMMENDED ACTION',
    recommendations: [
      'Munich-Schwabing is the significant outlier. Edge sensor data shows equipment idle time spikes at the order confirmation station between 11:30am–1:30pm. Possible equipment issue — last maintenance log: 47 days ago. Dispatch maintenance check before weekend peak.',
    ],
    confidence: 'High',
    confidencePct: 89,
    sources: ['Restaurant Edge Sensors', 'Maintenance Log System'],
    followUps: [
      'Show me Munich-Schwabing service time by hour',
      'Which markets in DACH region are best on DT time?',
    ],
  },
  {
    id: 'weather-correlation',
    triggers: ['weather', 'cold', 'temperature', 'rainy', 'storm'],
    body: 'Cold-weather days (avg daily temp >5°C below seasonal norm) correlate with a -2.6% traffic impact across Germany North restaurants on average. Drive-thru is the only channel that remains net-positive on those days — but with notably longer dwell times at the speaker post.',
    sectionLabel: 'KEY FACTORS',
    factors: [
      'McCafé hot beverage attach rate rises +14% on cold-weather days — partial revenue offset.',
      'Dine-in traffic drops 11%; drive-thru rises 3%; delivery rises 9%.',
      'Ready on Arrival geofence underperforms — customers idle in vehicles 22s longer before walking in.',
    ],
    recLabel: 'RECOMMENDED ACTION',
    recommendations: [
      'Test expanding Ready on Arrival geofence radius by 30% on forecast cold days. Pilot 3 stores for 2 weeks.',
    ],
    confidence: 'Medium',
    confidencePct: 74,
    sources: ['Weather API', 'POS Transaction Feed', 'Ready on Arrival Geofencing'],
    chartTitle: 'Traffic impact vs. temp delta (last 30 days)',
    chartData: [
      { label: '-12°C', value: -4.1 },
      { label: '-9°C', value: -3.2 },
      { label: '-6°C', value: -2.4 },
      { label: '-3°C', value: -1.1 },
      { label: '0°C', value: 0.2 },
      { label: '+3°C', value: 0.8 },
      { label: '+6°C', value: 1.4 },
    ],
    followUps: [
      'How does this compare to summer heatwave impact?',
      'Show me McCafé attach rate trend',
    ],
  },
  {
    id: 'order-accuracy',
    triggers: ['accuracy', 'order accuracy', 'wrong order', 'mistake'],
    body: 'Order accuracy in Germany North is 97.3% over the last 7 days — within target band (>96.5%) but trending down 0.4pts week-over-week. Most common error pattern: missing modifier on McCafé custom orders during peak.',
    sectionLabel: 'KEY FACTORS',
    factors: [
      'Mobile order accuracy: 98.1% (steady).',
      'Kiosk order accuracy: 97.9% (steady).',
      'Drive-thru voice accuracy: 95.4% — drove the WoW decline.',
    ],
    recLabel: 'RECOMMENDED ACTION',
    recommendations: [
      'Munich and Frankfurt voice AI confidence scores dropped after the v3.2 model deploy. Coordinate with Google Cloud team on rollback or fine-tune.',
    ],
    confidence: 'Medium',
    confidencePct: 78,
    sources: ['Order Management System', 'Voice AI Telemetry'],
    followUps: [
      'Which stores had the biggest accuracy drop?',
      'How does Germany compare to other Europe markets?',
    ],
  },
  {
    id: 'compare-markets',
    triggers: ['compare', 'other germany', 'how did other', 'south', 'east', 'west'],
    body: 'Last Tuesday performance across German markets (comp sales WoW):',
    sectionLabel: 'MARKET COMPARISON',
    factors: [
      'Germany North: -4.2% (your market)',
      'Germany South: -1.8% (Munich weather impact, smaller exposure)',
      'Germany East: +0.3%',
      'Germany West: -0.9%',
      'Nationwide DACH: -1.7%',
    ],
    recLabel: 'INSIGHT',
    recommendations: [
      'Germany North underperformed nationwide by 2.5pts. Weather alone explains ~2.8pts of impact — net normalized performance is roughly in line with peers.',
    ],
    confidence: 'High',
    confidencePct: 85,
    sources: ['Comp Intelligence feed', 'EDAA Germany Roll-up'],
    followUps: [
      'Why did Germany East outperform?',
      'Show me the 4-week comp sales trend for Germany North',
    ],
  },
  {
    id: 'unknown',
    triggers: [],
    isUnknown: true,
    body: "I don't have data for that yet — try asking about comp sales, loyalty, drive-thru, weather impact, or order accuracy for your market.",
    followUps: [
      'Why did comp sales drop last Tuesday?',
      "How's loyalty trending?",
      'Show me drive-thru outliers',
    ],
  },
];

export function matchResponse(query) {
  const q = query.toLowerCase();
  for (const r of responses) {
    if (r.isUnknown) continue;
    if (r.triggers.some(t => q.includes(t))) return r;
  }
  return responses.find(r => r.isUnknown);
}
