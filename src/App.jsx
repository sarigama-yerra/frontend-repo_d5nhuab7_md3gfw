import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom'
import { Home, LineChart, Shield, Settings, User, LogIn, IndianRupee, ArrowRight } from 'lucide-react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'
import { LineChart as RLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Navbar() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/5">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="inline-block w-3 h-3 rounded-full bg-teal-400"></span>
          Zenith Broking
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLink to="/" className={({isActive}) => isActive ? 'text-teal-300' : 'text-gray-300'}>Home</NavLink>
          <NavLink to="/products" className={({isActive}) => isActive ? 'text-teal-300' : 'text-gray-300'}>Products</NavLink>
          <NavLink to="/pricing" className={({isActive}) => isActive ? 'text-teal-300' : 'text-gray-300'}>Pricing</NavLink>
          <NavLink to="/market" className={({isActive}) => isActive ? 'text-teal-300' : 'text-gray-300'}>Live Market</NavLink>
          <NavLink to="/portal" className={({isActive}) => isActive ? 'text-teal-300' : 'text-gray-300'}>Client Portal</NavLink>
          <NavLink to="/admin" className={({isActive}) => isActive ? 'text-teal-300' : 'text-gray-300'}>Admin</NavLink>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative h-[70vh] grid md:grid-cols-2 items-center max-w-7xl mx-auto px-4">
      <div className="space-y-5">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">Invest with confidence. Trade with clarity.</h1>
        <p className="text-gray-300 max-w-xl">A modern, transparent broking platform inspired by the best in the industry. Simple pricing, powerful tools, and secure infrastructure.</p>
        <div className="flex gap-3">
          <Link to="/market" className="btn btn-primary inline-flex items-center gap-2">Explore Markets <ArrowRight size={16}/></Link>
          <Link to="/pricing" className="btn btn-outline">See Pricing</Link>
        </div>
        <div className="grid grid-cols-3 gap-6 pt-6 text-center">
          <div className="card p-4 rounded-xl">
            <div className="text-2xl font-semibold">2M+</div>
            <div className="text-xs text-gray-400">Orders processed</div>
          </div>
          <div className="card p-4 rounded-xl">
            <div className="text-2xl font-semibold">99.95%</div>
            <div className="text-xs text-gray-400">Uptime</div>
          </div>
          <div className="card p-4 rounded-xl">
            <div className="text-2xl font-semibold">₹20</div>
            <div className="text-xs text-gray-400">Per order pricing</div>
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-0 bottom-0 left-0 md:static md:h-full rounded-2xl overflow-hidden">
        <div className="h-full w-full rounded-2xl">
          <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
    </section>
  )
}

function HomePage() {
  return (
    <main className="space-y-16">
      <Hero />
      <section className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6">
        {[
          { title: 'Trading', desc: 'Fast, reliable order execution with minimal distractions.' },
          { title: 'Mutual Funds', desc: 'Invest directly with zero commission. SIP ready.' },
          { title: 'IPOs', desc: 'Apply to the latest issues in a couple of taps.' },
        ].map((c) => (
          <div key={c.title} className="card p-6 rounded-xl">
            <h3 className="text-xl font-semibold">{c.title}</h3>
            <p className="text-gray-400 text-sm mt-2">{c.desc}</p>
          </div>
        ))}
      </section>
    </main>
  )
}

function ProductsPage() {
  const items = [
    { title: 'Trading', copy: 'Equities, F&O, Currencies. Built for speed.' },
    { title: 'Mutual Funds', copy: 'Direct plans with SIP management.' },
    { title: 'IPOs', copy: 'Apply in minutes with UPI support.' },
  ]
  return (
    <main className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6">
      {items.map((i) => (
        <div key={i.title} className="card p-6 rounded-xl">
          <h3 className="text-lg font-semibold">{i.title}</h3>
          <p className="text-gray-400 text-sm mt-2">{i.copy}</p>
        </div>
      ))}
    </main>
  )
}

function PricingPage() {
  return (
    <main className="max-w-5xl mx-auto px-4">
      <div className="card rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-2xl font-semibold">Simple Pricing</h3>
          <p className="text-gray-400 text-sm">Flat pricing, no hidden fees.</p>
        </div>
        <div className="p-6 grid md:grid-cols-3 gap-6">
          {[
            { label: 'Equity Delivery', price: '₹0/order' },
            { label: 'Intraday & F&O', price: '₹20/order' },
            { label: 'Mutual Funds', price: '₹0/commission' },
          ].map((p) => (
            <div key={p.label} className="rounded-xl p-6 bg-white/5">
              <div className="text-sm text-gray-400">{p.label}</div>
              <div className="text-3xl font-bold mt-2">{p.price}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

function LiveMarketPage() {
  const [symbol, setSymbol] = useState('NSE:TCS')
  const [quote, setQuote] = useState(null)

  const fetchQuote = async () => {
    try {
      const url = `${API_BASE}/api/market/quote?symbol=${encodeURIComponent(symbol)}`
      const res = await fetch(url)
      const data = await res.json()
      setQuote(data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => { fetchQuote() }, [])

  return (
    <main className="max-w-5xl mx-auto px-4 space-y-6">
      <div className="flex items-center gap-3">
        <input value={symbol} onChange={(e)=>setSymbol(e.target.value)} className="w-64 bg-white/5 border border-white/10 rounded px-3 py-2" />
        <button onClick={fetchQuote} className="btn btn-primary">Fetch</button>
      </div>

      <div className="card p-6 rounded-xl">
        <div className="text-sm text-gray-400">Live Quote</div>
        <pre className="text-xs overflow-auto mt-2">{quote ? JSON.stringify(quote, null, 2) : 'No data yet'}</pre>
      </div>
    </main>
  )
}

function ClientPortal() {
  // Mock portfolio chart data; in a real app, fetch user's holdings
  const data = Array.from({length: 12}).map((_,i)=>({ m: `M${i+1}`, p: 100 + Math.round(Math.sin(i/2)*20 + i*5) }))
  return (
    <main className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 card p-6 rounded-xl">
        <div className="text-sm text-gray-400">Portfolio Value</div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RLineChart data={data}>
              <XAxis dataKey="m" stroke="#64748b"/>
              <YAxis stroke="#64748b"/>
              <Tooltip/>
              <Line type="monotone" dataKey="p" stroke="#2dd4bf" strokeWidth={2} dot={false} />
            </RLineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card p-6 rounded-xl">
        <div className="text-sm text-gray-400">Balance</div>
        <div className="text-3xl font-bold mt-2">₹1,24,500</div>
        <div className="text-xs text-green-400 mt-1">+₹2,340 today</div>
      </div>
    </main>
  )
}

function AdminPage() {
  const [email, setEmail] = useState('admin@zenith.com')
  const [password, setPassword] = useState('admin123')
  const [token, setToken] = useState(localStorage.getItem('z_token')||'')
  const [clients, setClients] = useState([])
  const [form, setForm] = useState({name:'', email:'', phone:'', capital:0, profit:0})
  const [action, setAction] = useState({client_id:'', amount:0, note:''})

  const authedFetch = (url, opts={}) => fetch(url, { ...(opts||{}), headers: { 'Content-Type': 'application/json', ...(token?{Authorization:`Bearer ${token}`}:{}) } })

  const login = async () => {
    const res = await fetch(`${API_BASE}/api/admin/login`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email, password}) })
    const data = await res.json()
    if(data.token){ setToken(data.token); localStorage.setItem('z_token', data.token) }
  }

  const loadClients = async () => {
    const res = await authedFetch(`${API_BASE}/api/clients`)
    const data = await res.json()
    setClients(data.clients||[])
  }

  const addClient = async () => {
    await authedFetch(`${API_BASE}/api/clients`, { method:'POST', body: JSON.stringify(form) })
    setForm({name:'', email:'', phone:'', capital:0, profit:0})
    loadClients()
  }

  const updateClient = async (id, patch) => {
    await authedFetch(`${API_BASE}/api/clients/${id}`, { method:'PATCH', body: JSON.stringify(patch) })
    loadClients()
  }

  const withdraw = async () => {
    await authedFetch(`${API_BASE}/api/withdraw`, { method:'POST', body: JSON.stringify(action) })
    setAction({client_id:'', amount:0, note:''})
    loadClients()
  }

  const transfer = async () => {
    await authedFetch(`${API_BASE}/api/transfer`, { method:'POST', body: JSON.stringify({from_client_id: action.client_id, to_client_id: action.to_client_id, amount: action.amount, note: action.note}) })
    setAction({client_id:'', to_client_id:'', amount:0, note:''})
    loadClients()
  }

  useEffect(()=>{ if(token) loadClients() },[token])

  return (
    <main className="max-w-7xl mx-auto px-4 space-y-8">
      {!token && (
        <div className="card p-6 rounded-xl">
          <div className="text-lg font-semibold mb-3">Admin Login</div>
          <div className="flex flex-wrap gap-3">
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="bg-white/5 border border-white/10 rounded px-3 py-2"/>
            <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="bg-white/5 border border-white/10 rounded px-3 py-2"/>
            <button onClick={login} className="btn btn-primary">Login</button>
          </div>
        </div>
      )}

      {token && (
        <>
          <div className="card p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">Clients</div>
              <button onClick={loadClients} className="btn btn-outline">Refresh</button>
            </div>
            <div className="mt-4 grid md:grid-cols-3 gap-4">
              {clients.map(c=> (
                <div key={c._id} className="rounded-xl p-4 bg-white/5">
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-xs text-gray-400">{c.email}</div>
                  <div className="text-sm mt-2">Capital: ₹{c.capital}</div>
                  <div className="text-sm">Profit: ₹{c.profit}</div>
                  <div className="text-xs mt-2 flex gap-2">
                    <button className="btn btn-outline" onClick={()=>updateClient(c._id, {capital: (c.capital||0)+1000})}>+₹1000</button>
                    <button className="btn btn-outline" onClick={()=>updateClient(c._id, {profit: (c.profit||0)+200})}>+₹200 PnL</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-6 rounded-xl">
              <div className="text-lg font-semibold">Add Client</div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {['name','email','phone'].map(k=> (
                  <input key={k} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} placeholder={k} className="bg-white/5 border border-white/10 rounded px-3 py-2"/>
                ))}
                <input value={form.capital} onChange={e=>setForm({...form,capital:parseFloat(e.target.value)})} placeholder="capital" className="bg-white/5 border border-white/10 rounded px-3 py-2"/>
                <input value={form.profit} onChange={e=>setForm({...form,profit:parseFloat(e.target.value)})} placeholder="profit" className="bg-white/5 border border-white/10 rounded px-3 py-2"/>
              </div>
              <button onClick={addClient} className="btn btn-primary mt-3">Create</button>
            </div>

            <div className="card p-6 rounded-xl">
              <div className="text-lg font-semibold">Withdraw / Transfer</div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <input value={action.client_id} onChange={e=>setAction({...action,client_id:e.target.value})} placeholder="client_id (from)" className="bg-white/5 border border-white/10 rounded px-3 py-2"/>
                <input value={action.to_client_id||''} onChange={e=>setAction({...action,to_client_id:e.target.value})} placeholder="to_client_id (for transfer)" className="bg-white/5 border border-white/10 rounded px-3 py-2"/>
                <input value={action.amount} onChange={e=>setAction({...action,amount:parseFloat(e.target.value)})} placeholder="amount" className="bg-white/5 border border-white/10 rounded px-3 py-2"/>
                <input value={action.note} onChange={e=>setAction({...action,note:e.target.value})} placeholder="note" className="bg-white/5 border border-white/10 rounded px-3 py-2"/>
              </div>
              <div className="flex gap-3 mt-3">
                <button onClick={withdraw} className="btn btn-outline">Withdraw</button>
                <button onClick={transfer} className="btn btn-primary">Transfer</button>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  )
}

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 py-10">
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/products" element={<ProductsPage/>} />
          <Route path="/pricing" element={<PricingPage/>} />
          <Route path="/market" element={<LiveMarketPage/>} />
          <Route path="/portal" element={<ClientPortal/>} />
          <Route path="/admin" element={<AdminPage/>} />
        </Routes>
      </div>
      <footer className="py-10 text-center text-sm text-gray-400">© {new Date().getFullYear()} Zenith Broking</footer>
    </div>
  )
}

export default Layout
