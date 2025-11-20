import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6">
          <div className="backdrop-blur-md bg-slate-900/30 border border-white/10 rounded-2xl p-6 md:p-10 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Welcome to the place where your dreams become reality
            </h1>
            <p className="mt-4 text-slate-200 text-lg md:text-xl">
              Explore an interactive showcase of my video work. Dive in.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#gallery" className="px-5 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors">
                View Gallery
              </a>
              <a href="#contact" className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors">
                Work with Me
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/10 to-slate-950/60" />
    </section>
  )
}

export default Hero
