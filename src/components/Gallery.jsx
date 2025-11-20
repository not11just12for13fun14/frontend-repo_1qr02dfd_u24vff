import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function VideoCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group rounded-2xl overflow-hidden bg-slate-900/60 border border-white/10 hover:border-blue-400/40 transition-colors"
    >
      <div className="aspect-video bg-black relative">
        <video
          src={`${API_BASE}${item.url}`}
          controls
          className="w-full h-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-slate-950/60 to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold leading-tight">{item.title}</h3>
        {item.description && (
          <p className="text-slate-300 text-sm mt-1">{item.description}</p>
        )}
      </div>
    </motion.div>
  )
}

function Gallery() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchVideos = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/videos`)
      const data = await res.json()
      setVideos(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  return (
    <section id="gallery" className="container mx-auto px-6 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Featured Videos</h2>
          <p className="text-slate-300 mt-1">A grid that invites exploration. Hover and play to preview.</p>
        </div>
        <button onClick={fetchVideos} className="h-10 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white">Refresh</button>
      </div>

      {loading ? (
        <p className="text-slate-300">Loading…</p>
      ) : videos.length === 0 ? (
        <p className="text-slate-300">No videos yet. Use the uploader below to add your work.</p>
      ) : (
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {videos.map((v, i) => (
            <VideoCard key={v.id} item={v} index={i} />
          ))}
        </motion.div>
      )}
    </section>
  )
}

export default Gallery
