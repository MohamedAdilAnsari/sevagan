import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const ChatBot = () => {
  const { language, navigateToSection, openModal, donors, requests } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: language === 'ta' 
        ? 'வணக்கம்! நான் சேவகன் AI உதவி உதவியாளர். உங்களுக்கு இன்று எவ்வாறு உதவ முடியும்?' 
        : language === 'hi'
        ? 'नमस्ते! मैं सेवागन AI सहायक हूँ। आज मैं आपकी क्या मदद कर सकता हूँ?'
        : 'Hello! I am SEVAGAN AI Assistant. How can I help you save lives today?'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const quickPrompts = [
    { label: '🩸 Find Donors', query: 'How do I search for blood donors near me?' },
    { label: '🙋‍♂️ Register as Donor', query: 'How do I register as a blood donor?' },
    { label: '🚨 Request Emergency Blood', query: 'How to post an emergency blood requirement?' },
    { label: '🧪 Compatibility Chart', query: 'Which blood groups can donate to O positive?' },
    { label: '🔑 Reset Password', query: 'How to reset my password with OTP?' }
  ];

  const generateBotReply = async (userText) => {
    const text = userText.toLowerCase();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, language })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.reply) return data;
      }
    } catch (e) {
      console.warn('Backend chat API offline, fallback to client AI:', e);
    }

    // Client-side AI Fallback logic
    if (text.includes('find') || text.includes('search') || text.includes('donor')) {
      return {
        reply: `You can search for voluntary donors by blood group and city on our Find Donors section. Currently we have ${donors.length} active registered donors!`,
        actionLabel: 'Go to Find Donors',
        actionSection: 'find-donors'
      };
    } else if (text.includes('register') || text.includes('become') || text.includes('sign up')) {
      return {
        reply: 'Registering as a donor takes under 2 minutes! Anyone aged 18-65 in good health can register. Mobile verification via SMS OTP is required.',
        actionLabel: 'Register as Donor',
        actionSection: 'become-donor'
      };
    } else if (text.includes('emergency') || text.includes('request') || text.includes('urgent')) {
      return {
        reply: `Post an emergency request immediately. We have ${requests.length} active emergency broadcasts. Nearby registered donors are alerted right away.`,
        actionLabel: 'Post Request',
        actionSection: 'request-blood'
      };
    } else if (text.includes('compatib') || text.includes('o+') || text.includes('group') || text.includes('chart')) {
      return {
        reply: 'O Negative (O-) is the Universal Donor for RBCs. AB Positive (AB+) is the Universal Recipient. O+ can donate to O+, A+, B+, AB+.',
        actionLabel: 'View Compatibility Matrix',
        actionSection: 'home'
      };
    } else if (text.includes('otp') || text.includes('password') || text.includes('forgot') || text.includes('reset')) {
      return {
        reply: 'You can reset your password anytime by clicking "Forgot Password?" on the Login screen. A 4-digit verification code will be sent via SMS / Email.',
        actionLabel: 'Open Login / Reset',
        actionModal: 'login'
      };
    } else {
      return {
        reply: 'I am here to assist you with voluntary blood donation, emergency blood requests, donor search, and account verification on SEVAGAN!'
      };
    }
  };

  const handleSend = async (textToSend) => {
    const msgText = textToSend || inputMsg;
    if (!msgText.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: msgText };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMsg('');
    setIsTyping(true);

    setTimeout(async () => {
      const botResponse = await generateBotReply(msgText);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse.reply,
        actionLabel: botResponse.actionLabel,
        actionSection: botResponse.actionSection,
        actionModal: botResponse.actionModal
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="SEVAGAN AI Chatbot"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #E63946 0%, #B91C1C 100%)',
          color: '#ffffff',
          border: '2px solid rgba(255,255,255,0.3)',
          boxShadow: '0 8px 24px rgba(230, 57, 70, 0.4)',
          cursor: 'pointer',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.6rem',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {isOpen ? '✖' : '💬'}
        {!isOpen && (
          <span 
            style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: '#10B981',
              border: '2px solid #0f172a'
            }}
          />
        )}
      </button>

      {/* Chat Window Container */}
      {isOpen && (
        <div 
          className="glass-card chatbot-window"
          style={{
            position: 'fixed',
            bottom: '95px',
            right: '24px',
            width: '380px',
            maxWidth: 'calc(100vw - 32px)',
            height: '520px',
            maxHeight: 'calc(100vh - 120px)',
            borderRadius: '20px',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.15)',
            backdropFilter: 'blur(16px)'
          }}
        >
          {/* Header */}
          <div 
            style={{
              padding: '1rem 1.2rem',
              background: 'linear-gradient(90deg, #E63946 0%, #991B1B 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <div 
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem'
                }}
              >
                🩸
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>SEVAGAN AI Assistant</h4>
                <span style={{ fontSize: '0.75rem', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} /> 
                  Online 24/7 Support
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: '#ffffff', fontSize: '1.2rem', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>

          {/* Messages List */}
          <div 
            style={{
              flex: 1,
              padding: '1rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem'
            }}
          >
            {messages.map(msg => (
              <div 
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  className={`chat-bubble ${msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'}`}
                  style={{
                    maxWidth: '85%',
                    padding: '0.75rem 1rem',
                    borderRadius: msg.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                    fontSize: '0.9rem',
                    lineHeight: '1.4'
                  }}
                >
                  {msg.text}
                </div>

                {/* Optional Interactive Action Button */}
                {msg.actionLabel && (
                  <button
                    onClick={() => {
                      if (msg.actionSection) navigateToSection(msg.actionSection);
                      if (msg.actionModal) openModal(msg.actionModal);
                      setIsOpen(false);
                    }}
                    style={{
                      marginTop: '0.4rem',
                      padding: '0.35rem 0.8rem',
                      fontSize: '0.8rem',
                      borderRadius: '8px',
                      background: 'rgba(230, 57, 70, 0.2)',
                      border: '1px solid var(--primary-red)',
                      color: '#ffffff',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    👉 {msg.actionLabel}
                  </button>
                )}
              </div>
            ))}

            {isTyping && (
              <div style={{ alignSelf: 'flex-start', padding: '0.5rem 1rem', borderRadius: '12px', background: 'rgba(30, 41, 59, 0.8)', fontSize: '0.85rem', color: 'var(--text-sec)' }}>
                SEVAGAN Assistant is typing...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div 
            style={{
              padding: '0.5rem 0.8rem',
              background: 'rgba(15, 23, 42, 0.6)',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              gap: '0.4rem',
              overflowX: 'auto',
              whiteSpace: 'nowrap'
            }}
          >
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(qp.query)}
                style={{
                  padding: '0.25rem 0.65rem',
                  fontSize: '0.75rem',
                  borderRadius: '20px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'var(--text-main)',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            style={{
              padding: '0.75rem',
              background: 'rgba(15, 23, 42, 0.95)',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              gap: '0.5rem'
            }}
          >
            <input 
              type="text"
              className="search-input"
              placeholder="Ask about donors, requests, or blood info..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              style={{ flex: 1, padding: '0.6rem 0.9rem', fontSize: '0.88rem' }}
            />
            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ padding: '0.6rem 1rem', minHeight: 'unset', fontSize: '0.9rem' }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};
