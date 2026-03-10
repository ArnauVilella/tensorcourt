import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import logo from '../assets/da2b5e7b8fdf8e9caeeff8fe8a713087a95d6e3b.png';

// This component is designed to be rendered off-screen to generate a shareable image.
const ShareableStats = React.forwardRef(({ stats, user, matches, performanceData, radarData }, ref) => {
  if (!stats || !user) return null;

  const { overallStats, serveStats, returnStats, shotAnalysis } = stats;

  // Styles for a clean, shareable image
  const containerStyle = {
    width: '550px',
    padding: '8px 24px 24px 24px',
    backgroundColor: '#ffffff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    color: '#333',
  };
  const headerStyle = {
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#1a202c',
    whiteSpace: 'pre-wrap',
    letterSpacing: '0.02em',
    wordSpacing: '0.1em'
  };
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gap: '12px',
    marginBottom: '16px',
  };
  const cardStyle = {
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '0 8px 12px 8px',
    backgroundColor: '#f7fafc',
    textAlign: 'center',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  };
  const cardTitleStyle = {
    fontSize: '10px',
    fontWeight: '500',
    marginBottom: '2px',
    color: '#718096',
  };
  const cardValueStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1a202c',
  };
  const sectionTitleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginTop: '18px',
    marginBottom: '12px',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '6px',
    color: '#2d3748',
  };
  const recentMatchCardStyle = {
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '0 8px 12px 8px',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '18px',
  };

  return (
    <div ref={ref} style={containerStyle}>
      <h1 style={headerStyle}>{user.username}'s&nbsp;TensorCourt&nbsp;Statistics</h1>
      
      <div style={sectionTitleStyle}>Overall Performance</div>
      <div style={gridStyle}>
        <div style={cardStyle}>
          <div style={cardTitleStyle}>Win Rate</div>
          <div style={{...cardValueStyle, color: '#000'}}>{overallStats.winPercentage.toFixed(1)}%</div>
        </div>
        <div style={cardStyle}>
          <div style={cardTitleStyle}>Matches</div>
          <div style={cardValueStyle}>{overallStats.totalMatches}</div>
        </div>
        <div style={cardStyle}>
          <div style={cardTitleStyle}>Wins</div>
          <div style={{...cardValueStyle, color: '#10b981'}}>{overallStats.wins}</div>
        </div>
        <div style={cardStyle}>
          <div style={cardTitleStyle}>Losses</div>
          <div style={{...cardValueStyle, color: '#ef4444'}}>{overallStats.losses}</div>
        </div>
      </div>

      <div style={sectionTitleStyle}>Detailed Match Statistics</div>
      <div style={gridStyle}>
        <div style={cardStyle}>
          <div style={cardTitleStyle}>Sets Won</div>
          <div style={{...cardValueStyle, color: '#3b82f6'}}>{overallStats.setsWon}</div>
        </div>
        <div style={cardStyle}>
          <div style={cardTitleStyle}>Sets Lost</div>
          <div style={{...cardValueStyle, color: '#4b5563'}}>{overallStats.setsLost}</div>
        </div>
        <div style={cardStyle}>
          <div style={cardTitleStyle}>Games Won</div>
          <div style={{...cardValueStyle, color: '#8b5cf6'}}>{overallStats.gamesWon}</div>
        </div>
        <div style={cardStyle}>
          <div style={cardTitleStyle}>Games Lost</div>
          <div style={{...cardValueStyle, color: '#4b5563'}}>{overallStats.gamesLost}</div>
        </div>
      </div>

      <div style={sectionTitleStyle}>Recent Form</div>
      <div style={{...gridStyle, gridTemplateColumns: '1fr 1fr 1fr'}}>
        {matches && matches.slice(0, 3).map(match => (
          <div key={match.id} style={{...recentMatchCardStyle, backgroundColor: match.result === 'Win' ? '#c6f6d5' : '#fed7d7', color: match.result === 'Win' ? '#2f855a' : '#c53030'}}>
            <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '4px', color: '#000' }}> vs {match.opponent}</div>
            {match.result.charAt(0)}
          </div>
        ))}
      </div>

      <div style={sectionTitleStyle}>Serve Analysis</div>
      <div style={{...gridStyle, gridTemplateColumns: '1fr 1fr 1fr'}}>
         <div style={cardStyle}>
          <div style={cardTitleStyle}>1st Serve %</div>
          <div style={{...cardValueStyle, color: '#3b82f6'}}>{serveStats.firstServePercentage.toFixed(1)}%</div>
        </div>
        <div style={cardStyle}>
          <div style={cardTitleStyle}>Aces / Match</div>
          <div style={{...cardValueStyle, color: '#10b981'}}>{serveStats.acesPerMatch.toFixed(1)}</div>
        </div>
        <div style={cardStyle}>
          <div style={cardTitleStyle}>Avg Speed</div>
          <div style={{...cardValueStyle, color: '#8b5cf6'}}>{serveStats.averageServeSpeed.toFixed(0)} mph</div>
        </div>
      </div>

      <div style={sectionTitleStyle}>Performance Radar</div>
      <div style={{ height: '250px', marginTop: '20px', position: 'relative' }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis domain={[0, 100]} />
            <Radar name="Performance" dataKey="value" stroke="#3b82f6" fill="rgba(59, 130, 246, 0.3)" strokeWidth={2} />
          </RadarChart>
        </ResponsiveContainer>
        <div style={{ position: 'absolute', bottom: '10px', left: '10px', fontSize: '12px', color: '#718096', zIndex: 1 }}>tensorcourt.com</div>
        <div style={{ position: 'absolute', bottom: '5px', right: '5px', zIndex: 1 }}>
          <img src={logo} alt="TensorCourt Logo" style={{ height: '30px', width: 'auto', filter: 'brightness(0.8)' }} />
        </div>
      </div>
    </div>
  );
});

export default ShareableStats;