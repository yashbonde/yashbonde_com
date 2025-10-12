import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function AboutPage() {
    return (
        <section>
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-8 mb-10">
                {/* Image on the left */}
                <div className="flex-shrink-0 w-full sm:w-auto">
                    <Image
                        src="https://ndotovhaihcfvwintgpc.supabase.co/storage/v1/object/public/yashbonde/photos/IMG_5717.jpeg"
                        alt="Yash Bonde"
                        width={400}
                        height={250}
                        className="rounded-lg object-cover max-w-full h-auto"
                    />
                </div>

                {/* Text content on the right */}
                <div className="flex-1">
                    <div className="text-3xl font-serif font-bold text-ink mb-2">Yash Bonde</div>
                    <div className="text-base text-ink mb-4">My work experience as builder of AI products that drive
                        real business value. LLM trainer, agentic systems, product development, building startups.
                    </div>
                    <div className="text-sm text-ink mb-1">
                        <Link href="#work-experience" className="inline-flex items-center gap-2 ">
                            Experience
                            <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                        </Link>
                    </div>
                    <div className="text-sm text-ink mb-1">
                        <Link href="#projects" className="inline-flex items-center gap-2 ">
                            Projects
                            <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                        </Link>
                    </div>
                    <div className="text-sm text-ink">
                        <Link href="https://artha-pearl.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 ">
                            Project अर्थ (Artha)
                            <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Work Experience */}
            <div id="work-experience" className="mb-8">

                {/* Ema Unlimited */}
                <div className="mb-8 ">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div className="mb-2 sm:mb-0">
                            <p className="text-lg font-serif font-semibold position-text">Software Engineer, CVE Lead</p>
                            <p className="text-base text-ink font-medium">
                                <Link href="http://ema.co" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 ">
                                    <code>Ema Unlimited</code>
                                    <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                                </Link>
                            </p>
                        </div>
                        <div className="text-left sm:text-right text-sm text-ink">
                            <p>March 2025 - <span className="font-bold">[Present]</span>, Bangalore</p>
                        </div>
                    </div>
                    <p className="text-sm text-ink mb-3">Tune AI was acquihired by Ema Unlimited in March, 2025.</p>
                    <ul className="text-sm text-ink space-y-1 mb-2">
                        <li>• Leading post sales implementation for several F50 clients. End to end lifecycle from discovery to delivery.</li>
                        <li>• Built 2+ internal tools. Reduced effort by multiple hours/week/employee.</li>
                    </ul>
                    <p className="text-sm text-ink mb-3">After moving to Post Sales team, I realised the challenges of project management.
                        Led building CVE-One AI for post sales team to automate project management. Used by multiple teams to track updates
                        for a project.</p>
                </div>

                {/* Tune AI */}
                <div className="mb-8 ">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div className="mb-2 sm:mb-0">
                            <p className="text-lg font-serif font-semibold position-text">Head of Research</p>
                            <p className="text-base text-ink font-medium">
                                <Link href="https://github.com/NimbleBoxAI" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 ">
                                    <code>Tune AI</code>
                                    <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                                </Link>
                            </p>
                        </div>
                        <div className="text-left sm:text-right text-sm text-ink">
                            <p>Dec. 2020 — Feb. 2025, Chennai, Bangalore & San Francisco</p>
                        </div>
                    </div>
                    <p className="text-sm text-ink mb-3">GenAI for Enterprises</p>
                    <p className="text-sm text-ink mb-3">At Tune I have seen every part of the startup journey from ideation to discovering PMF to failing
                        in monetization to eventually landing contracts with some of the best organisations in their market. Backed by the best: Accel,
                        Together Fund, Techstars, Venture Catalysts, Cornerstone Venture Partners, Chennai Angels, and Astarc Ventures.</p>

                    <p className="text-sm font-semibold text-ink mb-2">Key Achievements</p>
                    <div className="ml-4 mb-3">
                        <ul className="text-sm text-ink space-y-1">
                            <li>• Successfully delivered multiple enterprise projects from ideation to production combined revenue of <span className="font-bold">$140K+</span></li>
                            <li>• Pioneered the implementation of <span className="font-bold">Chain of Thought (CoT)</span> and several other context engineering techniques for Tune Chat</li>
                            <li>• <span className="font-bold">500K+ users</span> on Tune Chat and cutomers <span className="font-bold">finetuned 100+</span> models on Tune Studio</li>
                            <li>• Among the first companies to deploy Meta Llama 2 in production within <span className="font-bold">24 hours</span> of its release</li>
                            <li>• Deployed Meta Llama 3 in production within 1 hour of its release.
                                Recognized by <span className="font-bold">Meta</span> as one of their <span className="font-bold">India partners</span>.</li>
                            <li>• Did several events for Tune AI <span className="font-bold">helping build</span> the Bangalore AI/ML community.</li>
                        </ul>
                    </div>

                    <p className="text-sm font-semibold text-ink mb-2">Enterprise Solutions</p>
                    <p className="text-sm text-ink mb-3">I was also picked up enterprise solutioning. Worked directly with organizer
                        of Abu Dhabi F1 (<span className="font-bold">Ethara</span>), world&apos;s largest scientific contents product
                        (<span className="font-bold">Clarivate</span>) and <span className="font-bold">Intel</span>. My responsibilities included:</p>
                    <div className="ml-4 mb-3">
                        <ul className="text-sm text-ink space-y-1">
                            <li>• Led two teams totaling <span className="font-bold">8 people</span></li>
                            <li>• Developed AI Agents for reducing sales TAT from <span className="font-bold">14 days</span> to <span className="font-bold">5 minutes</span> flat</li>
                            <li>• Architected large data processing pipeline to run inference on <span className="font-bold">100K+ documents/day</span></li>
                            <li>• Context engineering systems to ensure <span className="font-bold">100% grounded</span> AI results</li>
                            <li>• These projects eventually became <span className="font-bold">biggest revenue drivers</span> for Tune AI</li>
                            <li>• Worked <span className="font-bold">end to end</span> from sales to discovery calls to final delivery</li>
                            <li>• With Intel we delivered the whitepaper on OpenVino, delivering <span className="font-bold">20x faster Mask-RCNN</span></li>
                        </ul>
                    </div>

                    <p className="text-sm text-ink mb-3">The achievements might be mild by world standards. But for a team of 20 young hackers
                        this was a wild success after 4+ years of hard work. Truth is, just like any other startup, no one told us any process and we
                        discovered / built our own, all the way 0 to 1. For a 24 year old, this was the <span className="font-bold">Fuck Around, Find Out (FAFO)</span> learning phase of life.
                        I worked on everything I could get my hands on.
                    </p>

                    <p className="text-sm font-semibold text-ink mb-2">Product developement for features in Tune and NimbleBox:</p>
                    <div className="ml-4 mb-3">
                        <ul className="text-sm text-ink space-y-1">
                            <li>• <span className="font-semibold">Blob</span> : Client facing agent and configurable assistant in Studio</li>
                            <li>• <span className="font-semibold">ChainFury</span> : Backend tool for chain of thought prompting</li>
                            <li>• <span className="font-semibold">Koro</span> : Experimental Llama 2 derived architecture for unified model for Next token generation (NTG), Embedding model (LM-Head removed), Regression Model for linear prediction.</li>
                            <li>• <span className="font-semibold">Silk</span> : Distributed code storage and execution engine that could run any DAG workflow of arbitrary python functions. Ensured retries and rollbacks on errors.</li>
                            <li>• <span className="font-semibold">Saturn</span> : A layer on jupyterkernelgateway that could be connected with K8S to run code as a service. This was our take on AWS lambda.</li>
                            <li>• <span className="font-semibold">LMAO</span> : General purpose logging and rule based alerting system with UI rule builder.</li>
                            <li>• <span className="font-semibold">Vedang</span> : Remote python code parsing engine, used to determine how to run a python code.</li>
                            <li>• <span className="font-semibold">Armoury</span> : RAG system backend written completely in go</li>
                            <li>• <span className="font-semibold">NN-One</span> : Our attempt to train an LLM. Curated 375GB+ of data and attempted to train a model on it.
                                Learnt a lot about hard problems in software, the hard way.</li>
                            <li>• Lot of eventually forgotten code</li>
                        </ul>
                    </div>

                    <p className="text-sm font-semibold text-ink mb-2">Things I&apos;ll remember:</p>
                    <div className="ml-4 mb-3">
                        <ul className="text-sm text-ink space-y-1">
                            <li>• Built an nbox.Operator python toolkit that could be used to deploy code as a job/service on CPU/GPU.
                                This was eventually perfected by Modal.</li>
                            <li>• We shipped a version of NimbleBox with album style cover image for each Project.</li>
                            <li>• The joy of people when they discovered something about the product.</li>
                            <li>• Pleasure of no shame after loosing fear of rejection in sales.</li>
                        </ul>
                    </div>

                    <p className="text-sm text-ink mb-2">Other than the points mentioned above, in the startup, I&apos;ve helped with sales, design, branding, customer success, etc.</p>
                </div>

                {/* Hack MIT */}
                <div className="mb-8 ">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div className="mb-2 sm:mb-0">
                            <p className="text-lg font-serif font-semibold position-text">Mentor & Judge</p>
                            <p className="text-base text-ink font-medium">
                                <Link href="https://hackmit.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 ">
                                    <code>Hack MIT 2024</code>
                                    <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                                </Link>
                            </p>
                        </div>
                        <div className="text-left sm:text-right text-sm text-ink">
                            <p>September 2024, MIT, Cambridge</p>
                        </div>
                    </div>
                    <ul className="text-sm text-ink space-y-1 mb-2">
                        <li>• Gave a technical workshop on Tune&apos;s AI research</li>
                        <li>• Mentored teams building AI products for first responders, fashion designing, etc</li>
                    </ul>
                </div>

                {/* PennApps */}
                <div className="mb-8 ">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div className="mb-2 sm:mb-0">
                            <p className="text-lg font-serif font-semibold position-text">Mentor & Judge</p>
                            <p className="text-base text-ink font-medium">
                                <Link href="https://pennapps.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 ">
                                    <code>PennApps XXV</code>
                                    <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                                </Link>
                            </p>
                        </div>
                        <div className="text-left sm:text-right text-sm text-ink">
                            <p>September 2024, University of Pennsylvania, Pennsylvania</p>
                        </div>
                    </div>
                    <ul className="text-sm text-ink space-y-1 mb-2">
                        <li>• Gave a technical workshop on Tune Studio</li>
                        <li>• Mentored teams building AI products in education, etc</li>
                    </ul>
                </div>

                {/* NPAW */}
                <div className="mb-8 ">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div className="mb-2 sm:mb-0">
                            <p className="text-lg font-serif font-semibold position-text">AI Consultant</p>
                            <p className="text-base text-ink font-medium"><code>NPAW, Spain</code></p>
                        </div>
                        <div className="text-left sm:text-right text-sm text-ink">
                            <p>Dec. 2020 — March 2021, Remote</p>
                        </div>
                    </div>
                    <p className="text-sm text-ink">GenAI with GPT-2. R&D for latest in chatbot technology to ease up sifting through extremely large datapoints. Advanced voice based Business Intelligence toolkit, control and ask using voice only!</p>
                </div>

                {/* Shipmnts */}
                <div className="mb-8 ">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div className="mb-2 sm:mb-0">
                            <p className="text-lg font-serif font-semibold position-text">ML Engineer</p>
                            <p className="text-base text-ink font-medium">
                                <Link href="https://shipmnts.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 ">
                                    <code>Shipmnts</code>
                                    <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                                </Link>
                            </p>
                        </div>
                        <div className="text-left sm:text-right text-sm text-ink">
                            <p>July 2019 — Nov. 2020, Ahmedabad</p>
                        </div>
                    </div>
                    <ul className="text-sm text-ink space-y-1">
                        <li>• Built ML solution to convert unstructured business data like documents (scanned, digitised) to structured knowledge using supervised and unsupervised machine learning algorithms</li>
                        <li>• Built services on top of this extracted data like rules management, abnormality detection along with a full learning system</li>
                        <li>• Worked with planets largest supply chain companies (<span className="font-bold">Maersk & CMA-CGM</span>) to deliver PoCs, clients based in Europe, <span className="font-bold">APAC and LATAM</span> regions</li>
                        <li>• Involved in product design, development and customer interaction with multiple clients</li>
                    </ul>
                </div>

                {/* Kaaenaat */}
                <div className="mb-8 ">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div className="mb-2 sm:mb-0">
                            <p className="text-lg font-serif font-semibold position-text">Summer Intern</p>
                            <p className="text-base text-ink font-medium"><code>Kaaenaat</code></p>
                        </div>
                        <div className="text-left sm:text-right text-sm text-ink">
                            <p>April 2018 — Oct. 2018, Bangalore</p>
                        </div>
                    </div>
                    <ul className="text-sm text-ink space-y-1">
                        <li>• Upgradation of Kount, a product which resulted in improved results by performing live traffic analysis like Dynamic Trajectory Clustering and Anomaly Detection by looking at raw footage using machine learning, was implemented on an <span className="font-bold">embedded device</span> for on-the-edge application</li>
                        <li>• Designing and making of an in-house application for faster Image Segmentation compared to classical methods</li>
                    </ul>
                </div>

                {/* Connecticus */}
                <div className="mb-8 ">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div className="mb-2 sm:mb-0">
                            <p className="text-lg font-serif font-semibold position-text">Machine Learning Intern</p>
                            <p className="text-base text-ink font-medium">
                                <Link href="https://connecticus.in/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 ">
                                    <code>Connecticus Technologies Pvt Ltd</code>
                                    <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                                </Link>
                            </p>
                        </div>
                        <div className="text-left sm:text-right text-sm text-ink">
                            <p>May 2017 — July 2017, Pune</p>
                        </div>
                    </div>
                    <p className="text-sm text-ink">Worked on Connecticus&apos; cognitive platform NESSA to develop machine learning based approach to making a FAQ module. Implemented <span className="font-bold">Facebook&apos;s Memory Networks</span> and a variety of NLP tasks such as POS tagging, stemming and lemmatisation of language.</p>
                </div>

                {/* MasterSoft */}
                <div className="mb-8 ">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div className="mb-2 sm:mb-0">
                            <p className="text-lg font-serif font-semibold position-text">Summer Intern</p>
                            <p className="text-base text-ink font-medium">
                                <Link href="https://www.mastersoft.ai/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 ">
                                    <code>MasterSoft ERP Solutions</code>
                                    <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                                </Link>
                            </p>
                        </div>
                        <div className="text-left sm:text-right text-sm text-ink">
                            <p>May 2017 — July 2017, Nagpur</p>
                        </div>
                    </div>
                    <p className="text-sm text-ink">Designed and developed a python toolkit for rapid deployment of infographics in company&apos;s E.R.P. Solutions. Toolkit was made in <span className="font-bold">python3</span>, used several external libraries like, <span className="font-bold">ggplot2, pandas, numpy</span> etc.</p>
                </div>
            </div>

            {/* Projects */}
            <div id="projects" className="mb-8">
                <h2 className="text-xl font-serif font-bold text-ink mb-4 border-b border-gray-300">Projects apart from work</h2>

                {/* Project Artha */}
                <div className="mb-6 ">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div className="mb-2 sm:mb-0">
                            <p className="text-lg font-serif font-semibold position-text">Project अर्थ (Artha)</p>
                            <p className="text-base text-ink font-medium">
                                <Link href="https://artha-pearl.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 ">
                                    <code>website</code>
                                    <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                                </Link>
                            </p>
                        </div>
                        <div className="text-left sm:text-right text-sm text-ink">
                            <p>Started July 2025 <span className="font-bold">[Ongoing]</span></p>
                        </div>
                    </div>
                    <p className="text-sm text-ink mb-2">Building world&apos;s largest digital enclyclopaedia for ancient Indian literature.</p>
                    <p className="text-sm text-ink mb-2">This is my personal project I have worked on for a while. I developed the backend and vibe-coded the
                        frontend. Spend time reading, curating and digitising books, editing and compiling the digital Encyclopaedia. First time in 10 years
                        I&apos;m making software just for me.
                        <Link href="https://github.com/yashbonde/artha" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-ink hover:text-ink transition-colors">
                            <span className="font-semibold ml-1">GitHub</span>
                            <ArrowUpRight className="w-5 h-5" />
                        </Link>
                    </p>
                </div>

                {/* KS2 Labs */}
                <div className="mb-8 ">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div className="mb-2 sm:mb-0">
                            <p className="text-lg font-serif font-semibold position-text">AI Researcher</p>
                            <p className="text-base text-ink font-medium"><code>KS2 Labs</code></p>
                        </div>
                        <div className="text-left sm:text-right text-sm text-ink">
                            <p>Nov. 2020 — Aug. 2021, Remote, India</p>
                        </div>
                    </div>
                    <p className="text-sm text-ink mb-2">I spent a lot of time in-between jobs working on AI application research.</p>
                    <div className="ml-4 mb-3">
                        <ul className="text-sm text-ink space-y-1">
                            <li>• Research on RL agents that do not need the perfect board state to play superhuman chess. This would demonstrate that NNs have internal representation capacity to solve complicated problems giving only traces of information.
                                <Link href="https://www.youtube.com/watch?v=Xd0psila1Ug" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-ink hover:text-ink transition-colors">
                                    <span className="font-semibold ml-1">YouTube</span>
                                    <ArrowUpRight className="w-5 h-5" />
                                </Link></li>
                            <li>• New research directions for weather modelling that uses ground based sensor data instead of solely relying on weather satellites, which causes issues like cold-bias and wrong temperature prediction.
                                <Link href="https://github.com/yashbonde/vaayuvidha" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-ink hover:text-ink transition-colors">
                                    <span className="font-semibold ml-1">GitHub</span>
                                    <ArrowUpRight className="w-5 h-5" />
                                </Link></li>
                        </ul>
                    </div>
                </div>


                <div className="text-xl font-serif font-bold text-ink mb-2 border-b border-gray-300 pb-2">Open Source Software</div>

                {/* TuneAPI */}
                <div className="mb-4 ">
                    <Link href="https://github.com/yashbonde/tuneapi/tree/main" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 ">
                        <code className="text-lg font-semibold text-ink">tuneapi</code>
                        <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                    </Link>
                    <p className="text-sm text-ink">A swiss knife python package for building application with LLMs. Very opinionated. Available in Python and Typescript</p>
                </div>

                {/* Vriksham */}
                <div className="mb-4 ">
                    <Link href="https://github.com/yashbonde/vriksham" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 ">
                        <code className="text-lg font-semibold text-ink">vriksham</code>
                        <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                    </Link>
                    <p className="text-sm text-ink">Tree based conversation storage engine interface and Cypher implementation in go.</p>
                </div>

                {/* Astea */}
                <div className="mb-4 ">
                    <Link href="https://github.com/yashbonde/astea" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 ">
                        <code className="text-lg font-semibold text-ink">astea</code>
                        <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                    </Link>
                    <p className="text-sm text-ink">Simple pure-python AST engine with lazy lookup and code traversal</p>
                </div>

                {/* ChainFury */}
                <div className="mb-4 ">
                    <Link href="https://github.com/NimbleBoxAI/ChainFury" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 ">
                        <code className="text-lg font-semibold text-ink">ChainFury</code>
                        <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                    </Link>
                    <p className="text-sm text-ink">🦋 Production grade chaining engine behind TuneChat. Self host today!</p>
                </div>

                {/* nbox */}
                <div className="mb-4 ">
                    <Link href="https://github.com/NimbleBoxAI/nbox" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 ">
                        <code className="text-lg font-semibold text-ink">nbox</code>
                        <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                    </Link>
                    <p className="text-sm text-ink">The official python package for NimbleBox. Exposes all APIs as CLIs and contains modules to make ML 🌸</p>
                </div>

                {/* yQL */}
                <div className="mb-4 ">
                    <Link href="https://github.com/yashbonde/yQL" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 ">
                        <code className="text-lg font-semibold text-ink">yQL</code>
                        <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                    </Link>
                    <p className="text-sm text-ink">protobuf powered RPC but REST instead sockets, creates client & server stubs. Used in production at NimbleBox.</p>
                </div>

                {/* general-perceivers */}
                <div className="mb-4 ">
                    <Link href="https://github.com/yashbonde/general-perceivers" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 ">
                        <code className="text-lg font-semibold text-ink">general-perceivers</code>
                        <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                    </Link>
                    <p className="text-sm text-ink">gperc or How to general purpose perceivers! Train models by just throwing data at it. gperc simplifies using PerceiverIO an architecture by DeepMind</p>
                </div>

                {/* chess_lm */}
                <div className="mb-4 ">
                    <Link href="https://github.com/yashbonde/chess_lm" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 ">
                        <code className="text-lg font-semibold text-ink">chess_lm</code>
                        <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                    </Link>
                    <p className="text-sm text-ink">Supervised Pre-training a chess engine on moves only, can it surpass me? Can it learn board representation internally? Can this learned vector be used with tree search?</p>
                </div>

                {/* dall-e-baby */}
                <div className="mb-4 ">
                    <Link href="https://github.com/yashbonde/dall-e-baby" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 ">
                        <code className="text-lg font-semibold text-ink">dall-e-baby</code>
                        <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                    </Link>
                    <p className="text-sm text-ink">OpenAI&apos;s dall-e is a kick ass model that takes in a natural language prompt and generates an images based on that. Now I cannot recreate the complete Dall-E so I make the baby version of it trained in CIFAR10-100 dataset. If Dall-E is picasso this is well ... baby.</p>
                </div>

                {/* spyql */}
                <div className="mb-4 ">
                    <Link href="https://github.com/yashbonde/spyql" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 ">
                        <code className="text-lg font-semibold text-ink">spyql</code>
                        <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                    </Link>
                    <p className="text-sm text-ink">Query data on the command line with SQL-like SELECTs powered by Python expressions</p>
                </div>

                {/* vaayuvidha */}
                <div className="mb-4 ">
                    <Link href="https://github.com/yashbonde/vaayuvidha" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 ">
                        <code className="text-lg font-semibold text-ink">vaayuvidha</code>
                        <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                    </Link>
                    <p className="text-sm text-ink">Code to run a novel recurrent-GNN model for weather prediction.</p>
                </div>

                {/* Freeciv */}
                <div className="mb-4 ">
                    <Link href="https://github.com/yashbonde/freeciv-python" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 ">
                        <code className="text-lg font-semibold text-ink">freeciv-python</code>
                        <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                    </Link>
                    <p className="text-sm text-ink">Python agent to play Freeciv game.</p>
                </div>
            </div>

            {/* Education */}
            <div id="education">
                <h2 className="text-xl font-serif font-bold text-ink mb-4 border-b border-gray-300">Education</h2>

                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div className="mb-2 sm:mb-0">
                            <p className="text-lg font-serif font-semibold position-text">B. Tech. in Electronics and Telecommunication</p>
                            <p className="text-base text-ink font-medium"><code>National Institute of Technology Raipur</code></p>
                        </div>
                        <div className="text-left sm:text-right text-sm text-ink">
                            <p>May 2015 — May 2019, Raipur</p>
                        </div>
                    </div>
                    <p className="text-sm text-ink">Activities and societies: Training and Placement Cell NIT Raipur. Entrepreneurship Cell of NIT Raipur. Photography Club of the NIT Raipur. Manager at the Entrepreneurship Cell (E-Cell) of the NIT Raipur.</p>
                    <p className="text-sm text-ink">Was part of a team that organised <span className="font-bold">E-Summit 2016, 2017 and 2018</span> Central India&apos;s largest Entrepreneurship Event. Responsible for the conduction of the Wall Street Event in the Annual Techno-Management Fest of the College (<span className="font-bold">Aavartan 2016</span>).</p>
                </div>
            </div>
        </section>
    );
}


