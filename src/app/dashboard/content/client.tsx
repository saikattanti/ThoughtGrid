'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { generateLinkedInPost, type AIModel } from '@/actions/generate'
import { Loader2, Sparkles, Send, Cpu } from 'lucide-react'

const MODELS: { value: AIModel; label: string; badge: string; badgeColor: string }[] = [
  { value: 'grok-3-mini',         label: 'Grok 3 Mini',   badge: 'xAI',    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  { value: 'grok-3',              label: 'Grok 3',         badge: 'xAI',    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  { value: 'gemini-flash-latest', label: 'Gemini Flash',   badge: 'Google', badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  { value: 'gpt-4o-mini',         label: 'GPT-4o Mini',    badge: 'OpenAI', badgeColor: 'bg-violet-500/10 text-violet-400 border-violet-500/20' },
]

export function ContentStudioClient() {
  const searchParams = useSearchParams()
  const initialUrl = searchParams.get('url') || ''
  const initialTitle = searchParams.get('title') || ''

  const [url, setUrl] = useState(initialUrl)
  const [title, setTitle] = useState(initialTitle)
  const [style, setStyle] = useState('Professional')
  const [model, setModel] = useState<AIModel>('grok-3-mini')
  const [postContent, setPostContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const selectedModel = MODELS.find(m => m.value === model)!

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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Source & Settings Panel */}
      <div className="space-y-4 lg:col-span-1">
        <Card className="bg-[#1e1f26] border-white/10 text-white">
          <CardHeader>
            <CardTitle className="text-lg">Source Material</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Article Title</label>
              <Input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Enter article title"
                className="bg-[#12131a] border-white/10 text-white placeholder:text-zinc-600"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Article URL</label>
              <Input 
                value={url} 
                onChange={(e) => setUrl(e.target.value)} 
                placeholder="https://"
                className="bg-[#12131a] border-white/10 text-white placeholder:text-zinc-600"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1e1f26] border-white/10 text-white">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Cpu className="h-4 w-4 text-indigo-400" />
              AI Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">

            {/* Model Chooser */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">AI Model</label>
              <Select value={model} onValueChange={(val) => setModel(val as AIModel)}>
                <SelectTrigger className="w-full bg-[#12131a] border-white/10 text-white">
                  <SelectValue>
                    <div className="flex items-center justify-between w-full gap-2">
                      <span>{selectedModel.label}</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${selectedModel.badgeColor}`}>
                        {selectedModel.badge}
                      </span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-[#1e1f26] border-white/10 text-white">
                  {MODELS.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      <div className="flex items-center gap-3 w-full">
                        <span>{m.label}</span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ml-auto ${m.badgeColor}`}>
                          {m.badge}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Writing Style */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Writing Style</label>
              <Select value={style} onValueChange={(val) => setStyle(val || 'Professional')}>
                <SelectTrigger className="w-full bg-[#12131a] border-white/10 text-white">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent className="bg-[#1e1f26] border-white/10 text-white">
                  <SelectItem value="Professional">Professional</SelectItem>
                  <SelectItem value="Provocative">Provocative</SelectItem>
                  <SelectItem value="Data-Driven">Data-Driven</SelectItem>
                  <SelectItem value="Storytelling">Storytelling</SelectItem>
                  <SelectItem value="Founder Perspective">Founder Perspective</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {errorMsg && (
              <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-md p-2">{errorMsg}</p>
            )}

            <Button 
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white border-none mt-2 transition-all hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]"
              onClick={handleGenerate}
              disabled={isGenerating || !url || !title}
            >
              {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              {isGenerating ? `Generating with ${selectedModel.label}...` : 'Generate Post'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Editor Panel */}
      <div className="lg:col-span-2">
        <Card className="h-full min-h-[500px] bg-[#1e1f26] border-white/10 text-white flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg">LinkedIn Post Editor</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-4">
            <Textarea 
              className="flex-1 min-h-[350px] bg-[#12131a] border-white/10 text-zinc-200 resize-none p-4 text-sm leading-relaxed placeholder:text-zinc-600"
              placeholder="Your generated post will appear here..."
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
            <div className="flex justify-end gap-3 mt-auto pt-2">
              <Button variant="outline" className="border-white/10 bg-transparent hover:bg-white/5 text-white">
                Save Draft
              </Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white border-none">
                <Send className="mr-2 h-4 w-4" /> Publish to LinkedIn
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
