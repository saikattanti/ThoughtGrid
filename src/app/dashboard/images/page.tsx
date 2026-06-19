export default function ImageStudioPage() {
  return (
    <div className="max-w-[1440px] mx-auto h-full space-y-6 relative">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>

      <div className="flex items-end justify-between border-b border-outline pb-2 relative z-10">
        <h2 className="text-[32px] font-semibold text-foreground tracking-tight leading-tight">Image Studio</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-180px)] relative z-10">
        {/* Left: Prompt & Settings */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="glass-card rounded-xl border border-outline flex-1 flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-outline bg-surface-dim/30 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-primary">brush</span>
              <h3 className="text-[14px] font-medium text-foreground">Generation Settings</h3>
            </div>
            
            <div className="p-4 flex-1 overflow-y-auto space-y-6">
              <div>
                <label className="font-mono text-[11px] text-muted uppercase tracking-wider mb-2 block">Prompt</label>
                <textarea
                  rows={4}
                  placeholder="Describe the image you want to generate... e.g., 'A futuristic city skyline with flying cars, neon lights, cyberpunk style, high detail'"
                  className="w-full bg-background/50 border border-outline rounded-lg p-3 text-[14px] text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none placeholder:text-muted/50"
                ></textarea>
              </div>

              <div>
                <label className="font-mono text-[11px] text-muted uppercase tracking-wider mb-2 block">Aspect Ratio</label>
                <div className="grid grid-cols-3 gap-2">
                  <button className="py-2 border border-primary bg-primary/10 text-primary rounded text-[12px] font-medium">1:1</button>
                  <button className="py-2 border border-outline bg-background/50 text-muted rounded text-[12px] font-medium hover:border-outline-variant hover:text-foreground">16:9</button>
                  <button className="py-2 border border-outline bg-background/50 text-muted rounded text-[12px] font-medium hover:border-outline-variant hover:text-foreground">9:16</button>
                </div>
              </div>

              <div>
                <label className="font-mono text-[11px] text-muted uppercase tracking-wider mb-2 block">Art Style</label>
                <select className="w-full bg-background/50 border border-outline rounded-lg p-3 text-[14px] text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors">
                  <option>Photorealistic</option>
                  <option>Cyberpunk</option>
                  <option>Anime</option>
                  <option>Digital Art</option>
                  <option>3D Render</option>
                </select>
              </div>
            </div>

            <div className="p-4 border-t border-outline bg-background/30">
              <button className="w-full py-3 rounded-lg bg-primary text-on-primary text-[14px] font-medium hover:bg-primary-container transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                Generate Image
              </button>
            </div>
          </div>
        </div>

        {/* Right: Gallery */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="glass-panel rounded-xl border border-outline flex-1 flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-outline bg-surface-dim/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-muted">gallery_thumbnail</span>
                <h3 className="text-[14px] font-medium text-foreground">Recent Generations</h3>
              </div>
              <button className="text-[12px] font-mono text-primary hover:text-primary-container transition-colors">View All</button>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square bg-background/30 rounded-lg border border-outline overflow-hidden relative group cursor-pointer">
                    <div className="absolute inset-0 flex items-center justify-center text-muted">
                      <span className="material-symbols-outlined text-[32px] opacity-20">image</span>
                    </div>
                    {/* Simulated image overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
                    
                    {/* Hover actions */}
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                      <button className="px-4 py-1.5 rounded-full bg-primary text-on-primary text-[12px] font-medium flex items-center gap-1 hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-[14px]">download</span> Download
                      </button>
                      <button className="px-4 py-1.5 rounded-full bg-surface border border-outline text-foreground text-[12px] font-medium flex items-center gap-1 hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-[14px]">share</span> Use in Post
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
