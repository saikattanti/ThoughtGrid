'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { generateLinkedInPost, type AIModel } from '@/actions/generate'

const MODELS: { value: AIModel; label: string; badge: string }[] = [
  { value: 'grok-3-mini',         label: 'Grok 3 Mini',   badge: 'xAI' },
  { value: 'grok-3',              label: 'Grok 3',         badge: 'xAI' },
  { value: 'gemini-flash-latest', label: 'Gemini Flash',   badge: 'Google' },
  { value: 'gpt-4o-mini',         label: 'GPT-4o Mini',    badge: 'OpenAI' },
]

const STYLES = [
  { value: 'Professional', icon: 'work' },
  { value: 'Provocative',  icon: 'local_fire_department' },
  { value: 'Data-Driven',  icon: 'bar_chart' },
  { value: 'Thought Leader', icon: 'psychology' },
]

import { useRouter } from 'next/navigation'

export function ContentStudioClient({ hasLinkedIn }: { hasLinkedIn: boolean }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [url, setUrl] = useState(searchParams.get('url') || '')
  const [title, setTitle] = useState(searchParams.get('title') || '')
  const [style, setStyle] = useState('Professional')
  const [model, setModel] = useState<AIModel>('grok-3-mini')
  const [postContent, setPostContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleGenerate = async () => {
    if (!url || !title) return
    setIsGenerating(true)
    setErrorMsg('')
    const result = await generateLinkedInPost(url, title, style, model)
    if (result.success && result.text) {
      setPostContent(result.text)
    } else {
      setErrorMsg(result.error || 'Unknown error occurred')
    }
    setIsGenerating(false)
  }

  return (
    <div className="max-w-[1440px] mx-auto h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[20px] font-medium text-[#e2e1eb]">Workspace</h2>
        <span className="px-2.5 py-1 rounded-sm border border-[#464554] text-[#c7c4d7] font-mono text-[12px] flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">save</span> Auto-saved
        </span>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-180px)]">

        {/* Left: Context Source */}
        <div className="col-span-3 flex flex-col bg-[#1a1b22] border border-[#464554] rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-[#464554] flex items-center justify-between bg-[#1e1f26]/50">
            <h3 className="font-mono text-[11px] text-[#c7c4d7] uppercase tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">article</span> Context Source
            </h3>
            <button className="text-[#c7c4d7] hover:text-[#c0c1ff]">
              <span className="material-symbols-outlined text-[18px]">more_vert</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div>
              <label className="font-mono text-[11px] text-[#c7c4d7] uppercase tracking-wider mb-2 block">Article Title</label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Paste article title..."
                className="w-full bg-[#12131a] border border-[#464554] rounded-sm p-2.5 text-[14px] text-[#e2e1eb] focus:outline-none focus:border-[#c0c1ff]/50 placeholder:text-[#c7c4d7]/30"
              />
            </div>

            <div>
              <label className="font-mono text-[11px] text-[#c7c4d7] uppercase tracking-wider mb-2 block">Article URL</label>
              <input
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-[#12131a] border border-[#464554] rounded-sm p-2.5 text-[14px] text-[#e2e1eb] focus:outline-none focus:border-[#c0c1ff]/50 placeholder:text-[#c7c4d7]/30"
              />
            </div>

            {url && (
              <div className="rounded-lg border border-[#464554]/30 overflow-hidden">
                <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#12131a]/80 backdrop-blur-sm rounded text-[10px] font-mono text-[#e2e1eb] border border-[#464554]/50">
                  SOURCE
                </div>
              </div>
            )}

            {title && (
              <div>
                <h4 className="text-[16px] font-medium text-[#e2e1eb] leading-tight">{title}</h4>
                {url && <p className="text-[12px] text-[#c7c4d7] mt-2 break-all">{url}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Center: Draft Editor */}
        <div className="col-span-5 flex flex-col bg-[#0c0e14] border border-[#464554] rounded-xl overflow-hidden relative">
          <div className="absolute inset-0 pointer-events-none rounded-xl" style={{ boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5)' }}></div>

          <div className="px-4 py-3 border-b border-[#464554] flex items-center justify-between bg-[#1a1b22]/80 backdrop-blur-md relative z-10">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#c0c1ff] text-[20px]">edit_document</span>
              <h3 className="text-[14px] font-medium text-[#e2e1eb]">Draft Editor</h3>
            </div>
            <div className="flex items-center gap-1 bg-[#12131a] border border-[#464554] rounded-sm p-0.5">
              {['format_bold', 'format_italic', 'format_list_bulleted', 'link'].map((icon, i) => (
                <button key={icon} className="p-1 rounded text-[#c7c4d7] hover:text-[#e2e1eb] hover:bg-[#383940]/50">
                  <span className="material-symbols-outlined text-[18px]">{icon}</span>
                </button>
              ))}
            </div>
          </div>

          <textarea
            className="flex-1 p-6 bg-transparent text-[16px] text-[#e2e1eb] leading-relaxed resize-none focus:outline-none placeholder:text-[#464554] relative z-10 font-sans"
            placeholder={isGenerating ? '' : 'Your AI-generated LinkedIn post will appear here...\n\nPaste a URL and title in the left panel, choose your style, and click Generate.'}
            value={postContent}
            onChange={e => setPostContent(e.target.value)}
          />

          {isGenerating && (
            <div className="absolute inset-0 flex items-center justify-center z-20 bg-[#0c0e14]/80 backdrop-blur-sm">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-full border border-[#c0c1ff]/30 flex items-center justify-center mx-auto ai-processing-glow">
                  <span className="material-symbols-outlined text-[#c0c1ff] text-[24px] animate-spin">sync</span>
                </div>
                <p className="font-mono text-[12px] text-[#c0c1ff] uppercase tracking-widest">Generating with {MODELS.find(m => m.value === model)?.label}...</p>
              </div>
            </div>
          )}

          <div className="px-4 py-3 border-t border-[#464554] bg-[#1a1b22] flex justify-between items-center relative z-10">
            <div className="flex gap-2">
              <button
                onClick={() => setPostContent('')}
                className="px-3 py-1.5 rounded-sm border border-[#464554] text-[#c7c4d7] text-[14px] hover:bg-[#12131a] transition-colors"
              >Discard</button>
            </div>
            <button 
              onClick={() => {
                if (!hasLinkedIn) {
                  router.push('/dashboard/settings')
                } else {
                  // Post to LinkedIn logic here
                  console.log('Publishing to LinkedIn...')
                }
              }}
              className="px-5 py-2 rounded-lg bg-[#e2e1eb] text-[#12131a] text-[14px] font-medium hover:bg-[#c0c1ff] hover:shadow-[0_0_15px_rgba(192,193,255,0.3)] transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">send</span> Stage for Publishing
            </button>
          </div>
        </div>

        {/* Right: AI Refinement */}
        <div className="col-span-4 flex flex-col gap-4 overflow-hidden">
          <div className="flex-1 flex flex-col bg-[#1a1b22] border border-[#464554] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#464554] bg-[#1e1f26]/50">
              <h3 className="font-mono text-[11px] text-[#c0c1ff] uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">tune</span> AI Refinement
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Model Chooser */}
              <div>
                <label className="font-mono text-[11px] text-[#c7c4d7] uppercase tracking-wider mb-2 block">AI Model</label>
                <div className="grid grid-cols-2 gap-2">
                  {MODELS.map(m => (
                    <button
                      key={m.value}
                      onClick={() => setModel(m.value)}
                      className={`px-2 py-2 rounded-sm border text-[12px] font-medium flex flex-col items-start gap-0.5 transition-colors ${
                        model === m.value
                          ? 'border-[#c0c1ff]/60 bg-[#c0c1ff]/10 text-[#c0c1ff]'
                          : 'border-[#464554] bg-[#12131a] text-[#c7c4d7] hover:border-[#908fa0] hover:text-[#e2e1eb]'
                      }`}
                    >
                      <span className="font-mono text-[10px] opacity-60">{m.badge}</span>
                      <span>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Style Chooser */}
              <div>
                <label className="font-mono text-[11px] text-[#c7c4d7] uppercase tracking-wider mb-2 block">Tone & Style</label>
                <div className="grid grid-cols-2 gap-2">
                  {STYLES.map(s => (
                    <button
                      key={s.value}
                      onClick={() => setStyle(s.value)}
                      className={`px-3 py-2 rounded-sm border text-[12px] font-medium flex items-center gap-1 transition-colors ${
                        style === s.value
                          ? 'border-[#c0c1ff] bg-[#c0c1ff]/10 text-[#c0c1ff]'
                          : 'border-[#464554] bg-[#12131a] text-[#c7c4d7] hover:border-[#908fa0] hover:text-[#e2e1eb]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">{s.icon}</span>
                      {s.value}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="p-3 rounded-lg border border-[#ffb4ab]/30 bg-[#ffb4ab]/5 text-[#ffb4ab] font-mono text-[11px]">
                  {errorMsg}
                </div>
              )}

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !url || !title}
                className="w-full py-3 px-4 rounded-lg bg-[#e2e1eb] text-[#12131a] text-[14px] font-medium hover:bg-[#c0c1ff] hover:shadow-[0_0_15px_rgba(192,193,255,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-[18px]">{isGenerating ? 'sync' : 'auto_awesome'}</span>
                {isGenerating ? 'Generating...' : 'Generate Post'}
              </button>
            </div>
          </div>

          {/* LinkedIn Preview */}
          <div className="h-[200px] flex flex-col bg-[#1D2226] border border-[#464554] rounded-xl overflow-hidden flex-shrink-0">
            <div className="px-3 py-2 border-b border-[#38434F] flex items-center gap-2">
              <span className="text-[#0A66C2] font-bold text-[14px]">in</span>
              <span className="text-[12px] text-[#E9E9E9]">Feed Preview</span>
            </div>
            <div className="p-3 overflow-y-auto flex-1">
              {postContent ? (
                <div className="text-[12px] text-white leading-relaxed line-clamp-6">{postContent}</div>
              ) : (
                <div className="text-[12px] text-[#CFCFCF] leading-relaxed opacity-40 italic">Your post preview will appear here after generation...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
