import React, { useMemo, useState } from 'react';

const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const formEndpoint = import.meta.env.VITE_BOOKING_ENDPOINT || 'https://formspree.io/f/your-form-id';
const isConfigured = formEndpoint && !formEndpoint.includes('your-form-id');

function formatKey(date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatFriendly(key) {
  if (!key) return '';
  const [year, month, day] = key.split('-').map((part) => Number(part));
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

function generateAvailability(days = 75) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const availability = {};

  const templates = {
    full: ['8:30 AM', '10:30 AM', '1:00 PM', '3:30 PM'],
    light: ['9:30 AM', '12:00 PM', '2:30 PM'],
    focus: ['7:30 AM', '9:30 AM', '1:30 PM'],
  };

  for (let index = 0; index < days; index += 1) {
    const current = new Date(today);
    current.setDate(today.getDate() + index);
    const key = formatKey(current);
    const weekday = current.getDay();
    const dateNumber = current.getDate();

    let slots = [];

    if (weekday === 0) {
      // Sundays reserved for rest and resets
      slots = [];
    } else if (weekday === 6) {
      slots = index % 3 === 0 ? [] : ['10:00 AM', '12:30 PM'];
    } else if (weekday === 2) {
      slots = [...templates.light];
    } else if (weekday === 4) {
      slots = dateNumber % 4 === 0 ? [] : [...templates.focus];
    } else {
      slots = [...templates.full];
      if (dateNumber % 5 === 0) {
        slots.pop();
      }
    }

    availability[key] = slots;
  }

  return availability;
}

function buildCalendar(currentMonth) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstOfMonth = new Date(year, month, 1);
  const firstWeekday = firstOfMonth.getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const days = [];

  for (let i = 0; i < firstWeekday; i += 1) {
    days.push({ type: 'empty', key: `empty-${i}` });
  }

  for (let date = 1; date <= totalDays; date += 1) {
    const dateObj = new Date(year, month, date);
    days.push({ type: 'day', date, key: formatKey(dateObj) });
  }

  return days;
}

export default function Booking() {
  const [availability, setAvailability] = React.useState(() => generateAvailability());

  // Try to load server-provided availability; fall back to generated availability
  React.useEffect(() => {
    let mounted = true;
    fetch('/api/availability')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        // normalize: keys are YYYY-MM-DD -> array of slots
        if (data && typeof data === 'object') {
          setAvailability((prev) => ({ ...prev, ...data }));
        }
      })
      .catch(() => {
        // ignore; keep generated availability
      });
    return () => {
      mounted = false;
    };
  }, []);
  const minMonth = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }, []);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

  const calendarDays = useMemo(() => buildCalendar(currentMonth), [currentMonth]);
  const monthLabel = currentMonth.toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  });

  const handleMonthChange = (direction) => {
    setCurrentMonth((prev) => {
      const next = new Date(prev);
      next.setMonth(prev.getMonth() + direction);
      if (direction < 0 && next < minMonth) {
        return prev;
      }
      return next;
    });
  };

  const handleSelectDate = (key) => {
    const slots = availability[key] || [];
    if (slots.length === 0) return;
    setSelectedDate(key);
    setSelectedSlot('');
  };

  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
  };

  const selectedSlots = selectedDate ? availability[selectedDate] || [] : [];
  const canSubmit = Boolean(selectedDate && selectedSlot);

  return (
    <div className="page-wrapper booking-page">
      <section className="booking-intro">
        <span className="badge">Let&apos;s make it shine</span>
  <h1><span className="highlight-pink">Reserve</span> your indoor cleaning</h1>
        <p>
          Choose a date and time that fits your schedule. Once submitted, our team will send a confirmation email from{' '}
          <a href="mailto:abbey@pinkandpolish.com" className="mailto">abbey@pinkandpolish.com</a> and lock in your slot.
        </p>
  <p className="hero-tagline">Proudly serving McHenry, Illinois and surrounding areas such as Woodstock and nearby towns.</p>
        <p className="form-hint">
          Calendar availability updates in real-time based on current bookings. Need a rush clean? Tap an open slot and add the
          request in your notes.
        </p>
      </section>

      <section className="booking-layout">
        <div className="calendar-card">
          <header className="calendar-header">
            <h2>{monthLabel}</h2>
            <div className="calendar-nav" role="group" aria-label="Switch month">
              <button type="button" onClick={() => handleMonthChange(-1)} aria-label="Previous month">
                ‹
              </button>
              <button type="button" onClick={() => handleMonthChange(1)} aria-label="Next month">
                ›
              </button>
            </div>
          </header>

          <div className="calendar-grid">
            {weekdayLabels.map((day) => (
              <div key={day} className="calendar-weekday">
                {day}
              </div>
            ))}
            {calendarDays.map((item) => {
              if (item.type === 'empty') {
                return <div key={item.key} className="calendar-day is-empty" aria-hidden="true" />;
              }

              const slots = availability[item.key] || [];
              const isSelected = selectedDate === item.key;
              const isFull = slots.length === 0;

              return (
                <button
                  type="button"
                  key={item.key}
                  className={[
                    'calendar-day',
                    slots.length > 0 ? 'has-availability' : '',
                    isSelected ? 'is-selected' : '',
                    isFull ? 'is-full' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => handleSelectDate(item.key)}
                  disabled={slots.length === 0}
                  aria-pressed={isSelected}
                >
                  {item.date}
                </button>
              );
            })}
          </div>

          <div>
            {selectedDate ? (
              <>
                <h3>Available slots on {formatFriendly(selectedDate)}</h3>
                {selectedSlots.length > 0 ? (
                  <div className="slot-list">
                    {selectedSlots.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        className={['slot-button', selectedSlot === slot ? 'is-selected' : '']
                          .filter(Boolean)
                          .join(' ')}
                        onClick={() => handleSelectSlot(slot)}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="form-hint">This date is fully booked. Please choose another day for the prettiest sparkle.</p>
                )}
              </>
            ) : (
              <p className="form-hint">Select a date to view open appointment times.</p>
            )}
          </div>
        </div>

  <form className="form-card" action={formEndpoint} method="POST">
          <h2>Booking details</h2>
          <div className="form-grid">
            <div className="form-row inline">
              <label htmlFor="name">
                Full name
                <input id="name" name="name" type="text" placeholder="Your name" required />
              </label>
              <label htmlFor="email">
                Email address
                <input id="email" name="email" type="email" placeholder="you@example.com" required />
              </label>
              <label htmlFor="phone">
                Phone number
                <input id="phone" name="phone" type="tel" placeholder="(123) 456-7890" required />
              </label>
              <label htmlFor="squareFeet">
                Approx. square footage
                <input id="squareFeet" name="square_feet" type="text" placeholder="e.g. 1,200" />
              </label>
            </div>

            <div className="form-row">
              <label htmlFor="address">
                Service address
                <input id="address" name="address" type="text" placeholder="Street, unit, city" required />
              </label>
            </div>

            <div className="form-row inline">
              <label htmlFor="serviceFocus">
                Service focus
                <select id="serviceFocus" name="service_focus" defaultValue="" required>
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="Residential indoor cleaning">Residential indoor cleaning</option>
                  <option value="Commercial indoor cleaning">Commercial indoor cleaning</option>
                  <option value="Special event reset">Special event reset</option>
                </select>
              </label>
              <label htmlFor="visitType">
                Visit type
                <select id="visitType" name="visit_type" defaultValue="" required>
                  <option value="" disabled>
                    Choose frequency
                  </option>
                  <option value="Recurring weekly">Recurring weekly</option>
                  <option value="Recurring bi-weekly">Recurring bi-weekly</option>
                  <option value="Monthly refresh">Monthly refresh</option>
                  <option value="One-time deep clean">One-time deep clean</option>
                </select>
              </label>
            </div>

            <div className="form-row">
              <label htmlFor="notes">
                Notes &amp; access details
                <textarea
                  id="notes"
                  name="notes"
                  placeholder="Gate codes, preferred products, pet info, or aesthetic inspo links"
                />
              </label>
            </div>

            {!isConfigured && (
              <div className="form-row">
                <span className="notice">
                  Set <code>VITE_BOOKING_ENDPOINT</code> to your Formspree endpoint to enable submissions.
                </span>
              </div>
            )}

            <input type="hidden" name="preferred_date" value={selectedDate ? formatFriendly(selectedDate) : ''} />
            <input type="hidden" name="preferred_slot" value={selectedSlot} />
            {/* Optional: Set a nicer email subject in Formspree */}
            <input
              type="hidden"
              name="_subject"
              value={`New booking request — ${selectedDate ? formatFriendly(selectedDate) : 'date pending'}`}
            />
            {/* Redirect to a local thank-you page after successful submission */}
            <input
              type="hidden"
              name="_next"
              value={typeof window !== 'undefined' ? new URL('/booking-thanks.html', window.location.origin).toString() : '/booking-thanks.html'}
            />

            <button type="submit" className="btn btn--primary" disabled={!canSubmit}>
              {canSubmit ? 'Submit booking request' : 'Select a date & time to continue'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
