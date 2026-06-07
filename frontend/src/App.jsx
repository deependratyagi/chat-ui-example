import { AssistantRuntimeProvider, ThreadPrimitive } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import InsuranceWidget from "./InsuranceWidget";
import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

  :root {
    --bg: #0e0e11;
    --surface: #16161a;
    --surface-2: #1e1e24;
    --border: rgba(255,255,255,0.07);
    --accent: #c8b8ff;
    --accent-glow: rgba(200,184,255,0.15);
    --text-primary: #f0eeff;
    --text-secondary: #8b8a9b;
    --user-bubble: #2a2440;
    --ai-bubble: #1e1e24;
    --radius: 18px;
    --radius-sm: 10px;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: var(--bg);
    font-family: 'DM Sans', sans-serif;
    color: var(--text-primary);
    -webkit-font-smoothing: antialiased;
  }

  .chat-shell {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: stretch;
    background: var(--bg);
    background-image:
      radial-gradient(ellipse 60% 40% at 50% -10%, rgba(200,184,255,0.08) 0%, transparent 60%);
  }

  .chat-panel {
    width: 100%;
    max-width: 680px;
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--surface);
    border-left: 1px solid var(--border);
    border-right: 1px solid var(--border);
    position: relative;
  }

  /* Header */
  .chat-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 18px 24px;
    border-bottom: 1px solid var(--border);
    background: var(--surface);
    position: relative;
    z-index: 10;
  }

  .header-orb {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: linear-gradient(135deg, #c8b8ff, #8b7de8);
    box-shadow: 0 0 16px rgba(200,184,255,0.4);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header-orb svg {
    width: 16px;
    height: 16px;
    fill: #0e0e11;
  }

  .header-text h1 {
    font-family: 'Instrument Serif', serif;
    font-size: 17px;
    font-weight: 400;
    color: var(--text-primary);
    letter-spacing: 0.01em;
  }

  .header-text p {
    font-size: 11.5px;
    color: var(--text-secondary);
    font-weight: 300;
    letter-spacing: 0.02em;
  }

  .status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #6ee89a;
    box-shadow: 0 0 6px #6ee89a;
    margin-top: 2px;
    display: inline-block;
    margin-right: 5px;
  }

  /* Viewport */
  [data-radix-scroll-area-viewport],
  .thread-viewport {
    flex: 1;
    overflow-y: auto;
    padding: 28px 24px;
    scroll-behavior: smooth;
  }

  [data-radix-scroll-area-viewport]::-webkit-scrollbar,
  .thread-viewport::-webkit-scrollbar { width: 4px; }
  [data-radix-scroll-area-viewport]::-webkit-scrollbar-track,
  .thread-viewport::-webkit-scrollbar-track { background: transparent; }
  [data-radix-scroll-area-viewport]::-webkit-scrollbar-thumb,
  .thread-viewport::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.08);
    border-radius: 8px;
  }

  /* Empty state */
  [data-aui-thread-welcome-center],
  .thread-empty,
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 12px;
    padding: 40px;
    text-align: center;
  }

  .empty-icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--surface-2);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
  }

  .empty-icon svg {
    width: 22px;
    height: 22px;
    stroke: var(--accent);
    fill: none;
  }

  [data-aui-thread-welcome-center] h2 {
    font-family: 'Instrument Serif', serif;
    font-size: 26px;
    font-weight: 400;
    color: var(--text-primary);
    letter-spacing: -0.01em;
  }

  [data-aui-thread-welcome-center] p {
    font-size: 14px;
    color: var(--text-secondary);
    font-weight: 300;
    line-height: 1.6;
    max-width: 320px;
  }

  /* Messages */
  [data-aui-message] {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    animation: fadeUp 0.3s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  [data-aui-message][data-role="user"] {
    align-items: flex-end;
  }

  [data-aui-message][data-role="assistant"] {
    align-items: flex-start;
  }

  [data-aui-message-content] {
    max-width: 80%;
    padding: 12px 16px;
    border-radius: var(--radius);
    font-size: 14.5px;
    line-height: 1.65;
    font-weight: 400;
  }

  [data-aui-message][data-role="user"] [data-aui-message-content] {
    background: var(--user-bubble);
    color: var(--text-primary);
    border-bottom-right-radius: 6px;
    border: 1px solid rgba(200,184,255,0.12);
  }

  [data-aui-message][data-role="assistant"] [data-aui-message-content] {
    background: var(--ai-bubble);
    color: var(--text-primary);
    border-bottom-left-radius: 6px;
    border: 1px solid var(--border);
  }

  /* Assistant label */
  [data-aui-message][data-role="assistant"]::before {
    content: 'Assistant';
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 6px;
    padding-left: 2px;
  }

  /* Composer */
  .composer-wrap {
    border-top: 1px solid var(--border);
    padding: 16px 20px 20px;
    background: var(--surface);
  }

  [data-aui-composer-root] {
    display: flex;
    align-items: flex-end;
    gap: 10px;
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 10px 14px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  [data-aui-composer-root]:focus-within {
    border-color: rgba(200,184,255,0.3);
    box-shadow: 0 0 0 3px rgba(200,184,255,0.06);
  }

  [data-aui-composer-input] {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    resize: none;
    color: var(--text-primary);
    font-family: 'DM Sans', sans-serif;
    font-size: 14.5px;
    font-weight: 300;
    line-height: 1.6;
    min-height: 24px;
    max-height: 160px;
    overflow-y: auto;
  }

  [data-aui-composer-input]::placeholder {
    color: var(--text-secondary);
  }

  [data-aui-composer-send-button] {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: linear-gradient(135deg, #c8b8ff, #8b7de8);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: opacity 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
    box-shadow: 0 2px 8px rgba(200,184,255,0.2);
  }

  [data-aui-composer-send-button]:hover:not(:disabled) {
    opacity: 0.9;
    transform: scale(1.05);
    box-shadow: 0 4px 14px rgba(200,184,255,0.35);
  }

  [data-aui-composer-send-button]:active:not(:disabled) {
    transform: scale(0.97);
  }

  [data-aui-composer-send-button]:disabled {
    opacity: 0.3;
    cursor: default;
    box-shadow: none;
  }

  [data-aui-composer-send-button] svg {
    width: 15px;
    height: 15px;
    stroke: #0e0e11;
    fill: none;
    stroke-width: 2.2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .composer-hint {
    margin-top: 8px;
    text-align: center;
    font-size: 11px;
    color: var(--text-secondary);
    font-weight: 300;
    letter-spacing: 0.02em;
    opacity: 0.6;
  }

  /* Thinking / streaming indicator */
  [data-aui-message][data-status="in_progress"] [data-aui-message-content]::after {
    content: '●●●';
    font-size: 10px;
    letter-spacing: 3px;
    color: var(--accent);
    animation: pulse 1.2s infinite;
    margin-left: 6px;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.3; }
    50%       { opacity: 1; }
  }
`;

export default function App() {
  const runtime = useChatRuntime({
    api: "http://localhost:5000/api/chat",
  });
  
  const [showInsuranceWidget, setShowInsuranceWidget] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Monitor for insurance-related keywords in assistant responses
  useEffect(() => {
    if (!runtime) return;

    const checkMessages = () => {
      // Access the thread messages if available
      const messages = runtime.thread?.messages;
      if (!messages || messages.length === 0) return;

      // Check the last assistant message for insurance-related keywords
      const lastMessage = messages[messages.length - 1];
      if (lastMessage?.role === "assistant") {
        const messageContent = lastMessage.content?.[0]?.text || "";
        const insuranceKeywords = ["insurance", "protection", "coverage", "policy", "buy insurance", "secure your future"];
        
        const shouldShowWidget = insuranceKeywords.some(keyword =>
          messageContent.toLowerCase().includes(keyword)
        );
        
        setShowInsuranceWidget(shouldShowWidget);
      }
    };

    // Check immediately and set up listener
    checkMessages();
    
    // You can also listen to thread updates if the runtime provides events
    const interval = setInterval(checkMessages, 500);
    return () => clearInterval(interval);
  }, [runtime?.thread?.messages]);

  // Send message to backend
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const userMessage = { role: "user", content: inputValue };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = { role: "assistant", content: data.response || data.error || "No response" };
      setMessages([...updatedMessages, assistantMessage]);
      
      // Check for insurance keywords
      const insuranceKeywords = ["insurance", "protection", "coverage", "policy", "buy insurance", "secure your future"];
      const shouldShow = insuranceKeywords.some(kw => data.response?.toLowerCase().includes(kw));
      setShowInsuranceWidget(shouldShow);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages([...updatedMessages, { role: "assistant", content: `Sorry, I encountered an error: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="chat-shell">
        <div className="chat-panel">

          {/* Header */}
          <div className="chat-header">
            <div className="header-orb">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8 2 5 5 5 9c0 2.4 1.1 4.5 2.8 5.9L7 20h10l-.8-5.1C17.9 13.5 19 11.4 19 9c0-4-3-7-7-7z"/>
              </svg>
            </div>
            <div className="header-text">
              <h1>Assistant</h1>
              <p><span className="status-dot" />Online · Ready to help</p>
            </div>
          </div>

          {/* Thread */}
          <AssistantRuntimeProvider runtime={runtime}>
            <ThreadPrimitive.Root style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
              <ThreadPrimitive.Viewport className="thread-viewport">
                {messages.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">
                      <svg viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    </div>
                    <p>Ask me anything. I'm here to assist with ideas, answers, and analysis.</p>
                  </div>
                ) : (
                  <>
                    {messages.map((msg, idx) => (
                      <div key={idx} style={{ display: "flex", flexDirection: "column", marginBottom: "20px", animation: "fadeUp 0.3s ease both", alignItems: msg.role === "user" ? "flex-end" : "flex-start" }}>
                        {msg.role === "assistant" && <span style={{ fontSize: "10.5px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "6px", paddingLeft: "2px" }}>Assistant</span>}
                        <div style={{ maxWidth: "80%", padding: "12px 16px", borderRadius: "var(--radius)", fontSize: "14.5px", lineHeight: "1.65", fontWeight: 400, background: msg.role === "user" ? "var(--user-bubble)" : "var(--ai-bubble)", color: "var(--text-primary)", border: msg.role === "user" ? "1px solid rgba(200,184,255,0.12)" : "1px solid var(--border)", borderBottomRightRadius: msg.role === "user" ? "6px" : "var(--radius)", borderBottomLeftRadius: msg.role === "assistant" ? "6px" : "var(--radius)" }}>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    {showInsuranceWidget && (
                      <InsuranceWidget onClose={() => setShowInsuranceWidget(false)} />
                    )}
                  </>
                )}
              </ThreadPrimitive.Viewport>
              <div className="composer-wrap">
                <form onSubmit={handleSendMessage} style={{ display: "flex", alignItems: "flex-end", gap: "10px", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "10px 14px", transition: "border-color 0.2s ease, box-shadow 0.2s ease" }}>
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif", fontSize: "14.5px", fontWeight: 300, opacity: isLoading ? 0.6 : 1 }} 
                  />
                  <button 
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    style={{ width: "34px", height: "34px", borderRadius: "10px", background: "linear-gradient(135deg, #c8b8ff, #8b7de8)", border: "none", cursor: isLoading || !inputValue.trim() ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, opacity: isLoading || !inputValue.trim() ? 0.3 : 1 }}>
                    <svg viewBox="0 0 24 24" style={{ width: "15px", height: "15px", stroke: "#0e0e11", fill: "none", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round" }}>
                      <path d="M3 13l18-9-18 20v-11z" />
                    </svg>
                  </button>
                </form>
                <p className="composer-hint">Press Enter to send · Shift+Enter for new line</p>
              </div>
            </ThreadPrimitive.Root>
          </AssistantRuntimeProvider>

        </div>
      </div>
    </>
  );
}