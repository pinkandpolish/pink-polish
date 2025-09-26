import React, { useMemo, useState } from 'react';

// Basic, client-side calendar + slot picker with a backend-ready submit.
// Configure a Formspree form ID via Vite env: VITE_FORMSPREE_ID
// or replace the endpoint in handleSubmit with your backend booking API.

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getDaysInMonth(year, monthIndex) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

function startWeekday(year, monthIndex) {
  return new Date(year, monthIndex, 1).getDay();
}

// Demo availability rule: future dates only; Sundays closed; fixed slots.
function getMockSlots(dateObj) {
  const now = new Date();
  const isPast = dateObj.setHours(0, 0, 0, 0) < now.setHours(0, 0, 0, 0);
  const isSunday = dateObj.getDay() === 0;
  if (isPast || isSunday) return [];
  return ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM'];
}

export default function Booking() {
  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [status, setStatus] = useState('idle');

  const monthLabel = cursor.toLocaleString('default', { month: 'long', year: 'numeric' });

  const calendar = useMemo(() => {
    const y = cursor.getFullYear();
    const m = cursor.getMonth();
    const days = getDaysInMonth(y, m);
    const start = startWeekday(y, m);
    const cells = [];
    for (let i = 0; i < start; i++) cells.push(null);
    for (let d = 1; d <= days; d++) {
      cells.push(new Date(y, m, d));
    }
    return cells;
  }, [cursor]);

  const slots = useMemo(() => (selectedDate ? getMockSlots(selectedDate) : []), [selectedDate]);

  function prevMonth() {
    setCursor((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  function nextMonth() {
    setCursor((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  function onSelectDate(dateObj) {
    setSelectedDate(dateObj);
    setSelectedSlot('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedDate || !selectedSlot) {
      alert('Please choose a date and time slot.');
      return;
    }

    const data = new FormData(e.currentTarget);
    data.set('date', selectedDate.toDateString());
    data.set('time', selectedSlot);

    const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
    if (!formspreeId) {
      alert('Form endpoint not configured. Add VITE_FORMSPREE_ID to your client .env or swap in your API URL.');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');
      e.currentTarget.reset();
      setSelectedSlot('');
      setSelectedDate(null);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  return (
    <div className="page-wrapper booking-page">
      <section className="booking-intro">
        <span className="badge">Real-time calendar</span>
        <h1>Book your clean</h1>
        <p>
          Choose a date and time that fits your schedule. We currently service indoor residential and commercial spaces. Address and
          service details help us prepare the perfect checklist.
        </p>
        <span className="notice">Psst: Sundays are our rest day. Other dates shown as grey are unavailable.</span>
      </section>

      <section className="booking-layout">
        <div className="calendar-card">
          <header className="calendar-header">
            <button className="btn btn--outline" onClick={prevMonth} aria-label="Previous month">◀</button>
            <h3 style={{ margin: 0 }}>{monthLabel}</h3>
            <button className="btn btn--outline" onClick={nextMonth} aria-label="Next month">▶</button>
          </header>

          <div className="calendar-grid">
            {WEEKDAYS.map((d) => (
              <div key={d} className="calendar-weekday">
                {d}
              </div>
            ))}
            {calendar.map((cell, idx) => {
              if (!cell) return <div key={`e-${idx}`} className="calendar-day is-empty" aria-hidden="true" />;
              const day = cell.getDate();
              const hasSlots = getMockSlots(new Date(cell)).length > 0;
              const isSelected = selectedDate && cell.toDateString() === selectedDate.toDateString();
              const classNames = ['calendar-day'];
              if (hasSlots) classNames.push('has-availability');
              else classNames.push('is-full');
              if (isSelected) classNames.push('is-selected');
              return (
                <button
                  key={cell.toISOString()}
                  type="button"
                  className={classNames.join(' ')}
                  onClick={() => hasSlots && onSelectDate(cell)}
                  disabled={!hasSlots}
                  aria-pressed={isSelected}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <div>
            <h4 style={{ margin: '10px 0' }}>Available slots</h4>
            <div className="slot-list">
              {slots.length === 0 && <span className="form-hint">Select a date to view slots.</span>}
              {slots.map((s) => (
                <button
                  type="button"
                  key={s}
                  className={`slot-button ${selectedSlot === s ? 'is-selected' : ''}`}
                  onClick={() => setSelectedSlot(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <form className="form-card" onSubmit={handleSubmit}>
          <header>
            <h3 style={{ margin: 0 }}>Tell us about your space</h3>
            <p className="form-hint">We use these details to tailor your clean and confirm your booking.</p>
          </header>

          <div className="form-grid">
            <div className="form-row inline">
              <label>
                Full name
                <input name="name" type="text" placeholder="Jane Doe" required />
              </label>
              <label>
                Email
                <input name="email" type="email" placeholder="jane@email.com" required />
              </label>
              <label>
                Phone
                <input name="phone" type="tel" placeholder="(555) 000-0000" required />
              </label>
            </div>

            <div className="form-row">
              <label>
                Address
                <input name="address" type="text" placeholder="123 Blossom Lane" required />
              </label>
              <div className="form-row inline">
                <label>
                  Unit (optional)
                  <input name="unit" type="text" placeholder="Apt 4B" />
                </label>
                <label>
                  City
                  <input name="city" type="text" placeholder="Petal Park" required />
                </label>
                <label>
                  ZIP
                  <input name="zip" type="text" placeholder="12345" required />
                </label>
              </div>
            </div>

            <div className="form-row inline">
              <label>
                Service type
                <select name="serviceType" required>
                  <option value="">Select...</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                </select>
              </label>
              <label>
                Cleaning type
                <select name="cleaningType" required>
                  <option value="">Select...</option>
                  <option value="standard">Standard</option>
                  <option value="deep">Deep Clean</option>
                  <option value="move">Move-in / Move-out</option>
                </select>
              </label>
            </div>

            <div className="form-row">
              <label>
                Notes (optional)
                <textarea name="notes" placeholder="Favorite candle scents, sensitive surfaces, pet info, parking notes..." />
              </label>
            </div>

            <input type="hidden" name="date" value={selectedDate ? selectedDate.toISOString() : ''} />
            <input type="hidden" name="time" value={selectedSlot} />

            <div className="form-row">
              <button
                type="submit"
                className="btn btn--primary"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Submitting…' : 'Request Booking'}
              </button>
              {status === 'success' && (
                <span className="form-hint">Thank you! We\'ll confirm your reservation shortly.</span>
              )}
              {status === 'error' && (
                <span className="form-hint">Something went wrong. Please try again.</span>
              )}
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

