import { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function VideoUploader({ onUploaded }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      setError('Please choose a video file to upload.')
      return
    }
    setError('')
    setLoading(true)

    try {
      const form = new FormData()
      form.append('file', file)
      form.append('title', title || file.name)
      form.append('description', description)

      const res = await fetch(`${API_BASE}/api/videos`, {
        method: 'POST',
        body: form,
      })

      if (!res.ok) {
        const txt = await res.text()
        throw new Error(txt || 'Upload failed')
      }

      const data = await res.json()
      onUploaded?.(data)
      setTitle('')
      setDescription('')
      setFile(null)
      setOpen(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex items-center justify-between">
        <h3 className="text-xl md:text-2xl font-semibold text-white">Manage your gallery</h3>
        <button onClick={() => setOpen(!open)} className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white">
          {open ? 'Close Uploader' : 'Open Uploader'}
        </button>
      </div>

      {open && (
        <div id="upload" className="mt-6 bg-slate-800/40 border border-white/10 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-white">Upload a Video</h2>
          <p className="text-slate-300 mt-1">MP4, WebM, or MOV recommended. Max ~100MB for demo.</p>
          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl bg-slate-900/60 border border-white/10 p-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Short description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl bg-slate-900/60 border border-white/10 p-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full text-slate-200"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-medium transition-colors"
              >
                {loading ? 'Uploading…' : 'Upload'}
              </button>
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
          </form>
        </div>
      )}
    </div>
  )
}

export default VideoUploader
