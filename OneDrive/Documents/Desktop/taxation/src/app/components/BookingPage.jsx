'use client';
import { useState, useEffect, useCallback } from 'react';
import { createBooking, verifyPayment, fetchCountryCodes } from '../../lib/api';
import styles from '../page.module.css';
import Link from "next/link";
// ─── Constants ───────────────────────────────────────────────────────────────
const WEEKEND_SURCHARGE  = 150;

const TOURS = [
  { id: 'rafting-12', name: 'River Rafting 12 KM',          price: 699,  icon: '🚣', category: 'Rafting' },
  { id: 'rafting-14', name: 'River Rafting 14 KM',          price: 799,  icon: '🚣', category: 'Rafting' },
  { id: 'rafting-16', name: 'River Rafting 16 KM',          price: 999,  icon: '🌊', category: 'Rafting' },
  { id: 'bungy-jumping1',name: 'Ganga Bungy 219 MTR + DSLR',   price: 5999, icon: '🪂', category: 'Bungee' },
  { id: 'bungy-jumping2',  name: 'Splash Bungy 85 MTR',          price: 2500, icon: '🪂', category: 'Bungee' },
  { id: 'bungy-jumping',     name: 'Jumping Heights River View',     price: 3999, icon: '🏔️', category: 'Bungee' },
  { id: 'bungy-jumping4',  name: 'Himalayan Bungee 111 MTR',     price: 3599, icon: '⛰️', category: 'Bungee' },
  { id: 'bungy-jumping5', name: 'Splash Bungee 109 MTR',        price: 3399, icon: '💦', category: 'Bungee' },
];

const TIME_SLOTS = ['6:00 AM','7:00 AM','8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','2:00 PM','3:00 PM','4:00 PM'];
const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getNext7Days() {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const iso     = d.toISOString().split('T')[0];
    const day     = d.getDay();
    const weekend = day === 0 || day === 6;
    return { iso, day, weekend, date: d.getDate(), month: d.getMonth(), dow: i === 0 ? 'Today' : DAYS[day] };
  });
}

function isRaftingClosed(dateStr) {
  if (!dateStr) return false;
  const parts = dateStr.split('-');
  if (parts.length < 3) return false;
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);
  // July (7) and August (8) are fully closed.
  if (month === 7 || month === 8) return true;
  // September (9) is closed up to 14th. Starts from 15th.
  if (month === 9 && day < 15) return true;
  return false;
}

function fmt(n) { return `₹${n.toLocaleString('en-IN')}`; }

function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.head.appendChild(s);
  });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StepBadge({ n, label, active, done }) {
  return (
    <div className={`${styles.stepBadge} ${active ? styles.stepActive : ''} ${done ? styles.stepDone : ''}`}>
      <span className={styles.stepNum}>{done ? '✓' : n}</span>
      <span className={styles.stepLabel}>{label}</span>
    </div>
  );
}

function TourCard({ tour, selected, onSelect, disabled }) {
  return (
    <button
      className={`${styles.tourCard} ${selected ? styles.tourSelected : ''} ${disabled ? styles.tourDisabled : ''}`}
      onClick={() => !disabled && onSelect(tour)}
      disabled={disabled}
      type="button"
    >
      <span className={styles.tourIcon}>{tour.icon}</span>
      <div className={styles.tourInfo}>
        <span className={styles.tourName}>{tour.name}</span>
        <span className={styles.tourPrice}>
          {disabled ? (
            <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>Closed (July 1 - Sept 14)</span>
          ) : (
            <>{fmt(tour.price)}<small>/person</small></>
          )}
        </span>
      </div>
      {selected && <span className={styles.checkMark}>✓</span>}
    </button>
  );
}

function DateGrid({ dates, selected, onSelect, selectedTour }) {
  return (
    <div className={styles.dateGrid}>
      {dates.map(d => {
        const isRafting = selectedTour?.category === 'Rafting';
        const disabled = isRafting && isRaftingClosed(d.iso);
        return (
          <button
            key={d.iso}
            type="button"
            className={`${styles.dateBtn} ${d.weekend ? styles.weekend : ''} ${selected === d.iso ? styles.dateActive : ''} ${disabled ? styles.dateDisabled : ''}`}
            onClick={() => !disabled && onSelect(d)}
            disabled={disabled}
          >
            <span className={styles.dateDow}>{d.dow}</span>
            <span className={styles.dateDay}>{d.date}</span>
            <span className={styles.dateMon}>{MONTHS[d.month]}</span>
            {disabled && <span style={{ fontSize: '9px', color: '#e74c3c', fontWeight: 'bold', marginTop: '2px' }}>Closed</span>}
          </button>
        );
      })}
    </div>
  );
}

function TimeGrid({ slots, selected, onSelect, selectedDate }) {
  const now = new Date();
  const isToday = selectedDate === now.toISOString().split('T')[0];
  const currentHour = now.getHours();
  const currentMin = now.getMinutes();

  return (
    <div className={styles.timeGrid}>
      {slots.map(t => {
        let [time, modifier] = t.split(' ');
        let [hoursStr, minutesStr] = time.split(':');
        let hours = parseInt(hoursStr, 10);
        let minutes = parseInt(minutesStr, 10);
        if (modifier === 'PM' && hours < 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;

        const isPast = isToday && (currentHour > hours || (currentHour === hours && currentMin >= minutes));

        return (
          <button
            key={t}
            type="button"
            className={`${styles.timeBtn} ${selected === t ? styles.timeActive : ''}`}
            onClick={() => !isPast && onSelect(t)}
            disabled={isPast}
            style={isPast ? { opacity: 0.4, cursor: 'not-allowed', textDecoration: 'line-through' } : {}}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

function GuestCounter({ value, onChange }) {
  return (
    <div className={styles.guestRow}>
      <button type="button" className={styles.guestBtn} onClick={() => onChange(-1)} disabled={value <= 1}>−</button>
      <span className={styles.guestCount}>{value}</span>
      <button type="button" className={styles.guestBtn} onClick={() => onChange(1)} disabled={value >= 20}>+</button>
      <span className={styles.guestLabel}>{value === 1 ? 'Guest' : 'Guests'}</span>
    </div>
  );
}

function PaymentMethodSelector({ selected, onSelect }) {
  const methods = [
    {
      id: 'razorpay',
      label: 'Card / UPI / Wallet',
      desc: 'Visa, Mastercard, Paytm & more',
      icon: '💳',
    },
    {
      id: 'phonepe',
      label: 'PhonePe',
      desc: 'Pay via PhonePe UPI',
      icon: null,
      phonepeLogo: true,
    },
  ];

  return (
    <div className={styles.payMethodGrid}>
      {methods.map(m => (
        <button
          key={m.id}
          type="button"
          className={`${styles.payMethod} ${selected === m.id ? styles.payMethodActive : ''}`}
          onClick={() => onSelect(m.id)}
        >
          <div className={styles.payMethodLeft}>
            {m.phonepeLogo ? (
              <span className={styles.phonepeLogo}>
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                  <rect width="48" height="48" rx="10" fill="#5f259f"/>
                  <path d="M33.5 14H27l-9 13h5.5l-3.5 7 13-15h-6l6.5-5z" fill="white"/>
                </svg>
              </span>
            ) : (
              <span className={styles.payIcon}>{m.icon}</span>
            )}
            <div>
              <div className={styles.payMethodLabel}>{m.label}</div>
              <div className={styles.payMethodDesc}>{m.desc}</div>
            </div>
          </div>
          <span className={`${styles.payRadio} ${selected === m.id ? styles.payRadioActive : ''}`} />
        </button>
      ))}
    </div>
  );
}

function Summary({ tour, date, time, guests, isWeekend }) {
  if (!tour) return null;
  const base      = tour.price * guests;
  const surcharge = isWeekend ? WEEKEND_SURCHARGE * guests : 0;
  const total     = base + surcharge;
  const prebookPerPerson = tour.category === 'Bungee' ? 524 : 103;
  const prebook   = prebookPerPerson * guests;
  const due       = total - prebook;

  return (
    <div className={styles.summary}>
      <div className={styles.summaryTitle}>Booking Summary</div>
      <div className={styles.summaryRow}>
        <span>{tour.name}</span>
        <span>{fmt(tour.price)} × {guests}</span>
      </div>
      <div className={styles.summaryRow}>
        <span>Base amount</span>
        <span>{fmt(base)}</span>
      </div>
      {surcharge > 0 && (
        <div className={`${styles.summaryRow} ${styles.surchargeRow}`}>
          <span>Weekend surcharge</span>
          <span>+{fmt(surcharge)}</span>
        </div>
      )}
      <div className={`${styles.summaryRow} ${styles.totalRow}`}>
        <span>Total package</span>
        <span>{fmt(total)}</span>
      </div>
      <div className={`${styles.summaryRow} ${styles.prebookRow}`}>
        <span>Pay now (prebook)</span>
        <span>{fmt(prebook)}</span>
      </div>
      <div className={`${styles.summaryRow} ${styles.dueRow}`}>
        <span>Due on arrival</span>
        <span>{fmt(due)}</span>
      </div>
    </div>
  );
}

function SuccessScreen({ booking, onReset }) {
  const totalPaid = booking.prebookingAmount;
  const due       = booking.dueAmount;

  return (
    <div className={`${styles.successScreen} animate-scaleIn`}>
      <div className={styles.successIcon}>🎉</div>
      <h2 className={styles.successTitle}>Booking Confirmed!</h2>
      <p className={styles.successSub}>
        Your adventure slot is locked in. Confirmation sent to <strong>{booking.contactEmail || booking.contactPhone}</strong>
      </p>

      <div className={styles.successCard}>
        <Row label="Adventure"   val={booking.tourName} />
        <Row label="Date"        val={booking.bookingDate} />
        <Row label="Time"        val={booking.timeSlot} />
        <Row label="Guests"      val={booking.guests} />
        <Row label="Paid Now"    val={fmt(totalPaid)} green />
        <Row label="Due Arrival" val={fmt(due)}       orange />
        <Row label="Booking ID"  val={booking._id}    mono />
        <Row label="Payment ID"  val={booking.razorpayPaymentId} mono />
      </div>

      <div className={styles.arrivalNote}>
        ⏰ Arrive <strong>30 minutes early</strong> · Carry a valid ID · Wear water-friendly clothing
      </div>

      <button className={styles.resetBtn} onClick={onReset}>
        Book Another Adventure
      </button>
    </div>
  );
}

function Row({ label, val, green, orange, mono }) {
  return (
    <div className={styles.successRow}>
      <span className={styles.successLabel}>{label}</span>
      <span className={`${styles.successVal} ${green ? styles.green : ''} ${orange ? styles.orange : ''} ${mono ? styles.mono : ''}`}>
        {val}
      </span>
    </div>
  );
}

// ─── Country Code Selector ───────────────────────────────────────────────────
function CountryCodeSelect({ value, onChange, countries, loading }) {
  return (
    <div className={styles.phoneWrapper}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className={styles.countrySelect}
      >
        {loading ? (
          <option>Loading…</option>
        ) : (
          countries.map(c => (
            <option key={c.code + c.name} value={c.code}>
              {c.flag} {c.code} {c.name}
            </option>
          ))
        )}
      </select>
      <span className={styles.selectArrow}>▼</span>
    </div>
  );
}

function isInAppBrowser() {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent || window.navigator.vendor || window.opera;
  return (
    (ua.indexOf("FBAN") > -1) ||
    (ua.indexOf("FBAV") > -1) ||
    (ua.indexOf("Instagram") > -1) ||
    (ua.indexOf("WhatsApp") > -1) ||
    (ua.indexOf("Line") > -1) ||
    (ua.indexOf("GSA") > -1) ||
    (ua.indexOf("Messenger") > -1) ||
    (ua.includes("wv") && ua.includes("Android")) ||
    (ua.includes("WebView") && (ua.includes("iPhone") || ua.includes("iPad") || ua.includes("iPod")))
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function BookingPage() {
  const [selectedTour, setSelectedTour]   = useState(null);
  const [selectedDate, setSelectedDate]   = useState(null);
  const [isWeekendDay, setIsWeekendDay]   = useState(false);
  const [selectedTime, setSelectedTime]   = useState(null);
  const [guests, setGuests]               = useState(1);
  const [payMethod, setPayMethod]         = useState('razorpay');
  const [form, setForm]                   = useState({ name: '', phone: '', email: '', state: '' });
  const [fieldErrors, setFieldErrors]     = useState({ name: '', phone: '', email: '', state: '' });
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState('');
  const [booking, setBooking]             = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [countryCode, setCountryCode]       = useState('+91');
  const [countries, setCountries]           = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  // const [isInApp, setIsInApp]               = useState(false);

  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes timer

  // useEffect(() => {
  //   setIsInApp(isInAppBrowser());
  // }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const pkgSlug = params.get('package');
      if (pkgSlug) {
        const slugMap = {
          'rishikesh-river-rafting-12km': 'rafting-12',
          'rishikesh-river-rafting-14km': 'rafting-14',
          'rishikesh-river-rafting-16km': 'rafting-16',
          'ganga-bungy-219m': 'bungy-ganga',
          'splash-bungy-85m': 'splash-85',
          'jumpin-heights-bungee': 'jumpin',
          'himalayan-bungee-111m': 'himalayan',
          'splash-bungee-109m': 'splash-109'
        };
        const tourId = slugMap[pkgSlug];
        if (tourId) {
          const matchedTour = TOURS.find(t => t.id === tourId);
          if (matchedTour) {
            setSelectedTour(matchedTour);
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    // Timer for 5 minutes auto-refresh (reloads page, closing any open Razorpay payment page)
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.reload();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Fetch country dial codes via lib/api
  useEffect(() => {
    fetchCountryCodes().then(list => {
      setCountries(list);
      setCountriesLoading(false);
    });
  }, []);

  const categories = ['All', ...Array.from(new Set(TOURS.map(t => t.category)))];
  const visibleTours = activeCategory === 'All' ? TOURS : TOURS.filter(t => t.category === activeCategory);

  const prebookPerPerson = selectedTour ? (selectedTour.category === 'Bungee' ? 524 : 103) : 103;
  const prebook   = prebookPerPerson * guests;
  const surcharge = isWeekendDay ? WEEKEND_SURCHARGE * guests : 0;
  const base      = selectedTour ? selectedTour.price * guests : 0;
  const total     = base + surcharge;
  const due       = total - prebook;

  const canPay = selectedTour && selectedDate && selectedTime && form.name && form.phone && !(selectedTour.category === 'Rafting' && isRaftingClosed(selectedDate));

  const handleGuests = (delta) => {
    setGuests(g => Math.max(1, Math.min(20, g + delta)));
  };

  const handleField = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const isIndia = countryCode === '+91';
      const maxLen  = isIndia ? 10 : 15;
      const digitsOnly = value.replace(/\D/g, '').slice(0, maxLen);
      setForm(f => ({ ...f, phone: digitsOnly }));
      if (digitsOnly.length === 0) {
        setFieldErrors(fe => ({ ...fe, phone: '' }));
      } else if (isIndia && !/^[6-9]/.test(digitsOnly)) {
        setFieldErrors(fe => ({ ...fe, phone: 'Indian number must start with 6, 7, 8 or 9.' }));
      } else if (isIndia && digitsOnly.length < 10) {
        setFieldErrors(fe => ({ ...fe, phone: 'Phone number must be exactly 10 digits.' }));
      } else if (!isIndia && digitsOnly.length < 6) {
        setFieldErrors(fe => ({ ...fe, phone: 'Please enter a valid phone number.' }));
      } else {
        setFieldErrors(fe => ({ ...fe, phone: '' }));
      }
      return;
    }

    if (name === 'name') {
      // Block special characters — allow letters, spaces, dots, hyphens
      const cleaned = value.replace(/[^a-zA-Z\s.\-]/g, '');
      setForm(f => ({ ...f, name: cleaned }));
      setFieldErrors(fe => ({ ...fe, name: cleaned.trim().length === 0 && value.length > 0 ? 'Name cannot be empty or contain special characters.' : '' }));
      return;
    }

    if (name === 'email') {
      setForm(f => ({ ...f, email: value }));
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        setFieldErrors(fe => ({ ...fe, email: 'Please enter a valid email address.' }));
      } else {
        setFieldErrors(fe => ({ ...fe, email: '' }));
      }
      return;
    }

    if (name === 'state') {
      // Allow only letters and spaces
      const cleaned = value.replace(/[^a-zA-Z\s]/g, '');
      setForm(f => ({ ...f, state: cleaned }));
      setFieldErrors(fe => ({ ...fe, state: cleaned.trim().length === 0 && value.length > 0 ? 'State name cannot contain numbers or special characters.' : '' }));
      return;
    }

    setForm(f => ({ ...f, [name]: value }));
  };

  const handlePay = useCallback(async () => {
    setError('');

    // Validate name
    if (!form.name.trim()) { setError('Please enter your full name.'); return; }

    // Validate phone
    const isIndia = countryCode === '+91';
    if (!form.phone) { setError('Please enter your WhatsApp number.'); return; }
    if (isIndia && !/^[6-9]/.test(form.phone)) { setError('Indian number must start with 6, 7, 8 or 9.'); return; }
    if (isIndia && form.phone.length !== 10) { setError('Phone number must be exactly 10 digits.'); return; }
    if (!isIndia && form.phone.length < 6) { setError('Please enter a valid phone number.'); return; }

    // Validate email if provided
    if (form.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) { setError('Please enter a valid email address.'); return; }
    }

    if (!form.name || !form.phone) { setError('Please enter your name and WhatsApp number.'); return; }
    if (!selectedDate)  { setError('Please select a date.'); return; }
    if (!selectedTime)  { setError('Please select a time slot.'); return; }
    if (!selectedTour)  { setError('Please select an adventure.'); return; }

    // Double check season limit
    if (selectedTour.category === 'Rafting' && isRaftingClosed(selectedDate)) {
      setError('River rafting is closed from July 1st to September 14th.');
      return;
    }

    setLoading(true);

    try {
      const loaded = await loadRazorpay();
      if (!loaded) throw new Error('Payment gateway failed to load. Check your internet connection.');

      // Step 1: Create booking on backend
      const data = await createBooking({
        tourName:     selectedTour.name,
        tourPrice:    selectedTour.price,
        bookingDate:  selectedDate,
        timeSlot:     selectedTime,
        guests,
        state:        form.state,
        contactName:  form.name,
        contactEmail: form.email,
        contactPhone: `${countryCode}${form.phone}`,
        prebookingAmount: prebook, // Send the calculated amount
      });
console.log('Booking created:', data);
      // Step 2: Open Razorpay Checkout
      const options = {
        key:         data.razorpayOrder.key || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount:      data.razorpayOrder.amount,
        currency:    'INR',
        name:        'Rishikesh Adventure',
        description: `Prebook: ${selectedTour.name}`,
        order_id:    data.razorpayOrder.id,
        prefill:     { name: form.name, email: form.email, contact: `${countryCode}${form.phone}` },
        theme:       { color: '#27ae60' },

        handler: async function(response) {
          try {
            const vData = await verifyPayment({
              razorpayOrderId:   response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            setBooking(vData.booking);
            console.log('Payment verified and booking confirmed:', vData.booking);
          } catch (e) {
            setError('Payment verification failed: ' + e.message);
          } finally {
            setLoading(false);
          }
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
            setError('Payment was cancelled. Please try again.');
          },
        },
      };
      console.log("option",options);

      new window.Razorpay(options).open();

    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  }, [selectedTour, selectedDate, selectedTime, guests, form, payMethod, prebook]);

  const handleReset = () => {
    setBooking(null);
    setSelectedTour(null);
    setSelectedDate(null);
    setIsWeekendDay(false);
    setSelectedTime(null);
    setGuests(1);
    setForm({ name: '', phone: '', email: '', state: '' });
    setCountryCode('+91');
    setError('');
    setPayMethod('razorpay');
  };

  // ── Success screen ──────────────────────────────────────────────────────────
  if (booking) {
    return (
      <main className={styles.main}>
        <div className={styles.card}>
          <SuccessScreen booking={booking} onReset={handleReset} />
        </div>
      </main>
    );
  }

  // ── Booking form ────────────────────────────────────────────────────────────
  return (
    <main className={styles.main}>
      {/* {isInApp && (
        <div style={{
          backgroundColor: '#ffe2e2',
          border: '1px solid #ff9999',
          color: '#c0392b',
          padding: '16px',
          borderRadius: '12px',
          margin: '16px auto',
          maxWidth: '650px',
          textAlign: 'center',
          fontFamily: 'var(--font-outfit), sans-serif',
          fontWeight: '600',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          zIndex: 1000,
        }}>
          
          <span style={{ fontSize: '13px', fontWeight: 'normal', color: '#7f8c8d' }}>
            Please tap the <strong>three dots</strong> in the top-right corner and select <strong>"Open in Chrome"</strong> or <strong>"Open in Safari"</strong> to prebook.
          </span>
        </div>
      )} */}
      {/* Hero header */}
    
      <header className={styles.hero}>
         <Link
    href="/"
    className={styles.closeButton}
    aria-label="Go back to Home"
  >
    ✕
  </Link>
        <div className={styles.heroWave}>⛵</div>
        <h1 className={styles.heroTitle}>Rishikesh Adventures</h1>
        <p className={styles.heroSub}>River Rafting · Bungee Jumping · Thrill Guaranteed</p>
        <div className={styles.heroBadges}>
          <span className={styles.heroBadge}>✅ Instant Confirmation</span>
          <span className={styles.heroBadge}>💰 Pay ₹103 (Rafting) / ₹1,030 (Bungee) to Prebook</span>
          <span className={styles.heroBadge}>🏔️ 500+ Happy Adventurers</span>
        </div>
      </header>

      <div className={styles.card}>
        {/* Steps indicator */}
        <div className={styles.stepsBar}>
          <StepBadge n={1} label="Adventure" active={!selectedTour} done={!!selectedTour} />
          <div className={styles.stepLine} />
          <StepBadge n={2} label="Date & Time" active={selectedTour && !selectedDate} done={!!selectedDate && !!selectedTime} />
          <div className={styles.stepLine} />
          <StepBadge n={3} label="Details" active={selectedDate && selectedTime && !form.name} done={!!form.name} />
          <div className={styles.stepLine} />
          <StepBadge n={4} label="Pay" active={!!form.name} done={false} />
        </div>

        <div className={styles.formBody}>

          {/* Session timeout bar */}
          <div className={styles.sessionTimeout}>
            <span>⏱️ Booking Session expires in: <strong>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</strong></span>
            {/* <span style={{ fontSize: '12px', opacity: 0.8 }}>(Auto-r)</span> */}
          </div>

          {/* ── Section 1: Choose Adventure ───────────────────────── */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>🎯</span> Choose Your Adventure
            </h2>

            {/* Category filter */}
            <div className={styles.categoryTabs}>
              {categories.map(c => (
                <button
                  key={c}
                  type="button"
                  className={`${styles.catTab} ${activeCategory === c ? styles.catActive : ''}`}
                  onClick={() => setActiveCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className={styles.tourList}>
              {visibleTours.map(t => {
                const disabled = t.category === 'Rafting' && selectedDate && isRaftingClosed(selectedDate);
                return (
                  <TourCard
                    key={t.id}
                    tour={t}
                    selected={selectedTour?.id === t.id}
                    onSelect={setSelectedTour}
                    disabled={disabled}
                  />
                );
              })}
            </div>
          </section>

          {/* ── Section 2: Date ───────────────────────────────────── */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>📅</span> Pick a Date
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input
                type="date"
                className={styles.dateInput}
                value={selectedDate || ''}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => {
                  const val = e.target.value;
                  if (!val) return;
                  const d = new Date(val);
                  const day = d.getDay();
                  const weekend = day === 0 || day === 6;
                  setSelectedDate(val);
                  setIsWeekendDay(weekend);
                }}
              />
              {selectedDate && (
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#27ae60', marginTop: '4px' }}>
                  Selected Date: {new Date(selectedDate).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              )}
            </div>
            {isWeekendDay && (
              <div className={styles.weekendAlert} style={{ marginTop: '12px' }}>
                🌅 <strong>Weekend selected</strong> — ₹{WEEKEND_SURCHARGE}/person surcharge applies
              </div>
            )}
            {selectedTour?.category === 'Rafting' && (
              <div style={{ marginTop: '8px', fontSize: '0.82rem', color: '#7f8c8d' }}>
                ℹ️ River Rafting is closed from 1st July to 14th September. Please select a date outside this period.
              </div>
            )}
            {selectedTour?.category === 'Rafting' && selectedDate && isRaftingClosed(selectedDate) && (
              <div style={{ marginTop: '8px', fontSize: '0.85rem', color: '#e74c3c', fontWeight: 'bold' }}>
                ⚠️ River Rafting is closed on the selected date. Please choose a date before 1st July or after 14th September (e.g. 15th September).
              </div>
            )}
          </section>

          {/* ── Section 3: Time ───────────────────────────────────── */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>⏰</span> Choose Time Slot
            </h2>
            <TimeGrid slots={TIME_SLOTS} selected={selectedTime} onSelect={setSelectedTime} selectedDate={selectedDate} />
          </section>

          {/* ── Section 4: Guests ─────────────────────────────────── */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>👥</span> Number of Guests
            </h2>
            <GuestCounter value={guests} onChange={handleGuests} />
          </section>

          {/* ── Section 5: Contact ────────────────────────────────── */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>📋</span> Your Details
            </h2>
            <div className={styles.fieldGrid}>
              <div className={styles.field}>
                <label className={styles.label}>Full Name *</label>
                <input
                  className={styles.input}
                  name="name"
                  value={form.name}
                  onChange={handleField}
                  placeholder="Rahul Sharma"
                  autoComplete="name"
                />
                {fieldErrors.name && <span className={styles.fieldError}>{fieldErrors.name}</span>}
              </div>
              <div className={`${styles.field} ${styles.fieldFull}`}>
                <label className={styles.label}>WhatsApp Number *</label>
                <div className={styles.phoneInputRow}>
                  <CountryCodeSelect
                    value={countryCode}
                    onChange={(code) => { setCountryCode(code); setFieldErrors(fe => ({ ...fe, phone: '' })); }}
                    countries={countries}
                    loading={countriesLoading}
                  />
                  <input
                    className={styles.phoneNumberInput}
                    name="phone"
                    value={form.phone}
                    onChange={handleField}
                    placeholder={countryCode === '+91' ? '98765 43210' : 'Phone number'}
                    type="tel"
                    inputMode="numeric"
                    maxLength={countryCode === '+91' ? 10 : 15}
                    autoComplete="tel"
                  />
                </div>
                {fieldErrors.phone && <span className={styles.fieldError}>{fieldErrors.phone}</span>}
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Email (for confirmation)</label>
                <input
                  className={styles.input}
                  name="email"
                  value={form.email}
                  onChange={handleField}
                  placeholder="rahul@email.com"
                  type="email"
                  autoComplete="email"
                />
                {fieldErrors.email && <span className={styles.fieldError}>{fieldErrors.email}</span>}
              </div>
              <div className={styles.field}>
                <label className={styles.label}>State (optional)</label>
                <input
                  className={styles.input}
                  name="state"
                  value={form.state}
                  onChange={handleField}
                  placeholder="Delhi"
                />
                {fieldErrors.state && <span className={styles.fieldError}>{fieldErrors.state}</span>}
              </div>
            </div>
          </section>

          {/* ── Summary ───────────────────────────────────────────── */}
          {selectedTour && (
            <Summary
              tour={selectedTour}
              date={selectedDate}
              time={selectedTime}
              guests={guests}
              isWeekend={isWeekendDay}
            />
          )}

          {/* ── Section 6: Payment Method ─────────────────────────── */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>💳</span> Payment Method
            </h2>
            <PaymentMethodSelector selected={payMethod} onSelect={setPayMethod} />
          </section>

          {/* ── Pre-book info ─────────────────────────────────────── */}
          <div className={styles.prebookNote}>
            <span className={styles.prebookIcon}>ℹ️</span>
            <div>
              Pay only <strong>₹{prebookPerPerson}/person</strong> to lock your slot. Remaining <strong>{selectedTour ? fmt(due) : '—'}</strong> is collected on arrival. Your spot is guaranteed once prebooking is complete.
            </div>
          </div>

          {/* ── Error ─────────────────────────────────────────────── */}
          {error && (
            <div className={styles.errorBox}>
              ⚠️ {error}
            </div>
          )}

          {/* ── Pay Button ────────────────────────────────────────── */}
          <button
            className={`${styles.payBtn} ${loading ? styles.payBtnLoading : ''}`}
            onClick={handlePay}
            disabled={!canPay || loading}
            type="button"
          >
            {loading ? (
              <span className={styles.spinner} />
            ) : (
              <>
                {payMethod === 'phonepe' ? (
                  <span className={styles.phonepeBtnLogo}>
                    <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                      <path d="M16.75 7H13.5L9 13.5h2.75l-1.75 3.5 6.5-7.5H13z"/>
                    </svg>
                    Pay with PhonePe
                  </span>
                ) : '💳 Pay & Confirm Booking'}
                {selectedTour && <span className={styles.payAmount}> — {fmt(prebook)}</span>}
              </>
            )}
          </button>

          <p className={styles.secure}>🔒 Secured by Razorpay · 256-bit SSL Encrypted</p>
        </div>
      </div>

      {/* Trust badges */}
      <div className={styles.trustRow}>
        <span>🏅 Trusted by 10,000+ Adventurers</span>
        <span>📞 24/7 Support</span>
        <span>🔄 Easy Cancellation</span>
      </div>
    </main>
  );
}
