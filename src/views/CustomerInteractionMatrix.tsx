import React, { useState } from "react";

interface ColorConfig {
  base: string;
  tx: string;
}

interface ColorOptions {
  bold?: boolean;
}

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
    level: { base: '#374151', tx: '#FFFFFF' },
    l5:   { base: '#FFE4E1', tx: '#CD5C5C' }, // Salmon color for Customer Touchpoint
    l6:   { base: '#E8EAF6', tx: '#3F51B5' }, // Soft lavender pastel for L6
    l0Light: { base: '#E8F5E8', tx: '#1B5E20' },
    l0Mid: { base: '#66BB6A', tx: '#FFFFFF' },
    l1aLight: { base: '#E3F2FD', tx: '#0D47A1' },
    l1aMid: { base: '#42A5F5', tx: '#FFFFFF' },
    l2Mid: { base: '#AB47BC', tx: '#FFFFFF' },
    // Additional Dimensions specific colors (darker versions)
    l0Dark: { base: '#2E7D32', tx: '#FFFFFF' },
    l1aDark: { base: '#1565C0', tx: '#FFFFFF' },
    l2Dark: { base: '#7B1FA2', tx: '#FFFFFF' },
  } as const;

type ColorKey = keyof typeof COLORS;

export default function CustomerInteractionMatrix() {
  const [activePrimaryTab, setActivePrimaryTab] = useState('main');

  const col = (key: ColorKey, opts: ColorOptions = {}) => {
    const c = COLORS[key];
    if (!c) return { background: '#fff', color: '#111', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '15px' };
    return {
      background: c.base,
      color: c.tx,
      fontWeight: opts.bold ? 700 : 400,
      padding: '12px 16px',
      border: '1px solid #f0f0f0',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      fontSize: '15px',
    };
  };

  const colAdditional = (key: ColorKey, opts: ColorOptions = {}) => {
    const c = COLORS[key];
    if (!c) return { background: '#fff', color: '#111', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '14px' };
    return {
      background: c.base,
      color: c.tx,
      fontWeight: opts.bold ? 700 : 400,
      padding: '10px 12px',
      border: '1px solid #ffffff',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      fontSize: '14px',
    };
  };

  const renderMainContent = () => (
    <div className="space-y-8">
      {/* Original Table */}
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Primitive Dimensions Matrix</h2>
        <table className="w-full border-separate border-spacing-0 text-center rounded-xl overflow-hidden shadow-md" style={{fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '15px', border: 'none'}}>
          <thead style={{ background: COLORS.head.base, color: COLORS.head.tx }}>
            {/* Row 1: Taxonomy Level */}
            <tr className="text-sm tracking-wide">
              <th style={{ background: '#2d3748', color: '#e2e8f0', padding: '5px 8px', width: '120px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '13px' }}>L0</th>
              <th style={{ background: '#2d3748', color: '#e2e8f0', padding: '5px 8px', width: '120px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '13px' }}>L1</th>
              <th style={{ background: '#2d3748', color: '#e2e8f0', padding: '5px 8px', width: '140px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '13px' }}>L2</th>
              <th style={{ background: '#2d3748', color: '#e2e8f0', padding: '5px 8px', width: '120px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '13px' }}>L3</th>
              <th style={{ background: '#2d3748', color: '#e2e8f0', padding: '5px 8px', width: '180px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '13px' }}>L4</th>
              <th style={{ background: '#2d3748', color: '#e2e8f0', padding: '5px 8px', width: '120px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '13px' }}>L5</th>
              <th style={{ background: '#2d3748', color: '#e2e8f0', padding: '5px 8px', width: '120px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '13px' }}>L6</th>
            </tr>
            {/* Row 2: Header */}
            <tr className="text-sm tracking-wide">
              <th style={{ background: COLORS.l0.tx, color: '#ffffff', padding: '16px 10px', width: '120px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '15px' }}>
                <div>CX Focus</div>
                <div style={{fontSize: '0.9em', fontWeight: 'normal', fontStyle: 'italic', marginTop: '4px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'}}>(Overall What)</div>
              </th>
              <th style={{ background: COLORS.l1a.tx, color: '#ffffff', padding: '16px 10px', width: '120px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '15px' }}>
                <div>Customer Does</div>
                <div style={{fontSize: '0.9em', fontWeight: 'normal', fontStyle: 'italic', marginTop: '4px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'}}>(Did What)</div>
              </th>
              <th style={{ background: COLORS.l2.tx, color: '#ffffff', padding: '16px 10px', width: '140px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '15px' }}>
                <div>Customer Chooses</div>
                <div style={{fontSize: '0.9em', fontWeight: 'normal', fontStyle: 'italic', marginTop: '4px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'}}>(Which Path)</div>
              </th>
              <th style={{ background: COLORS.l3.tx, color: '#ffffff', padding: '16px 10px', width: '120px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '14px' }}>
                <div>Service Experience</div>
                <div style={{fontSize: '0.85em', fontWeight: 'normal', fontStyle: 'italic', marginTop: '4px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'}}>(Handled How)</div>
              </th>
              <th style={{ background: COLORS.l4.tx, color: '#ffffff', padding: '16px 10px', width: '180px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '15px' }}>
                <div>CS Interaction Channel</div>
                <div style={{fontSize: '0.9em', fontWeight: 'normal', fontStyle: 'italic', marginTop: '4px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'}}>(Ended Where)</div>
              </th>
              <th style={{ background: COLORS.l5.tx, color: '#ffffff', padding: '16px 10px', width: '120px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '15px' }}>
                <div>Occurrence</div>
                <div style={{fontSize: '0.9em', fontWeight: 'normal', fontStyle: 'italic', marginTop: '4px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'}}>(Came Back)</div>
              </th>
              <th style={{ background: COLORS.l6.tx, color: '#ffffff', padding: '16px 10px', width: '120px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '15px' }}>
                <div>Time Span</div>
                <div style={{fontSize: '0.9em', fontWeight: 'normal', fontStyle: 'italic', marginTop: '4px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'}}>(Aggregated When)</div>
              </th>
          </tr>

          </thead>
          <tbody className="text-sm divide-y divide-gray-200">

            {/* Example Rows – all end with Customer Touchpoint */}
            <tr>
              <td rowSpan={13} style={col('l0')}>Total Customer Interaction</td>
              <td rowSpan={3} style={col('l1a')}>Visit</td>
              <td rowSpan={3} style={col('l2Light')}>
                <div>Self-Guided</div>
                <div style={{fontSize: '0.9em', fontStyle: 'italic', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'}}>("Visit" Webpages)</div>
              </td>
              <td style={col('l3Light')}>AI-enabled</td>
              <td style={col('l4a')}>CS Landing Page</td>
              <td rowSpan={13} style={{...col('l5'), width: '120px', padding: '10px 8px'}}>
                <div style={{fontWeight: 'normal', marginBottom: '3px', fontSize: '0.95em', lineHeight: '1.3', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'}}>"No-Repeat"</div>
                <div style={{fontSize: '0.8em', fontWeight: 'normal', color: COLORS.l5.tx, margin: '3px 0', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'}}>OR</div>
                <div style={{fontWeight: 'normal', marginTop: '3px', fontSize: '0.95em', lineHeight: '1.3', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'}}>"Repeat"</div>
              </td>
              <td rowSpan={13} style={{...col('l6'), width: '120px', padding: '10px 8px'}}>
                <div style={{fontWeight: 'normal', fontSize: '0.95em', lineHeight: '1.3', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'}}>
                  7-day trailing window (base),<br/>
                  Weekly,<br/>
                  Monthly,<br/>
                  AND YTD
                </div>
              </td>
            </tr>
            <tr>
              <td style={col('l3Light')}>Legacy-based</td>
              <td style={col('l4a')}>CS Homepage</td>
            </tr>
            <tr>
              <td style={col('l3Light')}>Static mostly</td>
              <td style={col('l4a')}>Help Pages</td>
            </tr>
                        {/* Separator line after Visit-related values - spans L1 to L4 only */}
            <tr>
              <td colSpan={4} style={{height: '3px', background: '#000000', border: 'none', padding: '0'}}></td>
            </tr>

            {/* Contact (Bot + CSA) rows keep same logic */}
            <tr>
              <td rowSpan={9} style={col('l1b')}>Contact</td>
              <td rowSpan={5} style={col('l2')}>
                <div>Self-Service</div>
                <div style={{fontSize: '0.9em', fontStyle: 'italic', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'}}>("Bot")</div>
              </td>
              <td rowSpan={3} style={col('l3')}>AI-enabled</td>
              <td style={{...col('l4b'), fontWeight: 'normal'}}>CS Chatbot</td>
            </tr>
            <tr>
              <td style={{...col('l4b'), fontWeight: 'normal'}}>
                <div>CS Voicebot</div>
                <div style={{fontSize: '0.9em', fontStyle: 'italic', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'}}>(incl. AI-enabled AVA)</div>
              </td>
            </tr>
            <tr>
              <td style={{...col('l4b'), fontWeight: 'normal'}}>
                <div>AI-enabled Email</div>
                <div style={{fontSize: '0.9em', fontStyle: 'italic', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'}}>(coming soon)</div>
              </td>
            </tr>
            <tr>
              <td rowSpan={2} style={col('l3')}>Legacy-based</td>
              <td style={{...col('l4b'), fontWeight: 'normal'}}>Legacy Chatbot</td>
          </tr>
          <tr>
              <td style={{...col('l4b'), fontWeight: 'normal'}}>Legacy Voicebot</td>
            </tr>
            {/* Separator line after Self-Service values - spans L2 to L4 only */}
            <tr>
              <td colSpan={3} style={{height: '3px', background: '#000000', border: 'none', padding: '0'}}></td>
            </tr>

            {/* CSA Human-led */}
            <tr>
              <td rowSpan={3} style={col('l2')}>
                <div>Human-led</div>
                <div style={{fontSize: '0.9em', fontStyle: 'italic', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'}}>("CSA")</div>
              </td>
              <td rowSpan={3} style={col('taupe')}>
                <div>Human-led,</div>
                <div style={{fontSize: '0.9em', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'}}>AI-assisted</div>
              </td>
              <td style={{...col('l4'), fontWeight: 'normal'}}>CSA Chat</td>
            </tr>
            <tr>
              <td style={{...col('l4'), fontWeight: 'normal'}}>CSA Voice</td>
            </tr>
            <tr>
              <td style={{...col('l4'), fontWeight: 'normal'}}>CSA Email</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAdditionalDimensionsContent = () => {
    return (
      <div className="bg-white rounded-2xl shadow-lg ring-1 ring-slate-200 overflow-hidden max-w-7xl mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0 text-center rounded-xl overflow-hidden shadow-md min-w-[900px]" style={{fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '14px', border: 'none'}}>
          <thead>
            {/* Row 1: Level */}
            <tr>
              <td colSpan={4} className="text-center py-2 font-bold text-sm text-white tracking-wide" style={colAdditional('level')}>
                L7
              </td>
              <td colSpan={5} className="text-center py-2 font-bold text-sm text-white tracking-wide" style={colAdditional('level')}>
                L8
              </td>
            </tr>
            {/* Row 2: Group Headers */}
            <tr>
              <td colSpan={4} className="text-center py-4 font-bold text-lg text-white tracking-wide" style={colAdditional('l0Dark')}>
                Customer Context Dimension
              </td>
              <td colSpan={5} className="text-center py-4 font-bold text-lg text-white tracking-wide" style={colAdditional('l1aDark')}>
                Temporal & Reporting Dimension
              </td>
            </tr>
            {/* Row 3: Dimension Titles */}
            <tr>
              <td className="text-center py-3 font-semibold text-sm tracking-wide" style={colAdditional('l0Mid')}>
                Marketplace
              </td>
              <td className="text-center py-3 font-semibold text-sm tracking-wide" style={colAdditional('l0Mid')}>
                Membership
              </td>
              <td className="text-center py-3 font-semibold text-sm tracking-wide" style={colAdditional('l0Mid')}>
                Customer Identity
              </td>
              <td className="text-center py-3 font-semibold text-sm tracking-wide" style={colAdditional('l0Mid')}>
                Order Relevance
              </td>
              <td className="text-center py-3 font-semibold text-sm tracking-wide" style={colAdditional('l1aMid')}>
                Reporting Vertical
              </td>
              <td className="text-center py-3 font-semibold text-sm tracking-wide" style={colAdditional('l1aMid')}>
                Year
              </td>
              <td className="text-center py-3 font-semibold text-sm tracking-wide" style={colAdditional('l1aMid')}>
                Frequency Tiers
              </td>
              <td className="text-center py-3 font-semibold text-sm tracking-wide" style={colAdditional('l1aMid')}>
                Repeat Percentiles
              </td>
              <td className="text-center py-3 font-semibold text-sm tracking-wide" style={colAdditional('l1aMid')}>
                Data Type
              </td>
            </tr>
          </thead>
                    <tbody>
                        {/* Row 4: US, Prime, Same, HasOrder, Consumer, 2024, 2+, P80, Click */}
            <tr>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l0Light')}>
                US
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l0Light')}>
                Prime
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l0Light')}>
                Same
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l0Light')}>
                HasOrder
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                Consumer
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                2024
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                2+
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                P80
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                Click
              </td>
            </tr>
            {/* Row 5: Non-Prime, Distinct, NoOrder, D2, 2025, 2–4, P90, Transcript */}
            <tr>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l0Light')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l0Light')}>
                Non-Prime
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l0Light')}>
                Distinct
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l0Light')}>
                NoOrder
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                D2
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                2025
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                2–4
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                P90
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                Transcript
              </td>
            </tr>
            {/* Row 6: AB, 3–P90, P95 */}
            <tr>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l0Light')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l0Light')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l0Light')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l0Light')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                AB
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                3–P90
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                P95
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                
              </td>
            </tr>
            {/* Row 7: SDS Recipients, 3–P95, P99 */}
            <tr>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l0Light')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l0Light')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l0Light')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l0Light')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                SDS Recipients
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                3–P95
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                P99
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                
              </td>
            </tr>
            {/* Row 8: SDS Drivers, 5+ */}
            <tr>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l0Light')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l0Light')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l0Light')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l0Light')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                SDS Drivers
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                5+
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                
              </td>
            </tr>
            {/* Row 9: CAP */}
            <tr>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l0Light')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l0Light')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l0Light')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l0Light')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                CAP
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                
              </td>
            </tr>
            {/* Row 10: Stores */}
            <tr>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l0Light')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l0Light')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l0Light')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l0Light')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                Stores (Consumer + AB + SDS Recipients + CAP)
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                
              </td>
            </tr>
            {/* Row 11: Amazon CS */}
            <tr>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l0Light')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l0Light')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l0Light')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l0Light')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                Amazon CS (Stores + D2 + AB + SDS Drivers)
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                
              </td>
              <td className="text-center py-3 text-sm font-medium" style={colAdditional('l1aLight')}>
                
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    );
  };



  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 p-6" style={{fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'}}>
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3" style={{fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'}}>
            Primitive Metric Dimension Base
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-xl ring-1 ring-slate-200 overflow-hidden">
          {/* Primary Tab Navigation */}
          <div className="border-b border-gray-200 bg-gray-50">
            <div className="px-8 py-4">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActivePrimaryTab('main')}
                  className={`px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    activePrimaryTab === 'main'
                      ? 'bg-gray-900 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-800 shadow-sm border border-gray-200'
                  }`}
                  style={{fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'}}
                >
                  Repeat Customer Interaction Base
                </button>
                <button
                  onClick={() => setActivePrimaryTab('additional')}
                  className={`px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    activePrimaryTab === 'additional'
                      ? 'bg-gray-900 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-800 shadow-sm border border-gray-200'
                  }`}
                  style={{fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'}}
                >
                  Additional Dimensions
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-8">
            {activePrimaryTab === 'main' ? (
              renderMainContent()
            ) : (
              renderAdditionalDimensionsContent()
            )}
          </div>
        </div>
      </div>
    </div>
  );
}