import { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus('')

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      })

      const data = await res.json()
      if (res.ok) {
        if (data.status === 'sent') setStatus('Message sent to email successfully!')
        else setStatus('Message saved. Email delivery not configured in this environment.')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus(data.detail || 'Something went wrong.')
      }
    } catch (e) {
      setStatus(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="container mx-auto px-6 py-12">
      <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-6">
        <h2 className="text-3xl font-bold text-white">Let’s Work Together</h2>
        <p className="text-slate-300 mt-1">Send a message and it will reach my inbox.</p>

        <form onSubmit={handleSubmit} className="mt-6 grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl bg-slate-900/60 border border-white/10 p-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl bg-slate-900/60 border border-white/10 p-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="md:col-span-2 min-h-[140px] w-full rounded-xl bg-slate-900/60 border border-white/10 p-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="md:col-span-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-medium transition-colors"
            >
              {loading ? 'Sending…' : 'Send Message'}
            </button>
            {status && <p className="text-slate-300">{status}</p>}
          </div>
        </form>
      </div>
    </section>
  )
}

export default Contact
