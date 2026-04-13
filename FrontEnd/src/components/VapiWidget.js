"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";

// ── Icons ─────────────────────────────────────────────────────────────────────

function ChatBubbleIcon({ className = "" }) {
  return (
    <svg className={cn("w-6 h-6", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function SendIcon({ className = "" }) {
  return (
    <svg className={cn("w-4 h-4", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function PhoneIcon({ className = "" }) {
  return (
    <svg className={cn("w-4 h-4", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.09 6.09l1.09-1.09a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MicIcon({ className = "" }) {
  return (
    <svg className={cn("w-4 h-4", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  );
}

function MicOffIcon({ className = "" }) {
  return (
    <svg className={cn("w-4 h-4", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="2" y1="2" x2="22" y2="22" />
      <path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" />
      <path d="M5 10v2a7 7 0 0 0 12 0" />
      <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" />
      <path d="M9 9v3a3 3 0 0 0 5.12 2.12" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  );
}

function PhoneOffIcon({ className = "" }) {
  return (
    <svg className={cn("w-4 h-4", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07" />
      <line x1="2" y1="2" x2="22" y2="22" />
      <path d="M3.14 3.14A19.79 19.79 0 0 0 2.22 12a2 2 0 0 0 2 1.72h3a2 2 0 0 0 1.72-2 12.84 12.84 0 0 0-.7-2.81 2 2 0 0 1 .45-2.11l1.27-1.27" />
    </svg>
  );
}

function XIcon({ className = "" }) {
  return (
    <svg className={cn("w-4 h-4", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function SpinnerIcon({ className = "" }) {
  return (
    <svg className={cn("w-4 h-4 animate-spin", className)} viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.37 0 0 5.37 0 12h4z" />
    </svg>
  );
}

// ── Typing dots ───────────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-brand-gold/60"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </div>
  );
}

// ── Waveform bars (voice call) ────────────────────────────────────────────────

function Waveform({ isSpeaking, volume }) {
  const bars = 16;
  return (
    <div className="flex items-center justify-center gap-[2px] h-6">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.span
          key={i}
          className="w-[2px] rounded-full bg-brand-gold"
          animate={{
            height: isSpeaking
              ? `${4 + Math.abs(Math.sin(i * 0.6)) * 14 + volume * 20}px`
              : "3px",
            opacity: isSpeaking ? 1 : 0.35,
          }}
          transition={{ duration: 0.08, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

// ── Message bubble ────────────────────────────────────────────────────────────

function Message({ msg }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[100%] rounded-2xl px-3.5 py-2.5 text-[0.8rem] leading-relaxed",
          isUser
            ? "bg-brand-gold text-brand-dark font-medium rounded-br-sm"
            : "bg-white/6 border border-white/8 text-slate-200 rounded-bl-sm"
        )}
      >
        {msg.text}
        {msg.source === "voice" && (
          <span className="ml-1.5 text-[10px] opacity-50">
            {isUser ? "🎤" : "🔊"}
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ── Main widget ───────────────────────────────────────────────────────────────

const GREETING = "Hi there! I'm the Northspec AI assistant. I can answer questions about our services, pricing, and process, or you can tap the phone icon to speak with me directly. How can I help you today?";

const INACTIVITY_MS = 60_000; // 1 minute

let msgId = 0;
const newMsg = (role, text, source = "text") => ({
  id: ++msgId,
  role,
  text,
  source,
});

export default function VapiWidget() {
  const pathname     = usePathname();
  const vapiRef      = useRef(null);
  const assistantRef = useRef(null);
  const sessionRef   = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef     = useRef(null);
  const widgetRef      = useRef(null);
  const inactivityRef  = useRef(null);

  const [panelOpen,  setPanelOpen]  = useState(false);
  const [messages,   setMessages]   = useState([]);
  const [inputText,  setInputText]  = useState("");
  const [textLoading, setTextLoading] = useState(false);

  const [callStatus, setCallStatus] = useState("idle"); // idle | connecting | active
  const [isMuted,    setIsMuted]    = useState(false);
  const [volume,     setVolume]     = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // ── Close panel on outside click ─────────────────────────────────────────
  useEffect(() => {
    if (!panelOpen) return;
    const handler = (e) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target)) {
        setPanelOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [panelOpen]);

  // ── Show greeting when panel opens with an empty chat ────────────────────
  useEffect(() => {
    if (panelOpen && messages.length === 0) {
      setMessages([newMsg("assistant", GREETING)]);
    }
  }, [panelOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Inactivity timer  -  restart session after 1 min of no user input ──────
  const resetInactivityTimer = useCallback(() => {
    clearTimeout(inactivityRef.current);
    inactivityRef.current = setTimeout(() => {
      setMessages([newMsg("assistant", GREETING)]);
      sessionRef.current = null;
    }, INACTIVITY_MS);
  }, []);

  // Start/reset timer whenever the user sends a message
  useEffect(() => {
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
    if (lastUserMsg) resetInactivityTimer();
    return () => clearTimeout(inactivityRef.current);
  }, [messages, resetInactivityTimer]);

  // ── Clear chat on route change ───────────────────────────────────────────
  useEffect(() => {
    setMessages([]);
    setInputText("");
    sessionRef.current = null;
    if (vapiRef.current && callStatus !== "idle") vapiRef.current.stop();
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Init Vapi SDK from backend config ────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch(`/api/vapi/config`).then((r) => r.json()),
      import("@vapi-ai/web").then((m) => m.default),
    ]).then(([{ publicKey, assistantId }, Vapi]) => {
        if (cancelled || !publicKey || !assistantId) return;
        assistantRef.current = assistantId;

        const vapi = new Vapi(publicKey);
        vapiRef.current = vapi;

        vapi.on("call-start", () => setCallStatus("active"));
        vapi.on("call-end",   () => {
          setCallStatus("idle");
          setIsMuted(false);
          setVolume(0);
          setIsSpeaking(false);
        });
        vapi.on("speech-start",  ()  => setIsSpeaking(true));
        vapi.on("speech-end",    ()  => setIsSpeaking(false));
        vapi.on("volume-level",  (v) => setVolume(v));

        // Capture voice transcripts → add to chat log
        vapi.on("message", (msg) => {
          if (msg.type === "transcript" && msg.transcriptType === "final") {
            setMessages((prev) => [...prev, newMsg(msg.role, msg.transcript, "voice")]);
          }
        });
      })
      .catch(() => {});

    return () => { cancelled = true; vapiRef.current?.stop(); };
  }, []);

  // ── Auto-scroll ──────────────────────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, textLoading]);

  // ── Focus input when panel opens ─────────────────────────────────────────
  useEffect(() => {
    if (panelOpen) setTimeout(() => inputRef.current?.focus(), 200);
  }, [panelOpen]);

  // ── Send text message ─────────────────────────────────────────────────────
  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim();
    if (!trimmed || textLoading) return;

    setMessages((prev) => [...prev, newMsg("user", trimmed)]);
    setInputText("");
    setTextLoading(true);

    try {
      // Build history from current messages so the AI has full context
      // and doesn't re-introduce itself
      const history = messages
        .filter((m) => m.source !== "voice")
        .map((m) => ({ role: m.role, content: m.text }));

      const res = await fetch(`/api/vapi/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history, sessionId: sessionRef.current }),
      });
      const data = await res.json();
      if (data.sessionId) sessionRef.current = data.sessionId;

      if (data.reply) {
        setMessages((prev) => [...prev, newMsg("assistant", data.reply)]);
      } else {
        // Backend returned an error or empty reply  -  show it so the user isn't left hanging
        const errText = data.error ?? "Something went wrong. Please try again.";
        setMessages((prev) => [...prev, newMsg("assistant", errText)]);
      }
    } catch {
      setMessages((prev) => [...prev, newMsg("assistant", "Sorry, I couldn't reach the server. Please try again.")]);
    } finally {
      setTextLoading(false);
    }
  }, [textLoading]);

  // ── Voice call toggle ─────────────────────────────────────────────────────
  const toggleCall = useCallback(() => {
    if (!vapiRef.current || !assistantRef.current) return;
    if (callStatus === "idle") {
      setCallStatus("connecting");
      vapiRef.current.start(assistantRef.current).catch((err) => {
        console.error("[vapi] start error:", err);
        setCallStatus("idle");
      });
    } else {
      vapiRef.current.stop();
    }
  }, [callStatus]);

  const toggleMute = useCallback(() => {
    if (!vapiRef.current || callStatus !== "active") return;
    const next = !isMuted;
    vapiRef.current.setMuted(next);
    setIsMuted(next);
  }, [isMuted, callStatus]);

  const isCallActive     = callStatus === "active";
  const isCallConnecting = callStatus === "connecting";

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* ── Chat panel ── */}
      <AnimatePresence>
        {panelOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{    opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="w-[340px] flex flex-col rounded-2xl overflow-hidden border border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.7)]"
            style={{ background: "rgba(10,10,10,0.97)", backdropFilter: "blur(24px)" }}
          >

            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/8">
              <div className="relative flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-gold to-[#B8860B] flex items-center justify-center">
                  <ChatBubbleIcon className="w-4 h-4 text-brand-dark" />
                </div>
                {isCallActive && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#0a0a0a]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white leading-none">Northspec AI</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {isCallActive ? "On a call" : isCallConnecting ? "Connecting…" : "Ask anything"}
                </p>
              </div>
              {/* Voice call button */}
              <button
                onClick={toggleCall}
                disabled={isCallConnecting}
                title={isCallActive ? "End call" : "Start voice call"}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all flex-shrink-0",
                  isCallActive
                    ? "bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30"
                    : "bg-white/6 border border-white/10 text-slate-400 hover:text-brand-gold hover:border-brand-gold/40 hover:bg-brand-gold/8"
                )}
              >
                {isCallConnecting ? (
                  <SpinnerIcon className="w-3.5 h-3.5" />
                ) : isCallActive ? (
                  <PhoneOffIcon className="w-3.5 h-3.5" />
                ) : (
                  <PhoneIcon className="w-3.5 h-3.5" />
                )}
              </button>
              {/* Close */}
              <button
                onClick={() => setPanelOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/8 transition-all flex-shrink-0"
              >
                <XIcon />
              </button>
            </div>

            {/* Voice call bar */}
            <AnimatePresence>
              {isCallActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center gap-3 px-4 py-2.5 bg-brand-gold/5 border-b border-brand-gold/10">
                    <div className="flex-1">
                      <Waveform isSpeaking={isSpeaking} volume={volume} />
                    </div>
                    <button
                      onClick={toggleMute}
                      className={cn(
                        "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium border transition-all",
                        isMuted
                          ? "border-brand-gold/40 bg-brand-gold/10 text-brand-gold"
                          : "border-white/10 bg-white/5 text-slate-400 hover:text-white"
                      )}
                    >
                      {isMuted ? <MicOffIcon className="w-3 h-3" /> : <MicIcon className="w-3 h-3" />}
                      {isMuted ? "Unmute" : "Mute"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-2.5" style={{ maxHeight: 460, minHeight: 280 }}>
              {messages.length === 0 && !textLoading && (
                <div className="flex flex-col items-center justify-center h-full gap-2 opacity-50 py-8">
                  <ChatBubbleIcon className="w-8 h-8 text-brand-gold" />
                  <p className="text-xs text-slate-500 text-center">
                    Type a message or tap the phone<br />to start a voice call.
                  </p>
                </div>
              )}
              {messages.map((msg) => (
                <Message key={msg.id} msg={msg} />
              ))}
              {textLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/6 border border-white/8 rounded-2xl rounded-bl-sm">
                    <TypingDots />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-white/8">
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(inputText); }}
                className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 focus-within:border-brand-gold/40 transition-colors"
              >
                <input
                  ref={inputRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type a message…"
                  className="flex-1 bg-transparent text-[0.82rem] text-white placeholder:text-slate-600 outline-none"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || textLoading}
                  className="w-7 h-7 rounded-lg flex items-center justify-center bg-brand-gold text-brand-dark disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#B8860B] transition-colors flex-shrink-0"
                >
                  {textLoading ? <SpinnerIcon className="w-3 h-3" /> : <SendIcon />}
                </button>
              </form>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB toggle button ── */}
      <motion.button
        onClick={() => setPanelOpen((v) => !v)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label={panelOpen ? "Close chat" : "Open chat"}
        className={cn(
          "relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark",
          "bg-gradient-to-br from-brand-gold to-[#B8860B] shadow-[0_0_24px_rgba(198,166,104,0.35)] border border-brand-gold/20"
        )}
      >
        {/* Idle ping */}
        {!panelOpen && (
          <span className="absolute inset-0 rounded-full bg-brand-gold/20 animate-ping" />
        )}
        {/* Unread dot when panel is closed and there are messages */}
        {!panelOpen && messages.length > 0 && (
          <span className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-white border-2 border-brand-dark" />
        )}
        <AnimatePresence mode="wait">
          {panelOpen ? (
            <motion.span key="x" initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.15 }}>
              <XIcon className="w-5 h-5 text-brand-dark" />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -45, opacity: 0 }} transition={{ duration: 0.15 }}>
              <ChatBubbleIcon className="w-5 h-5 text-brand-dark" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

    </div>
  );
}
