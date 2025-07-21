// src/components/ChatWidget.jsx - VERSIÓN CON ENLACES FUNCIONALES

import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Trash2, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { plans } from '../data/plansData.jsx'; // <-- ¡NUEVO! Importamos los datos de los planes

const initialDelay = 3000; // 🔥 CORRECCIÓN: Restaurado a 3 segundos para una pausa de tipeo visible.

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  // --- ESTADO DE LA CONVERSACIÓN ---
  const [userName, setUserName] = useState(() => localStorage.getItem('deviChatUserName') || '');
  const [chatStage, setChatStage] = useState(() => {
    // Determina en qué punto de la conversación estamos al cargar
    const consentGiven = localStorage.getItem('privacyConsentGiven') === 'true';
    if (consentGiven) return 'chatting'; // Si ya dio consentimiento, puede chatear
    
    const nameGiven = localStorage.getItem('deviChatUserName');
    if (nameGiven) return 'awaiting_consent'; // Si dio su nombre pero no consentimiento

    return 'initial'; // Estado inicial, no sabemos nada del usuario
  });
  const [consentDeclinedOnce, setConsentDeclinedOnce] = useState(false);

  const [messages, setMessages] = useState(() => {
    try {
      const savedMessages = localStorage.getItem('deviChatHistory');
      if (savedMessages) {
        const parsed = JSON.parse(savedMessages);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (error) {
      console.error("Error al cargar el historial del chat:", error);
    }
    return [{ id: Date.now(), role: 'model', content: '👋 ¡Hola! Soy Devi, la asistente IA de EdduAInnova. 💁‍♀️ ¿Cómo puedo ayudarte?' }];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // 🔥 SOLUCIÓN COMPLETA: Mapeo de palabras clave a enlaces
  // Mapeo más específico para controlar qué es un botón y qué es un enlace de texto.
  const linkMappings = {
    // Botón principal de agendamiento (morado)
    'agendar reunión': { url: '/agendar-reunion?type=button&style=primary', text: 'Agendar Reunión' },
    
    // Botón de WhatsApp (verde)
    'whatsapp': { url: `https://wa.me/573185462265?text=${encodeURIComponent("Hola! Estoy interesado en sus servicios.")}&type=button&style=whatsapp`, text: 'Contactar por WhatsApp' },

    // Botón de Email (azul)
    'email': { url: `mailto:edduainnova@gmail.com?subject=${encodeURIComponent("Solicitud de Información")}&type=button&style=email`, text: 'Enviar Correo' },

    // Enlaces de texto normales
    'página de agendamiento': { url: '/agendar-reunion', text: 'página de agendamiento' },
    'agendar una consulta': { url: '/agendar-reunion', text: 'agendar una consulta' },
    'agendamiento': { url: '/agendar-reunion' },
    'términos y condiciones': { url: '/terminos-y-condiciones' },
    'política de privacidad': { url: '/politica-de-privacidad' },
    'edduainnova@gmail.com': { url: 'mailto:edduainnova@gmail.com' },
    'facebook': { url: 'https://www.facebook.com/Edduainnova' },
    'instagram': { url: 'https://www.instagram.com/edduainnova/' },
    'twitter': { url: 'https://x.com/EdduAInnova' },
    'x': { url: 'https://x.com/EdduAInnova' },
    'github': { url: 'https://github.com/EdduAInnova' },

    // Botones para planes
    'plan básico': { url: '/plan/basico?type=button', text: 'Ver Plan Básico' },
    'plan profesional': { url: '/plan/profesional?type=button', text: 'Ver Plan Profesional' },
    'plan premium': { url: '/plan/premium?type=button', text: 'Ver Plan Premium' },
  };

  // 🚀 FUNCIÓN CORREGIDA Y ROBUSTA: Crea enlaces Markdown sin corromper los existentes.
  const createLinkedText = (text) => {
    // Esta regex encuentra enlaces Markdown existentes para protegerlos.
    const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const placeholders = [];
    let placeholderIndex = 0;

    // 1. Reemplazamos temporalmente los enlaces existentes con placeholders.
    const textWithPlaceholders = text.replace(markdownLinkRegex, (match) => {
      placeholders.push(match);
      return `__PLACEHOLDER_${placeholderIndex++}__`;
    });

    let processedText = textWithPlaceholders;

    // 2. Ordenamos las claves (más largas primero) y creamos los nuevos enlaces.
    const sortedKeys = Object.keys(linkMappings).sort((a, b) => b.length - a.length);

    sortedKeys.forEach(keyword => {
      const mapping = linkMappings[keyword];
      const url = typeof mapping === 'object' ? mapping.url : mapping;
      const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      // 🔥 ¡MEJORA! Usamos límites de palabra (\b) solo para keywords que parecen palabras o frases.
      // Esto evita romper la detección de URLs o emails que contienen caracteres especiales como '@' o '/'.
      const useWordBoundary = !/[@/:]/.test(keyword);
      const regex = useWordBoundary ? new RegExp(`\\b${escapedKeyword}\\b`, 'gi') : new RegExp(escapedKeyword, 'gi');
      processedText = processedText.replace(regex, (match) => {
        const linkText = typeof mapping === 'object' ? (mapping.text || match) : match;
        // 🎯 ¡CORRECCIÓN DEFINITIVA! Ahora sí creamos el enlace en formato Markdown.
        return `[${linkText}](${url})`;
      });
    });

    // 3. Restauramos los enlaces originales que habíamos protegido.
    return processedText.replace(/__PLACEHOLDER_(\d+)__/g, (match, index) => {
      return placeholders[parseInt(index, 10)];
    });
  };

  const initialSuggestions = [
    "¿Qué plan me recomiendas?",
    "Diferencia entre Profesional y Premium", 
    "Quiero una web desde cero"
  ];

  const requestClearConfirmation = () => {
    if (messages.some(m => m.type === 'confirmation')) return;

    setMessages(prev => [
      ...prev,
      {
        role: 'model',
        type: 'confirmation',
        content: '¿Realmente quieres borrar el historial de nuestra conversació?'
      }
    ]);
  };

  const handleConfirmClear = (confirm) => {
    if (confirm) {
      // Limpiamos todo el estado, no solo los mensajes
      localStorage.removeItem('deviChatHistory');
      localStorage.removeItem('deviChatUserName');
      localStorage.removeItem('privacyConsentGiven');

      setMessages([
        { id: Date.now(), role: 'model', content: '👋 ¡Hola! Soy Devi, la asistente IA de EdduAInnova. 💁‍♀️ ¿Cómo puedo ayudarte?' }
      ]);
      setUserName('');
      setChatStage('initial');
      setConsentDeclinedOnce(false);
    } else {
      setMessages(prev => prev.filter(m => m.type !== 'confirmation'));
    }
  };

  // LÓGICA MEJORADA: Maneja la respuesta al consentimiento de privacidad.
  const handleConsent = (accepted) => {
    const newMessages = messages.filter(m => !m.isConsentRequest);

    if (accepted) {
      localStorage.setItem('privacyConsentGiven', 'true');
      setChatStage('chatting');
      setConsentDeclinedOnce(false); // Reseteamos el intento de rechazo

      // 1. Mensaje de aceptación del usuario mejorado.
      const userAcceptanceMessage = { id: Date.now(), role: 'user', content: 'Sí, estoy de acuerdo con la Política de Privacidad ✅' };
      setMessages([...newMessages, userAcceptanceMessage]);

      // 2. Preparamos la respuesta de Devi y la disparamos con el efecto de tipeo.
      setIsLoading(true);

      const followUpQuestions = [
        `Ahora sí, cuéntame, ¿a qué te dedicas? 🧑‍💻`,
        `Perfecto. Dime, ¿cuál es el motivo de tu visita hoy? 🗺️`,
        `¡Excelente! Para empezar, ¿qué te trae por aquí? ✨`
      ];
      const randomQuestion = followUpQuestions[Math.floor(Math.random() * followUpQuestions.length)];
      const modelResponseContent = `¡Gracias, ${userName}! 🙏 ${randomQuestion}`;

      setTimeout(() => {
        setIsLoading(false);
        const newMessageId = Date.now();
        setMessages(prev => [...prev, { id: newMessageId, role: 'model', content: '' }]);
        setTextToStream({ content: modelResponseContent, id: newMessageId });
      }, initialDelay);
    } else {
      if (consentDeclinedOnce) {
        // Segundo "No": El bot se despide cortésmente.
        setMessages([
          ...newMessages,
          { id: Date.now(), role: 'user', content: 'No, sigo sin estar de acuerdo ❌' },
          { id: Date.now(), role: 'model', content: `De acuerdo, ${userName}. Respeto tu decisión. No podré continuar con la asistencia personalizada. Si cambias de idea, reinicia el chat. ¡Que tengas un excelente día! 👋` }
        ]);
      } else {
        // Primer "No": El bot intenta persuadir.
        setConsentDeclinedOnce(true);
        setMessages([
          ...newMessages,
          { id: Date.now(), role: 'user', content: 'No, no estoy de acuerdo ❌' },
          { id: Date.now(), role: 'model', content: `Entendido. Comprendo tu preocupación por la privacidad. 🛡️ Para poder ayudarte y guardar nuestro progreso, necesito tu consentimiento. No usaré tus datos para nada más. ¿Te gustaría reconsiderarlo?`, isConsentRequest: true }
        ]);
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Guardamos el historial si hay más que el mensaje inicial y no estamos en una fase de confirmación
    if (!messages.some(m => m.type === 'confirmation')) {
      try {
        if (messages.length > 1) {
          localStorage.setItem('deviChatHistory', JSON.stringify(messages));
        }
      } catch (error) {
        console.error("Error al guardar el historial del chat:", error);
      }
    }
  }, [messages]);

  useEffect(() => {
    // Solo hacemos scroll si el chat está abierto para evitar movimientos inesperados
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen]);

  useEffect(() => {
    // Si el chat se abre y estamos en la etapa de pedir consentimiento, lo pedimos.
    if (isOpen && chatStage === 'awaiting_consent' && messages.length <= 1) {
      const consentMessage = {
        id: Date.now(), role: 'model', content: `¡Hola de nuevo, ${userName}! 👋 Para continuar, necesito que aceptes nuestra Política de Privacidad. ¿Estás de acuerdo?`, isConsentRequest: true
      };
      setTimeout(() => setMessages(prev => [...prev, consentMessage]), 500);
    }

    if (isOpen && !isLoading) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, isLoading]);

  useEffect(() => {
    // Si acabamos de obtener el nombre (y aún no hemos pedido consentimiento), pedimos consentimiento.
    const consentAlreadyRequested = messages.some(m => m.isConsentRequest);
    if (chatStage === 'awaiting_consent' && !consentAlreadyRequested) {
      // Pequeña pausa para que no sea tan abrupto después del saludo de la IA
      const consentTimeout = setTimeout(() => {
        const consentMessage = {
          id: Date.now(),
          role: 'model',
          content: `Para poder continuar, te invito a leer nuestra política de privacidad y a que la aceptes. ¿Estás de acuerdo?`,
          isConsentRequest: true
        };
        setMessages(prev => [...prev, consentMessage]);
      }, 1500); // Pausa de 1.5s
      return () => clearTimeout(consentTimeout);
    }
  }, [chatStage, messages]);

  // --- ✨ ¡NUEVO! EFECTO DE ESCRITURA LETRA POR LETRA ---
  const [textToStream, setTextToStream] = useState({ content: '', id: null });

  useEffect(() => {
    if (textToStream.content && textToStream.id) {
      const targetMessageId = textToStream.id;
      const fullContent = textToStream.content;

      // 🔥 SOLUCIÓN: Se procesa el texto en partes para no romper los enlaces Markdown durante el tipeo.
      const parts = fullContent.split(/(\[.*?\]\(.*?\))/g).filter(Boolean);
      
      let currentPartIndex = 0;
      let currentCharIndex = 0;
      let displayedContent = "";

      // Aseguramos que el mensaje existe y está vacío antes de empezar.
      setMessages(prev => prev.map(m => m.id === targetMessageId ? { ...m, content: '' } : m));

      const typingInterval = setInterval(() => {
        if (currentPartIndex >= parts.length) {
          clearInterval(typingInterval);
          const sound = new Audio('/notification.mp3');
          sound.play().catch(e => console.error("Error al reproducir sonido:", e));
          setTextToStream({ content: '', id: null });
          return;
        }

        const currentPart = parts[currentPartIndex];
        const isLink = currentPart.startsWith('[') && currentPart.endsWith(')');

        if (isLink) {
          // Si es un enlace, lo añadimos de golpe para no romper el Markdown.
          displayedContent += currentPart;
          currentPartIndex++;
          currentCharIndex = 0;
        } else {
          // Si es texto normal, lo añadimos letra por letra.
          displayedContent += currentPart[currentCharIndex];
          currentCharIndex++;
          if (currentCharIndex >= currentPart.length) {
            currentPartIndex++;
            currentCharIndex = 0;
          }
        }

        // Actualizamos el contenido del mensaje en el estado.
        setMessages(prev => prev.map(m => m.id === targetMessageId ? { ...m, content: displayedContent } : m));

      }, 80); // 🔥 AJUSTE: Velocidad de escritura un poco más lenta para una sensación más humana.

      return () => clearInterval(typingInterval); // Limpieza al desmontar
    }
  }, [textToStream]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  // 🚀 LÓGICA DE MENSAJES REFACTORIZADA PARA SER MÁS INTELIGENTE
  const sendMessage = async (messageText) => {
    const trimmedMessage = messageText.trim();
    if (!trimmedMessage || isLoading) return;

    const newUserMessage = { id: Date.now(), role: 'user', content: trimmedMessage };    
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);

    // Toda la lógica conversacional ahora pasa por la IA para mayor naturalidad.
    const historyForApi = messages
      .filter(m => !m.isConsentRequest && m.type !== 'confirmation')
      .slice(1) // Omitimos el saludo inicial
      .map(msg => ({ role: msg.role, parts: [{ text: msg.content }] }));

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: historyForApi, message: trimmedMessage }),
      });

      if (!response.ok || !response.body) { throw new Error('La respuesta de la red no fue válida.'); }
      
      let fullResponse = "";
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      // Pausa de 3 segundos para que se vea la animación de "escribiendo..."
      await new Promise(resolve => setTimeout(resolve, initialDelay));

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          setIsLoading(false);
          const finalLinkedContent = createLinkedText(fullResponse);
          const newMessageId = Date.now();
          
          // Si aún no tenemos el nombre, buscamos la frase mágica en la respuesta.
          if (chatStage === 'initial' || chatStage === 'awaiting_name_input') {
            const nameMatch = finalLinkedContent.match(/^¡Un gusto, ([\w\s]+)!/);
            if (nameMatch && nameMatch[1]) {
              const capturedName = nameMatch[1].trim();
              setUserName(capturedName);
              localStorage.setItem('deviChatUserName', capturedName);
              setChatStage('awaiting_consent'); // Esto activará el useEffect para pedir consentimiento.
            } else {
              // Si la IA no encontró el nombre, probablemente lo está pidiendo.
              setChatStage('awaiting_name_input');
            }
          }
          
          // Añadimos el mensaje vacío que será llenado por el efecto de tipeo.
          setMessages(prev => [...prev, { id: newMessageId, role: 'model', content: '' }]);
          setTextToStream({ content: finalLinkedContent, id: newMessageId });
          break;
        }
        fullResponse += decoder.decode(value, { stream: true });
      }
    } catch (error) {
      console.error("Error al obtener respuesta de la IA:", error);
      setMessages(prev => [
        ...prev, 
        { id: Date.now(), role: 'model', content: '😥 Lo siento, estoy teniendo problemas para conectar con mi cerebro IA. 🧠 Por favor, intenta más tarde.' }
      ]);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={`fixed bottom-6 right-6 z-50 group ${!isOpen ? 'animate-float' : ''}`}>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative flex items-center justify-center w-16 h-16 bg-slate-900 rounded-full border-[3px] transition-colors duration-300 ${
            isOpen ? 'border-fuchsia-500' : 'border-cyan-400'
          }`}
          aria-label="Abrir chat de IA"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? (
            <X size={28} className="text-fuchsia-400" />
          ) : (
            <img 
              src="/devia.png" 
              alt="Chat IA" 
              className="w-full h-full rounded-full object-cover animate-glow-devi" 
            />
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed bottom-24 right-6 w-[90vw] max-w-sm h-[70vh] max-h-[600px] bg-slate-900/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            <header className="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-3">
                <img 
                  src="/devia.png" 
                  alt="Avatar de Devi" 
                  className="w-9 h-9 rounded-full object-cover border-2 border-blue-400" 
                />
                <h3 className="font-bold text-white">Asistente de EdduAInnova</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={requestClearConfirmation}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Borrar historial"
                >
                  <Trash2 size={18} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Cerrar chat"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </header>

            <div className="flex-1 p-4 overflow-y-auto space-y-4 chat-widget-scrollbar">
              {messages.map((msg, index) => (
                <div key={msg.id || index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.content && (
                    <div className={`max-w-[85%] px-3 py-2 rounded-xl ${
                      msg.role === 'user' 
                        ? 'bg-purple-700 text-white' 
                        : 'bg-gray-700 text-gray-200'
                    }`}>
                      {/* --- NUEVO: Renderizado para el mensaje de consentimiento --- */}
                      {msg.isConsentRequest ? (
                        <div className="prose prose-invert prose-sm max-w-none">
                          <ReactMarkdown components={{ a: ({node, ...props}) => <Link to={props.href} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 font-semibold hover:underline" {...props} /> }}>
                            {msg.content}
                          </ReactMarkdown>
                          <div className="flex gap-2 mt-3">
                            <button
                              onClick={() => handleConsent(true)}
                              className="px-3 py-1 bg-green-700 text-white text-xs rounded-full hover:bg-green-600 transition-colors"
                            > 
                              Sí
                            </button>
                            <button
                              onClick={() => handleConsent(false)}
                              className="px-3 py-1 bg-red-600 text-white text-xs rounded-full hover:bg-red-500 transition-colors"
                            > 
                              No
                            </button>
                          </div>
                        </div>
                      ) : msg.type === 'confirmation' ? (
                        <div className="prose prose-invert">
                          <p className="!my-0">{msg.content}</p>
                          <div className="flex gap-2 mt-3">
                            <button
                              onClick={() => handleConfirmClear(true)}
                              className="px-3 py-1 bg-red-600/80 text-white text-xs rounded-full hover:bg-red-500 transition-colors"
                            >
                              Sí, borrar
                            </button>
                            <button
                              onClick={() => handleConfirmClear(false)}
                              className="px-3 py-1 bg-gray-600 text-white text-xs rounded-full hover:bg-gray-500 transition-colors"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : (
                        // 🎨 ESTILOS CORREGIDOS: Enlaces con color púrpura como en el formulario
                        <div className="prose prose-invert prose-sm max-w-none [&_p]:my-1">
                          <ReactMarkdown
                            components={{
                              a: ({ node, children, href }) => {
                                // Safely detect if the href is an absolute URL with a scheme.
                                const isAbsolute = /^[a-z][a-z0-9+.-]*:/.test(href);
                                // Use a base URL for relative paths to allow URL object parsing.
                                const url = new URL(href, window.location.origin);
                                const isButton = url.searchParams.get('type') === 'button';
                                const buttonStyle = url.searchParams.get('style');
                                
                                // Clean the URL for the final href by removing our internal 'type' parameter.
                                url.searchParams.delete('type');
                                url.searchParams.delete('style');
                                const finalHref = isAbsolute ? url.href : (url.pathname + url.search);

                                if (isButton) {
                                  let buttonClasses = 'inline-flex items-center justify-center my-2 px-4 py-2 text-white text-sm rounded-full font-semibold transition-all duration-300 hover:scale-105 no-underline';
                                  const plan = plans.find(p => p.path === url.pathname);

                                  if (buttonStyle === 'primary') {
                                    buttonClasses += ' bg-purple-700 hover:bg-purple-600 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]';
                                  } else if (buttonStyle === 'whatsapp') {
                                    buttonClasses += ' bg-green-700 hover:bg-green-600 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]';
                                  } else if (buttonStyle === 'email') {
                                    buttonClasses += ' bg-blue-600 hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]';
                                  } else if (plan) {
                                    buttonClasses += ` ${plan.buttonBg} hover:shadow-[0_0_15px_rgba(${plan.glowColor},0.5)]`;
                                  } else {
                                    buttonClasses += ' bg-gray-600 hover:bg-gray-500';
                                  }

                                  if (isAbsolute) {
                                    return (
                                      <a href={finalHref} target="_blank" rel="noopener noreferrer" className={buttonClasses}>
                                        {children} <ExternalLink className="inline-block w-3 h-3 ml-1.5" />
                                      </a>
                                    );
                                  }
                                  return <Link to={finalHref} className={buttonClasses}>{children}</Link>;
                                }

                                // Text link logic
                                const linkClasses = "text-purple-400 hover:text-purple-300 font-semibold hover:underline transition-colors duration-200";
                                if (isAbsolute) {
                                  return <a href={finalHref} className={linkClasses} target="_blank" rel="noopener noreferrer">{children} <ExternalLink className="inline-block w-3 h-3 -mt-1" /></a>;
                                }
                                return <Link to={finalHref} className={linkClasses}>{children}</Link>;
                              },
                              strong: ({node, ...props}) => <strong className="text-white font-bold" {...props} />,
                              em: ({node, ...props}) => <em className="text-gray-300 italic" {...props} />
                            }}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-700/80 rounded-xl inline-block">
                    <div className="typing-indicator">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* El formulario ahora siempre es visible */}
            <div className="p-4 border-t border-white/10 flex-shrink-0">
              {chatStage === 'chatting' && messages.filter(m => m.role === 'user').length < 2 && (
                <div className="flex flex-wrap gap-2 justify-center mb-3">
                  {initialSuggestions.map(suggestion => (
                    <button
                      key={suggestion}
                      onClick={() => sendMessage(suggestion)}
                      disabled={isLoading}
                      className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full hover:bg-purple-700/50 hover:text-white transition-colors disabled:opacity-50"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
              
              <form onSubmit={handleFormSubmit}>
                <div className="flex items-center gap-2 bg-gray-800 rounded-full p-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isLoading ? 'Devi está escribiendo...' : 'Escribe tu pregunta...'}
                    className="flex-1 bg-transparent text-white placeholder-gray-500 focus:ring-0 border-none px-3 w-full disabled:cursor-not-allowed"
                    disabled={isLoading}
                    autoComplete="off"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-purple-600 hover:bg-purple-500 rounded-full p-2 text-white transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;