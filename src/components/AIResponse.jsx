import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function AIResponse({ data, onFollowUp }) {
  if (data.isUnknown) {
    return (
      <>
        <div className="ai-card unknown">
          <div className="ai-body">{data.body}</div>
        </div>
        {data.followUps && (
          <div className="followups">
            {data.followUps.map((f, i) => (
              <button key={i} className="followup-chip" onClick={() => onFollowUp(f)}>{f}</button>
            ))}
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div className="ai-card">
        <div className="ai-body">{data.body}</div>

        {data.factors && data.factors.length > 0 && (
          <>
            <div className="ai-section-label">{data.sectionLabel || 'KEY FACTORS'}</div>
            <ol className="ai-list">
              {data.factors.map((f, i) => <li key={i}>{f}</li>)}
            </ol>
          </>
        )}

        {data.recommendations && data.recommendations.length > 0 && (
          <>
            <div className="ai-section-label">{data.recLabel || 'RECOMMENDED ACTIONS'}</div>
            <ul className="ai-list">
              {data.recommendations.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </>
        )}

        {data.chartData && (
          <div className="chart-wrap">
            {data.chartTitle && <div className="chart-title">{data.chartTitle}</div>}
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={data.chartData} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11, fill: '#666' }}
                  axisLine={{ stroke: '#E0E0E0' }}
                  tickLine={false}
                />
                <YAxis hide domain={['auto', 'auto']} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 6, border: '1px solid #E0E0E0' }}
                  cursor={{ stroke: '#FFC72C', strokeDasharray: '3 3' }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#DA291C"
                  strokeWidth={2.5}
                  dot={{ fill: '#FFC72C', stroke: '#DA291C', strokeWidth: 1.5, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="ai-meta-row">
          {data.confidence && (
            <span className={`confidence-badge ${data.confidence}`}>
              {data.confidence} confidence{data.confidencePct ? ` · ${data.confidencePct}%` : ''}
            </span>
          )}
        </div>

        {data.sources && (
          <div className="sources-line">
            Sources: {data.sources.join(', ')}
          </div>
        )}
      </div>

      {data.followUps && data.followUps.length > 0 && (
        <div className="followups">
          {data.followUps.map((f, i) => (
            <button key={i} className="followup-chip" onClick={() => onFollowUp(f)}>{f}</button>
          ))}
        </div>
      )}
    </>
  );
}
