import ClickZoom from "../components/ClickZoom";
import Link from "next/link";

export default function Home() {
  return (
    <section className="max-w-2xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-serif font-bold mb-2 text-ink">Yash Bonde</h1>
        <p className="text-base text-ink mb-6">AI Engineer, Product Consultant. Full Time Nerd.</p>

        <div className="bg-muted/20 border border-muted/30 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-serif font-semibold text-ink mb-3">🚧 Under Development</h2>
          <p className="text-base text-ink mb-4">This website is currently under development. Please check out my current portfolio:</p>
          <ClickZoom>
            <a
              className="inline-block text-ink font-medium text-base hover:scale-105"
              href="https://magenta-reassurance-165266.framer.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Current Portfolio →
            </a>
          </ClickZoom>
        </div>

        <p className="text-base text-ink mb-2">I love helping businesses implement AI in their product and services. Research to build largest knowledge corpus of Sanskrit and AI.</p>
        <p className="text-base text-ink">CVE Lead at Ema. Prev. Head of Research at Tune AI</p>

        <div className="flex flex-wrap gap-5 mt-8 text-base">
          <ClickZoom>
            <a className="text-ink font-medium hover:scale-105" href="https://www.linkedin.com/in/yashbonde" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </ClickZoom>
          <ClickZoom>
            <Link className="text-ink font-medium hover:scale-105" href="/blog">Blogs</Link>
          </ClickZoom>
          <ClickZoom>
            <a className="text-ink font-medium hover:scale-105 devanagari" href="https://artha-pearl.vercel.app" target="_blank" rel="noopener noreferrer">Project <span className="devanagari">अर्थ</span> (Artha)</a>
          </ClickZoom>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div>
          <div className="text-2xl font-serif font-bold text-ink">8+ years</div>
          <div className="text-sm text-ink">Experience</div>
        </div>
        <div>
          <div className="text-2xl font-serif font-bold text-ink">Bangalore & San Francisco</div>
          <div className="text-sm text-ink">Location</div>
        </div>
        <div>
          <div className="text-2xl font-serif font-bold text-ink">🤙 Available</div>
          <div className="text-sm text-ink">Open to collaborate</div>
        </div>
      </div>

      <div className="space-y-5 mb-8">
        <p className="text-base text-ink">I have worked in the domain of Artificial Intelligence for 8+ years. I was working in GenAI and LLMs well before ChatGPT existed. Over my professional and hobby experience I have worked in all domains of AI from traditional ML to computer vision (CV) and Reinforcement Learning (RL).</p>
        <p className="text-base text-ink">I love helping businesses use AI. From ideation to production I have helped several large organisations including organiser of Abu Dhabi F1, largest content management companies and other data analytics companies across the globe.</p>
      </div>

      <ClickZoom>
        <Link className="inline-block text-ink font-medium text-base hover:scale-105" href="/about">More about me →</Link>
      </ClickZoom>
    </section>
  );
}
