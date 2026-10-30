const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Request failed');
  return data;
}

export async function createBooking(payload) {
  return request('/bookings', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function verifyPayment(payload) {
  return request('/payments/verify', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getBooking(id) {
  return request(`/bookings/${id}`);
}

const FALLBACK_COUNTRIES = [
  { name: 'India',     flag: '🇮🇳', code: '+91'  },
  { name: 'USA',       flag: '🇺🇸', code: '+1'   },
  { name: 'UK',        flag: '🇬🇧', code: '+44'  },
  { name: 'UAE',       flag: '🇦🇪', code: '+971' },
  { name: 'Australia', flag: '🇦🇺', code: '+61'  },
  { name: 'Canada',    flag: '🇨🇦', code: '+1'   },
  { name: 'Germany',   flag: '🇩🇪', code: '+49'  },
  { name: 'France',    flag: '🇫🇷', code: '+33'  },
  { name: 'Singapore', flag: '🇸🇬', code: '+65'  },
  { name: 'Nepal',     flag: '🇳🇵', code: '+977' },
];

export async function fetchCountryCodes() {
  try {
    const res = await fetch('https://restcountries.com/v3.1/all?fields=name,idd,flag');
    if (!res.ok) throw new Error('API error');
    const data = await res.json();

    const list = data
      .filter(c => c.idd?.root && c.idd?.suffixes?.length)
      .map(c => ({
        name: c.name.common,
        flag: c.flag,
        code: c.idd.root + (c.idd.suffixes.length === 1 ? c.idd.suffixes[0] : ''),
      }))
      .filter(c => c.code && c.code !== '+')
      .sort((a, b) => a.name.localeCompare(b.name));

    // Pin India at the top
    const india = list.find(c => c.name === 'India');
    const rest  = list.filter(c => c.name !== 'India');
    return india ? [india, ...rest] : list;
  } catch {
    return FALLBACK_COUNTRIES;
  }
}
