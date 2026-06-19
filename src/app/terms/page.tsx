import Link from 'next/link'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#12131a] py-20 px-6">
      <div className="max-w-3xl mx-auto space-y-8 text-[#e2e1eb]">
        <Link href="/" className="text-[#c0c1ff] hover:underline font-mono text-[12px] mb-8 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
        <p className="text-[#c7c4d7]">Last updated: June 2026</p>

        <div className="space-y-6 text-[#c7c4d7] leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-[#e2e1eb] mb-3">1. Agreement to Terms</h2>
            <p>By accessing or using ThoughtGrid, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#e2e1eb] mb-3">2. Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on ThoughtGrid's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>modify or copy the materials;</li>
              <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
              <li>attempt to decompile or reverse engineer any software contained on ThoughtGrid's website;</li>
              <li>remove any copyright or other proprietary notations from the materials; or</li>
              <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#e2e1eb] mb-3">3. AI Generation & Content</h2>
            <p>ThoughtGrid utilizes artificial intelligence to generate content. You acknowledge that AI-generated content may be unpredictable and you are solely responsible for reviewing and approving any content generated through the platform before publishing it to third-party services like LinkedIn.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#e2e1eb] mb-3">4. Disclaimer</h2>
            <p>The materials on ThoughtGrid's website are provided on an 'as is' basis. ThoughtGrid makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#e2e1eb] mb-3">5. Limitations</h2>
            <p>In no event shall ThoughtGrid or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ThoughtGrid's website, even if ThoughtGrid or a ThoughtGrid authorized representative has been notified orally or in writing of the possibility of such damage.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#e2e1eb] mb-3">6. Contact</h2>
            <p>If you have any questions about these Terms, please contact us at: saikattanti2005@gmail.com</p>
          </section>
        </div>
      </div>
    </div>
  )
}
