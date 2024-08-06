import React from 'react';

export default function Home() {
  return (
    <div
      style={{
        backgroundColor: '#191414', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh'
      }}
    >
      <div
        style={{
          backgroundColor: '#1B1B1B', 
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
          width: '300px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            marginBottom: '20px',
            width: '100%',
          }}
        >
          <select
            style={{
              width: '100%',
              backgroundColor: '#1DB954', 
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '8px',
              fontSize: '16px',
              boxSizing: 'border-box', 
            }}
          >
            <option value="option1">Opção 1</option>
            <option value="option2">Opção 2</option>
            <option value="option3">Opção 3</option>
          </select>
        </div>
        <div
          style={{
            width: '100%',
          }}
        >
          <input
            type="text"
            placeholder="Digite algo..."
            style={{
              backgroundColor: '#1B1B1B', 
              color: 'white',
              border: '1px solid #1DB954', 
              borderRadius: '4px',
              width: '100%', 
              padding: '12px', 
              boxSizing: 'border-box',
              fontSize: '16px',
            }}
          />
        </div>
      </div>
    </div>
  );
}
