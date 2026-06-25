import { useState, useRef, useEffect } from 'react';
import { matchResponse } from './data/responses.js';
import Logo from './components/Logo.jsx';
import AIResponse from './components/AIResponse.jsx';

const STARTER_QUESTIONS = [
  'Why did comp sales drop 4% last Tuesday?',
  "How is my market tracking toward the 250M loyalty user target?",
  'Which restaurants in my region have the worst drive-thru times right now?',
];

const QUICK_STARTERS = [
  'Why did comp sales drop last Tuesday?',
  'Show me drive-thru outliers',
  "How's loyalty trending?",
];

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [market, setMarket] = useState('Germany North');
  const [aboutOpen, setAboutOpen] = useState(false);
  const threadRef = useRef(null);

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') setAboutOpen(false); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, loading]);

  function handleSubmit(text) {
    const query = (text ?? input).trim();
    if (!query || loading) return;
    setInput('');
    setMessages(prev => [...prev, { type: 'user', text: query }]);
    setLoading(true);
    setTimeout(() => {
      const response = matchResponse(query);
      setMessages(prev => [...prev, { type: 'ai', data: response }]);
      setLoading(false);
    }, 1800);
  }

  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-logo"><Logo size={36} /></div>
        <div className="nav-wordmark">Arches Intelligence</div>
        <div className="nav-spacer" />
        <button className="about-btn" onClick={() => setAboutOpen(true)}>About</button>
        <select
          className="market-selector"
          value={market}
          onChange={e => setMarket(e.target.value)}
          aria-label="Market selector"
        >
          <option>Germany North</option>
          <option>Germany South</option>
          <option>US Midwest</option>
          <option>Japan East</option>
        </select>
        <div className="avatar">PM</div>
      </nav>

      <div className="body">
        <aside className="left-panel">
          <div className="panel-section">
            <div className="panel-label">Market</div>
            <div className="panel-value">{market}</div>
            <div className="panel-meta">Period: Last 7 days</div>
            <div className="panel-meta">Data freshness: Updated 4 min ago</div>
          </div>

          <div className="panel-section">
            <div className="panel-label">Quick Stats</div>
          </div>

          <div className="stat">
            <div className="stat-value neg">-4.2%</div>
            <div className="stat-label">Comp Sales vs LW</div>
          </div>
          <div className="stat">
            <div className="stat-value">1.24M</div>
            <div className="stat-label">Loyalty Users <span style={{ color: '#2E7D32' }}>(+8.3% YTD)</span></div>
          </div>
          <div className="stat">
            <div className="stat-value">4m 12s</div>
            <div className="stat-label">Avg DT Time</div>
          </div>
          <div className="stat">
            <div className="stat-value">97.3%</div>
            <div className="stat-label">Order Accuracy</div>
          </div>
        </aside>

        <main className="chat-area">
          {messages.length === 0 ? (
            <div className="welcome">
              <div className="welcome-logo"><Logo size={64} /></div>
              <h1 className="welcome-title">Ask anything about your market.</h1>
              <p className="welcome-tagline">Plain-English questions. Trusted, governed answers.</p>
              <div className="starter-chips">
                {STARTER_QUESTIONS.map((q, i) => (
                  <button key={i} className="starter-chip" onClick={() => handleSubmit(q)}>
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="chat-thread">
              {messages.map((m, i) =>
                m.type === 'user' ? (
                  <div key={i} className="user-msg">{m.text}</div>
                ) : (
                  <AIResponse key={i} data={m.data} onFollowUp={handleSubmit} />
                )
              )}
              {loading && (
                <div className="loading-dots" aria-label="Loading">
                  <span /><span /><span />
                </div>
              )}
              <div ref={threadRef} />
            </div>
          )}
        </main>
      </div>

      <div className="input-bar">
        <form
          className="input-row"
          onSubmit={e => { e.preventDefault(); handleSubmit(); }}
        >
          <input
            type="text"
            placeholder="Ask anything about your market..."
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={loading}
            autoFocus
          />
          <button type="button" className="mic-btn" aria-label="Voice input (decorative)" tabIndex={-1}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
          </button>
          <button type="submit" className="send-btn" disabled={!input.trim() || loading} aria-label="Send">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </form>
        {messages.length > 0 && (
          <div className="starter-row">
            <span className="starter-row-label">Try:</span>
            {QUICK_STARTERS.map((q, i) => (
              <button key={i} onClick={() => handleSubmit(q)}>{q}</button>
            ))}
          </div>
        )}
      </div>

      {aboutOpen && (
        <div className="modal-overlay" onClick={() => setAboutOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()} role="dialog" aria-labelledby="about-title">
            <button className="modal-close" onClick={() => setAboutOpen(false)} aria-label="Close">×</button>
            <h2 id="about-title" className="modal-title">About this prototype</h2>
            <p>
              The purpose of this demo is <em>not</em> to argue that this particular RAG approach is unique.
              Rather, it is to show that a group under my direction builds prototypes quickly and tests
              them out before choosing the best to move forward to productionalize and to trial phase.
            </p>
            <p>
              That said, my teams have built agentic chat tools that source from embeddings in vector
              databases as well as MCP servers, as well as a text-to-SQL data source.
            </p>
            <div className="modal-footer">
              <span className="modal-author">— Paul Millar</span>
              <button className="modal-cta" onClick={() => setAboutOpen(false)}>Got it</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
