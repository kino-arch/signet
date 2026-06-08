import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, X, Send, Bot } from "lucide-react"

export function FloatingAIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{role: 'ai'|'user', text: string}[]>([
    { role: 'ai', text: "I'm your Resume Assistant. I can help rewrite bullets, generate a summary, or review your skills." }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { role: 'user', text: input }])
    setInput("")
    setIsTyping(true)

    // Simulate AI typing stream
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: "I've analyzed your request. Consider using stronger action verbs like 'Architected' or 'Spearheaded' to quantify your impact." }])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center border border-nordic-accent bg-nordic-accent text-nordic-bg shadow-[0_0_20px_rgba(var(--nordic-accent-rgb),0.4)] transition-transform hover:scale-105"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI Assistant"
      >
        <Sparkles className="size-5" />
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 flex w-80 flex-col overflow-hidden border border-nordic-border bg-nordic-surface/90 backdrop-blur-md shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-nordic-border bg-nordic-bg p-3">
              <div className="flex items-center gap-2">
                <Bot className="size-4 text-nordic-accent" />
                <span className="text-sm font-semibold tracking-wide text-nordic-text">AI Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-nordic-text-tertiary hover:text-nordic-text">
                <X className="size-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex h-72 flex-col gap-3 overflow-y-auto p-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] border px-3 py-2 text-sm ${
                    msg.role === 'user' 
                      ? 'border-nordic-accent/30 bg-nordic-accent/10 text-nordic-text' 
                      : 'border-nordic-border bg-nordic-bg text-nordic-text-secondary'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-1 border border-nordic-border bg-nordic-bg px-3 py-3">
                    <motion.div className="size-1.5 bg-nordic-text-tertiary" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0 }} />
                    <motion.div className="size-1.5 bg-nordic-text-tertiary" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} />
                    <motion.div className="size-1.5 bg-nordic-text-tertiary" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-nordic-border p-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask for suggestions..."
                  className="flex-1 border-none bg-transparent text-sm text-nordic-text placeholder-nordic-text-tertiary focus:outline-none focus:ring-0"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="p-1 text-nordic-accent disabled:opacity-50"
                >
                  <Send className="size-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
