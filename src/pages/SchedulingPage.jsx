import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import PageLayout from '../components/PageLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, isSameDay, addHours, parse } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, Clock, Package, MessageCircle, Video, User, Mail, Phone } from 'lucide-react';

// Estilos para que el calendario coincida con el diseño de la web
const calendarStyles = `
  .rdp { --rdp-cell-size: 40px; --rdp-accent-color: #a855f7; --rdp-background-color: #8b5cf6; margin: 1em 0; }
  .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover { background-color: var(--rdp-background-color); color: #fff; }
  .rdp-button:hover:not([disabled]):not(.rdp-day_selected) { background-color: #374151; }
  .rdp-caption_label, .rdp-nav_button, .rdp-head_cell { color: #d1d5db; }

  /* Estilos para la 'X' en días deshabilitados */
  .rdp-day_disabled {
    color: #4b5563 !important; /* Hacer el número del día menos visible */
    cursor: not-allowed;
    position: relative; /* Necesario para el posicionamiento del pseudo-elemento */
  }

  .rdp-day_disabled::after {
    content: '×';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2.5rem; /* Tamaño de la 'X' */
    line-height: 1;
    color: #4b5563; /* Color gris, igual que el número */
    opacity: 0.5; /* Opacidad para que no sea tan agresivo */
  }
`;

const currentYear = new Date().getFullYear();

// Feriados de Colombia para el año actual (ejemplo con 2024, algunos son movibles)
// Para una solución a largo plazo, se recomienda una librería o API de feriados.
const colombianHolidays = [
  new Date(currentYear, 0, 1),   // Año Nuevo
  new Date(currentYear, 0, 8),   // Reyes Magos (Lunes siguiente al 6 de Enero)
  new Date(currentYear, 2, 25),  // San José (Lunes siguiente al 19 de Marzo)
  new Date(currentYear, 2, 28),  // Jueves Santo
  new Date(currentYear, 2, 29),  // Viernes Santo
  new Date(currentYear, 4, 1),   // Día del Trabajo
  new Date(currentYear, 4, 13),  // Ascensión (Lunes)
  new Date(currentYear, 5, 3),   // Corpus Christi (Lunes)
  new Date(currentYear, 5, 10),  // Sagrado Corazón (Lunes)
  new Date(currentYear, 6, 1),   // San Pedro y San Pablo (Lunes)
  new Date(currentYear, 7, 7),   // Batalla de Boyacá
  new Date(currentYear, 7, 19),  // Asunción de la Virgen (Lunes)
  new Date(currentYear, 9, 14),  // Día de la Raza (Lunes)
  new Date(currentYear, 10, 4),  // Todos los Santos (Lunes)
  new Date(currentYear, 10, 11), // Independencia de Cartagena (Lunes)
  new Date(currentYear, 11, 25), // Navidad
];

const generateTimeSlots = (selectedDate) => {
  const now = new Date();
  const sixHoursFromNow = addHours(now, 6);
  const allSlots = [];

  // Genera todos los horarios posibles de 8 AM a 5 PM
  for (let i = 8; i <= 17; i++) {
    const hour12 = i > 12 ? i - 12 : i;
    const ampm = i >= 12 ? 'PM' : 'AM';
    allSlots.push(`${hour12}:00 ${ampm}`);
    if (i < 17) allSlots.push(`${hour12}:30 ${ampm}`);
  }

  // Mapea a objetos con estado de deshabilitado
  return allSlots.map(slotString => {
    const slotDateTime = parse(slotString, 'h:mm a', selectedDate);
    const isDisabled = isSameDay(selectedDate, now) && slotDateTime < sixHoursFromNow;
    return { time: slotString, isDisabled };
  });
};

export default function SchedulingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    selectedPlan: '',
    selectedTime: '',
    meetingType: 'llamada',
  });
  const [errors, setErrors] = useState({});

  const timeSlots = useMemo(() => generateTimeSlots(selectedDate), [selectedDate]);
  const plans = [{ title: 'Básico' }, { title: 'Profesional' }, { title: 'Premium' }];

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value) return 'El nombre es obligatorio.';
        if (!/^[a-zA-Z\sÀ-ÿ]+$/.test(value)) return 'El nombre solo puede contener letras y espacios.';
        break;
      case 'email':
        if (!value) return 'El correo es obligatorio.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Por favor, introduce un correo electrónico válido.';
        break;
      case 'phone':
        if (!value) return 'El celular es obligatorio.';
        if (!/^3\d{9}$/.test(value)) return 'El celular debe tener 10 dígitos y comenzar con 3.';
        break;
      case 'selectedPlan':
        if (!value) return 'Debes seleccionar un plan.';
        break;
      case 'selectedTime':
        if (!value) return 'Debes seleccionar una hora.';
        break;
      default:
        break;
    }
    return '';
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    // Limpia el error cuando el usuario empieza a corregir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Resetea la hora al cambiar de día, ya que los horarios disponibles cambian
    setFormState(prev => ({ ...prev, selectedTime: '' }));
    // Limpia cualquier error de hora existente
    if (errors.selectedTime) {
      setErrors(prev => ({ ...prev, selectedTime: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    // Valida todos los campos al intentar enviar
    Object.keys(formState).forEach(key => {
      const error = validateField(key, formState[key]);
      if (error) {
        validationErrors[key] = error;
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    // Prepara los datos para Supabase.
    // 'selectedDate' ya es un objeto Date, que Supabase maneja correctamente.
    const { name, email, phone, selectedPlan, selectedTime, meetingType } = formState;

    const { error } = await supabase
      .from('reuniones')
      .insert([{ name, email, phone, selectedPlan, selectedDate, selectedTime, meetingType }]);

    if (error) {
      console.error('Error al guardar en Supabase:', error);
      alert('Hubo un error al guardar tu solicitud. Por favor, intenta de nuevo.');
      setIsLoading(false);
    } else {
      setIsLoading(false);
      navigate('/gracias');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout>
      {isLoading && <LoadingSpinner />}
      <style>{calendarStyles}</style>
      <div className="bg-gradient-to-bl from-[#101216] to-[#1c355b] border border-purple-500/30 rounded-2xl shadow-2xl w-full max-w-3xl p-8 mx-auto text-white animate-fade-in">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-blue-600 text-transparent bg-clip-text">Agenda tu Reunión Inicial</h2>
        
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label htmlFor="name" className="font-semibold mb-1 flex items-center gap-2"><User size={18}/> Nombre Completo</label>
              <input type="text" id="name" name="name" required value={formState.name} onChange={handleChange} onBlur={handleBlur} className={`w-full bg-gray-800 border rounded-md p-2 focus:ring-purple-500 focus:border-purple-500 ${errors.name ? 'border-red-500' : 'border-gray-600'}`} placeholder="Tu nombre y apellido" />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="font-semibold mb-1 flex items-center gap-2"><Mail size={18}/> Correo Electrónico</label>
              <input type="email" id="email" name="email" required value={formState.email} onChange={handleChange} onBlur={handleBlur} className={`w-full bg-gray-800 border rounded-md p-2 focus:ring-purple-500 focus:border-purple-500 ${errors.email ? 'border-red-500' : 'border-gray-600'}`} placeholder="tu@email.com" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="font-semibold mb-1 flex items-center gap-2"><Phone size={18}/> Celular (WhatsApp)</label>
              <input type="tel" id="phone" name="phone" required value={formState.phone} onChange={handleChange} onBlur={handleBlur} maxLength="10" className={`w-full bg-gray-800 border rounded-md p-2 focus:ring-purple-500 focus:border-purple-500 ${errors.phone ? 'border-red-500' : 'border-gray-600'}`} placeholder="Ej: 3001234567" />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label htmlFor="selectedPlan" className="font-semibold mb-1 flex items-center gap-2"><Package size={18}/> Plan de Interés</label>
              <select id="selectedPlan" name="selectedPlan" required value={formState.selectedPlan} onChange={handleChange} onBlur={handleBlur} className={`w-full bg-gray-800 border rounded-md p-2 focus:ring-purple-500 focus:border-purple-500 ${errors.selectedPlan ? 'border-red-500' : 'border-gray-600'}`}>
                <option value="" disabled>Selecciona un plan</option>
                {plans.map(plan => <option key={plan.title} value={plan.title}>{plan.title}</option>)}
              </select>
              {errors.selectedPlan && <p className="text-red-500 text-xs mt-1">{errors.selectedPlan}</p>}
            </div>
          </div>

          <div className="bg-black/20 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center gap-2"><Calendar size={18}/> Elige fecha y hora</h3>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 flex justify-center">
                <DayPicker 
                  mode="single" 
                  selected={selectedDate} 
                  onSelect={handleDateChange} 
                  locale={es} 
                  fromDate={new Date()} 
                  disabled={[...colombianHolidays, { before: new Date() }, { dayOfWeek: [0, 6] }]} 
                />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-2 flex items-center gap-2"><Clock size={18}/> Hora (América/Bogotá)</h4>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {timeSlots.map(({ time, isDisabled }) => (
                    <button
                      key={time}
                      type="button"
                      disabled={isDisabled}
                      onClick={() => {
                        if (!isDisabled) {
                          handleChange({ target: { name: 'selectedTime', value: time } });
                        }
                      }}
                      className={`p-2 rounded-md text-sm text-center transition-all duration-200 
                        ${isDisabled 
                            ? 'bg-gray-800 text-gray-500 line-through cursor-not-allowed' 
                            : formState.selectedTime === time 
                                ? 'bg-purple-600 text-white font-bold ring-2 ring-purple-400' 
                                : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                    >{time}</button>
                  ))}
                </div>
                {errors.selectedTime && <p className="text-red-500 text-xs mt-1">{errors.selectedTime}</p>}
                {timeSlots.every(slot => slot.isDisabled) && isSameDay(selectedDate, new Date()) && (
                  <p className="text-yellow-400 text-xs mt-2">No hay horarios disponibles para hoy (se requiere 6h de antelación). Por favor, selecciona una fecha futura.</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2">Tipo de reunión por WhatsApp</h3>
            <div className="flex gap-4">
              <label className={`flex-1 flex items-center justify-center gap-3 p-3 rounded-md cursor-pointer border-2 transition-all ${formState.meetingType === 'llamada' ? 'border-purple-500 bg-purple-900/50' : 'border-gray-600 hover:border-gray-500'}`}>
                <input type="radio" name="meetingType" value="llamada" checked={formState.meetingType === 'llamada'} onChange={handleChange} className="hidden" />
                <MessageCircle size={20} /> Llamada
              </label>
              <label className={`flex-1 flex items-center justify-center gap-3 p-3 rounded-md cursor-pointer border-2 transition-all ${formState.meetingType === 'videollamada' ? 'border-purple-500 bg-purple-900/50' : 'border-gray-600 hover:border-gray-500'}`}>
                <input type="radio" name="meetingType" value="videollamada" checked={formState.meetingType === 'videollamada'} onChange={handleChange} className="hidden" />
                <Video size={20} /> Videollamada
              </label>
            </div>
          </div>

          <button type="submit" className="w-full bg-purple-700 hover:bg-purple-600 px-8 py-3 text-white text-lg rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] !mt-8">
            Enviar Solicitud
          </button>
        </form>
      </div>
    </PageLayout>
  );
}