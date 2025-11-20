import Hero from './components/Hero'
import VideoUploader from './components/VideoUploader'
import Gallery from './components/Gallery'
import Contact from './components/Contact'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <Hero />

      <main className="container mx-auto px-6 -mt-24 relative z-10">
        <VideoUploader onUploaded={() => { /* gallery will refresh via manual button for now */ }} />
      </main>

      <Gallery />

      <Contact />

      <footer className="py-12 text-center text-slate-400">
        © {new Date().getFullYear()} Your Name — All Rights Reserved
      </footer>
    </div>
  )
}

export default App
