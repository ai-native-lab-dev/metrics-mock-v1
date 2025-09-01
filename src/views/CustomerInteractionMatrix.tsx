export default function CustomerInteractionMatrix() {
  const COLORS = {
    l0:   { base: '#C8E6C9', tx: '#1B5E20' },
    l1a:  { base: '#BBDEFB', tx: '#0D47A1' },
    l1b:  { base: '#90CAF9', tx: '#0D47A1' },
    l2:   { base: '#E1BEE7', tx: '#6A1B9A' },
    l2a:  { base: '#E1BEE7', tx: '#6A1B9A' },
    l2aLight: { base: '#F3E5F5', tx: '#6A1B9A' },
    l2Light:  { base: '#F3E5F5', tx: '#6A1B9A' },
    l2aMid:   { base: '#EACBEF', tx: '#6A1B9A' },
    l2b:  { base: '#E6DCD8', tx: '#4E342E' },
    l3:  { base: '#E6DCD8', tx: '#4E342E' },
    l2bLight: { base: '#EFEBE9', tx: '#5D4037' },
    l3Light: { base: '#EFEBE9', tx: '#5D4037' },
    l4a:  { base: '#B2DFDB', tx: '#004D40' },
    l4b:  { base: '#80CBC4', tx: '#004D40' },
    l4:   { base: '#26A69A', tx: '#004D40' },
    head: { base: '#212121', tx: '#FFFFFF' },
    taupe: { base: '#BCAAA4', tx: '#3E2723' },
  };

  const col = (key: string, opts: { bold?: boolean } = {}) => {
    const c = COLORS[key as keyof typeof COLORS];
    if (!c) return { background: '#fff', color: '#111' };
    return {
      background: c.base,
      color: c.tx,
      fontWeight: opts.bold ? 700 : 400,
      padding: '12px 16px',
      border: '1px solid #f0f0f0',
    };
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 p-10">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-slate-200">
        <table className="w-full border-separate border-spacing-0 text-center rounded-xl overflow-hidden shadow-md">
          <thead style={{ background: COLORS.head.base, color: COLORS.head.tx }}>
            <tr className="text-white text-sm uppercase tracking-wide">
              <th>Top-Most Category</th>
              <th>Customer Does</th>
              <th>Customer Chooses</th>
              <th>Customer Interacts With</th>
              <th>CS Channel Group</th>
              <th>Type of Service</th>
              <th>CS Interaction Channels</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-200">
            {/* Rows 1–3 (Visit) */}
            <tr>
              <td rowSpan={11} style={col('l0')}>Customer Interaction</td>
              <td rowSpan={3} style={col('l1a')}>Visit</td>
              <td rowSpan={3} style={col('l2Light')}>Self-guided</td>
              <td rowSpan={3} style={col('l2aLight')}>Pages</td>
              <td rowSpan={3} style={col('l2bLight')}>(Page) Visit</td>
              <td style={col('l3Light')}>AI-enabled</td>
              <td style={col('l4a')}>CS Landing Page</td>
            </tr>
            <tr>
              <td style={col('l3Light')}>Legacy-based</td>
              <td style={col('l4a')}>CS Homepage</td>
            </tr>
            <tr>
              <td style={col('l3Light')}>Static</td>
              <td style={col('l4a')}>Help Pages</td>
            </tr>

            {/* Rows 4–8 (Contact, Self-service, Bot merged) */}
            <tr>
              <td rowSpan={8} style={col('l1b')}>Contact</td>
              <td rowSpan={5} style={col('l2')}>Self-service</td>
              <td rowSpan={5} style={col('l2aMid')}>Bot</td>
              <td rowSpan={3} style={col('l2b')}>Chat</td>
              <td rowSpan={3} style={col('l3')}>AI-enabled</td>
              <td style={col('l4b')}>CS Chatbot</td>
            </tr>
            <tr>
              <td style={col('l4b')}>CS Voicebot</td>
            </tr>
            <tr>
              <td style={col('l4b')}>AI-enabled Email</td>
            </tr>
            <tr>
              <td style={col('l2b')}>Chat</td>
              <td rowSpan={2} style={col('l3')}>Legacy-based</td>
              <td style={col('l4b')}>Legacy Chatbot</td>
            </tr>
            <tr>
              <td style={col('l2b')}>Voice</td>
              <td style={col('l4b')}>Legacy Voicebot</td>
            </tr>

            {/* Rows 9–11 (CSA Human-led) */}
            <tr>
              <td rowSpan={3} style={col('l2')}>Human-led</td>
              <td rowSpan={3} style={col('l2a')}>CSA</td>
              <td style={col('taupe')}>Chat</td>
              <td rowSpan={3} style={col('taupe')}>Human-led (with some AI)</td>
              <td style={col('l4')}>CSA Chat</td>
            </tr>
            <tr>
              <td style={col('taupe')}>Voice</td>
              <td style={col('l4')}>CSA Voice</td>
            </tr>
            <tr>
              <td style={col('taupe')}>Email</td>
              <td style={col('l4')}>CSA Email</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
