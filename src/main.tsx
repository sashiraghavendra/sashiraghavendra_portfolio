import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Safely suppress benign WebSocket and HMR connectivity errors inside sandboxed development previews.
if (typeof window !== 'undefined') {
  const isWebsocketError = (msg: string) => {
    return (
      msg.includes('websocket') || 
      msg.includes('WebSocket') || 
      msg.includes('vite') || 
      msg.includes('HMR') ||
      msg.includes('ws://') ||
      msg.includes('wss://')
    );
  };

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason?.message || String(event.reason || '');
    if (isWebsocketError(reason)) {
      event.preventDefault();
      event.stopPropagation();
    }
  });

  window.addEventListener('error', (event) => {
    const msg = event.message || '';
    if (isWebsocketError(msg)) {
      event.preventDefault();
      event.stopPropagation();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

