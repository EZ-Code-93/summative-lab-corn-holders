import { useState } from "react";
import Ollama from "ollama";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import './Chat.css';
import NavBar from "../components/NavBar";

export default function OllamaChat() {
  // TODO: Add state for input, messages, loading, and error.
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = async () => {
    // TODO: Prevent empty submissions and duplicate submissions while loading.
    if (!input.trim() || loading) return;
    // TODO: Create a user message object.
    const userMessage = { role: "user", content: input };
    // TODO: Add the user message to the message thread.
    const nextMessages = [...messages, userMessage];
    // TODO: Clear the input, reset errors, and turn loading on.
    setMessages(nextMessages);
    setInput("");
    setError("");
    setLoading(true);
    // TODO: Call Ollama.chat with model "llama3.2" and the updated message history.
    try {
      const response = await Ollama.chat({
        model: "llama3.2",
        messages: nextMessages
      });
      const assistantMessage = response.message;
      // TODO: Add the assistant response to the message thread.
      setMessages([...nextMessages, assistantMessage]);
    } catch (err) {
      // TODO: Show a helpful error if the request fails.
      setError("Failed to get response from Ollama.");
    } finally {
      // TODO: Turn loading off after success or failure.
      setLoading(false);
    }
    
  };

  const clearChat = () => {
    // TODO: Clear messages, input, and error.
    setMessages([]);
    setInput("");
    setError("");
  };

  return (
    <>
      <NavBar />
      <section className="chat-shell">
      <div className="chat-card">
        <header className="chat-header">
          <h1>Corn Assistant</h1>
        </header>

        <p className="chat-guidance">
          I have a wealth of corn-related knowledge. Ask me anything about corn!
        </p>

        <div className="chat-input-area">
          <label htmlFor="chat-prompt" className="sr-only">
            Ask the Corn Assistant
          </label>
          {/* TODO: Set up textarea */}
          <textarea
            id="chat-prompt"
            rows="5"
            className="chat-textarea"
            placeholder="Ask about corn..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* TODO: Configure buttons */}
        <div className="chat-actions">
          <button 
            className="chat-button" 
            onClick={handleAsk}
            disabled ={!input.trim()}
            >
            Send
          </button>
          <button 
            className="chat-button chat-button-secondary" 
            onClick={clearChat}
            disabled ={loading || messages.length === 0}
            >
            Clear thread
          </button>
        </div>
          {error && <p className="chat-error">{error}</p>}
        <div className="message-list" aria-label="Conversation thread">
          {/* TODO: Render user and assistant messages here. */}
          {messages.map((message, index) => (
            <article key={index} className={`message message-${message.role}`}>
                <div className="message-label">
                  {message.role === "user" ? "You" : "Assistant"}
                </div>
                <div className="markdown-body">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </ReactMarkdown>
                </div>
            </article>
          ))}
          {/* TODO: Render a temporary Assistant / Thinking... message while loading. */}
          {loading && (
            <article className="message message-assistant">
              <div className="message-label">Assistant</div>
              <p>Thinking...</p>
            </article>
          )}

        </div>
      </div>
      </section>
    </>
  );
}