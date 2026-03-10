import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Trophy, Clock, MapPin } from 'lucide-react';
import '../styles/ShareableMatchStats.css';
import logo from '../assets/da2b5e7b8fdf8e9caeeff8fe8a713087a95d6e3b.png';

const ShareableMatchStats = React.forwardRef(({ match, user }, ref) => {
  if (!match || !user) return null;

  return (
    <div ref={ref} className="shareable-match-card">
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ marginBottom: '16px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '8px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '9999px',
              paddingTop: '-4px',
              paddingLeft: '8px',
              paddingRight: '8px',
              paddingBottom: '6px',
              fontSize: '12px',
              fontWeight: '500',
              marginRight: '16px',
              marginTop: '12px',
              backgroundColor: match.result === 'Win' ? '#10b981' : '#ef4444',
              color: '#ffffff'
            }}>
              {match.result}
            </div>
            <h1 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: '#000000',
              whiteSpace: 'pre-wrap',
              letterSpacing: '0.02em',
              wordSpacing: '0.1em'
            }}>
              {user.name}&nbsp;vs&nbsp;{match.opponent}
            </h1>
          </div>
          <p style={{ fontSize: '20px', color: '#4b5563', marginBottom: '8px' }}>{match.score}</p>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '14px', color: '#4b5563', marginTop: '8px' }}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <Clock style={{ width: '16px', height: '16px', marginRight: '4px', transform: 'translateY(1px)' }} />
              {new Date(match.date).toLocaleDateString()}
            </span>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <MapPin style={{ width: '16px', height: '16px', marginRight: '4px', transform: 'translateY(1px)' }} />
              {match.club}
            </span>
            <span style={{ display: 'flex', alignItems: 'center' }}>Duration: {Math.floor(match.duration / 60)}h {match.duration % 60}m</span>
          </div>
        </div>
      </div>

      <div style={{
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        backgroundColor: '#ffffff'
      }}>
        <div style={{
          padding: '16px',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '18px', fontWeight: '600' }}>
            <Trophy style={{ width: '20px', height: '20px', marginRight: '8px', color: '#059669' }} />
            Match Statistics
          </div>
        </div>
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#059669' }}>{match.aces}</div>
              <div style={{ fontSize: '14px', color: '#4b5563' }}>Aces</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc2626' }}>{match.doubleFaults}</div>
              <div style={{ fontSize: '14px', color: '#4b5563' }}>Double Faults</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '4px' }}>
                <span>First Serve %</span>
                <span>{Math.round(match.firstServePercentage * 100)}%</span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: '#e2e8f0',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  backgroundColor: '#3b82f6',
                  width: `${match.firstServePercentage * 100}%`,
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '16px',
            paddingTop: '16px',
            borderTop: '1px solid #e2e8f0'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{match.winners}</div>
              <div style={{ fontSize: '12px', color: '#4b5563' }}>Winners</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{match.unforcedErrors}</div>
              <div style={{ fontSize: '12px', color: '#4b5563' }}>UE</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{match.averageServeSpeed}</div>
              <div style={{ fontSize: '12px', color: '#4b5563' }}>Avg Serve</div>
            </div>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            paddingTop: '16px',
            borderTop: '1px solid #e2e8f0'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{match.breakPointsWon}/{match.breakPointsTotal}</div>
              <div style={{ fontSize: '12px', color: '#4b5563' }}>Break Points Won</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{match.breakGamesWon}/{match.breakGamesTotal}</div>
              <div style={{ fontSize: '12px', color: '#4b5563' }}>Break Games Won</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '15px',
        left: '10px',
        right: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1
      }}>
        <div style={{ fontSize: '12px', color: '#718096' }}>tensorcourt.com</div>
        <img src={logo} alt="TensorCourt Logo" style={{ height: '30px', width: 'auto', filter: 'brightness(0.8)' }} />
      </div>
    </div>
  );
});

export default ShareableMatchStats;