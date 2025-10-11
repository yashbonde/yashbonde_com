import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function AboutPage() {
    return (
        <section className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-3xl font-serif font-bold text-ink mb-2">Yash Bonde</h1>
                <p className="text-base text-ink">AI Engineer, Product Consultant</p>
                <p className="text-sm text-ink">Bangalore, India | San Francisco, CA</p>
            </div>

            {/* Work Experience */}
            <div className="mb-8">

                {/* Ema Unlimited */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div className="mb-2 sm:mb-0">
                            <p className="text-lg font-serif font-semibold text-ink">Software Engineer</p>
                            <p className="text-base text-ink font-medium">
                                <Link href="http://ema.co" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:scale-105">
                                    <code>Ema Unlimited (Acquihired)</code>
                                    <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                                </Link>
                            </p>
                        </div>
                        <div className="text-left sm:text-right text-sm text-ink">
                            <p>March 2025 - <span className="font-bold">[Present]</span>, Bangalore</p>
                        </div>
                    </div>
                    <ul className="text-sm text-ink space-y-1 mb-2">
                        <li>• Leading post sales implementation for several F50 clients</li>
                        <li>• Built internal tooling to speed up AI debugging. Reduced effort by multiple hours/week/engineer</li>
                        <li>• Led building AI for post sales team to automate project management</li>
                    </ul>
                </div>

                {/* Project Artha */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div className="mb-2 sm:mb-0">
                            <p className="text-lg font-serif font-semibold text-ink">Encyclopaedist & Developer (Personal Project)</p>
                            <p className="text-base text-ink font-medium devanagari">
                                <Link href="https://artha-pearl.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:scale-105">
                                    <code>Project अर्थ (Artha)</code>
                                    <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                                </Link>
                            </p>
                        </div>
                        <div className="text-left sm:text-right text-sm text-ink">
                            <p>July 2025 - <span className="font-bold">[Present]</span></p>
                        </div>
                    </div>
                    <p className="text-sm text-ink mb-2">Building world&apos;s largest digital enclyclopaedia for ancient Indian literature.</p>
                    <p className="text-sm text-ink mb-2">This is my personal project I have worked on for a while. I developed the backend and vibe-coded the frontend. Spend time reading, curating and digitising books, editing and compiling the digital Encyclopaedia. First time in 10 years I&apos;m making software just for me.</p>
                </div>

                {/* Tune AI */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div className="mb-2 sm:mb-0">
                            <p className="text-lg font-serif font-semibold text-ink">Head of Research</p>
                            <p className="text-base text-ink font-medium">
                                <Link href="https://github.com/NimbleBoxAI" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:scale-105">
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
                    <p className="text-sm text-ink mb-3">Backed by Accel, Together Fund, Techstars, Venture Catalysts, Cornerstone Venture Partners, Chennai Angels, and Astarc Ventures</p>
                    <p className="text-sm text-ink mb-3">At Tune I have seen every part of the startup journey from ideation to discovering PMF to failing in monetization to eventually landing contracts with some of the best organisations in their market. Worked directly with the Middle East&apos;s largest entertainment company (organizer of Abu Dhabi F1) and one of the world&apos;s largest content management companies. My responsibilities included:</p>

                    <div className="ml-4 mb-3">
                        <p className="text-sm font-semibold text-ink mb-2">Enterprise Solutions to deliver multiple projects end to end:</p>
                        <ul className="text-sm text-ink space-y-1">
                            <li>• Led two teams totaling <span className="font-bold">8 people</span> parallelly</li>
                            <li>• Developed AI Agents for reducing turnaround time for a business from <span className="font-bold">7-14 days</span> to <span className="font-bold">5 minutes</span> flat</li>
                            <li>• Large scale data processing that could process <span className="font-bold">100K+ documents</span> / day</li>
                            <li>• Context engineering systems to ensure <span className="font-bold">100% grounded</span> AI results</li>
                            <li>• These projects eventually became largest revenue centers for Tune AI</li>
                            <li>• Helped sales teams from discovery calls to finally delivering the project</li>
                        </ul>
                    </div>

                    <div className="ml-4 mb-3">
                        <p className="text-sm font-semibold text-ink mb-2">Product developement for features in Tune and NimbleBox:</p>
                        <ul className="text-sm text-ink space-y-1">
                            <li>• Armoury: RAG system backend written completely in go</li>
                            <li>• ChainFury: Backend tool for chain of thought prompting</li>
                            <li>• Tune Blob: Client facing agent and configurable assistant in Studio</li>
                            <li>• LMAO: General purpose logging and rule based alerting system</li>
                            <li>• Lot of eventually forgotten code</li>
                        </ul>
                    </div>

                    <div className="ml-4 mb-3">
                        <p className="text-sm font-semibold text-ink mb-2">Key Achievements:</p>
                        <ul className="text-sm text-ink space-y-1">
                            <li>• Successfully delivered multiple enterprise projects from ideation to production</li>
                            <li>• Pioneered the implementation of Chain of Thought (CoT) prompting in a production environment at chat.tune.app</li>
                            <li>• Among the first companies to deploy Llama 2 🦙 in production within <span className="font-bold">24 hours</span> of its release</li>
                            <li>• Deployed Llama 3 🦙 in production within <span className="font-bold">1 hour</span> of its release</li>
                        </ul>
                    </div>

                    <div className="ml-4 mb-3">
                        <p className="text-sm font-semibold text-ink mb-2">Things I&apos;ll remember:</p>
                        <ul className="text-sm text-ink space-y-1">
                            <li>• Built an <code>nbox.Operator</code> python tool kit that could be used to deploy code as batch job or serve on CPU/GPU.</li>
                            <li>• Engineered a logging and alerting system built on clickhouse that could log arbitrary values and create alerts on them.</li>
                            <li>• Did several events for Tune AI helping build the Bangalore ML / AI community.</li>
                        </ul>
                    </div>

                    <p className="text-sm text-ink mb-2">Other than the points mentioned above, in the startup, I&apos;ve helped with sales, design, branding, customer success, etc.</p>
                </div>

                {/* Hack MIT */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div className="mb-2 sm:mb-0">
                            <p className="text-lg font-serif font-semibold text-ink">Mentor & Judge</p>
                            <p className="text-base text-ink font-medium">
                                <Link href="https://hackmit.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:scale-105">
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
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div className="mb-2 sm:mb-0">
                            <p className="text-lg font-serif font-semibold text-ink">Mentor & Judge</p>
                            <p className="text-base text-ink font-medium">
                                <Link href="https://pennapps.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:scale-105">
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

                {/* KS2 Labs */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div className="mb-2 sm:mb-0">
                            <p className="text-lg font-serif font-semibold text-ink">AI Researcher and Consultant (Self Employed)</p>
                            <p className="text-base text-ink font-medium"><code>KS2 Labs</code></p>
                        </div>
                        <div className="text-left sm:text-right text-sm text-ink">
                            <p>Nov. 2020 — Aug. 2021, Remote, India</p>
                        </div>
                    </div>
                    <p className="text-sm text-ink mb-2">Novel research & development focusing on simplifying requirements for AI</p>
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

                {/* NPAW */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div className="mb-2 sm:mb-0">
                            <p className="text-lg font-serif font-semibold text-ink">Software Consultant</p>
                            <p className="text-base text-ink font-medium"><code>NPAW, Spain</code></p>
                        </div>
                        <div className="text-left sm:text-right text-sm text-ink">
                            <p>Dec. 2020 — March 2021, Remote, India</p>
                        </div>
                    </div>
                    <p className="text-sm text-ink">GenAI with GPT-2. R&D for latest in chatbot technology to ease up sifting through extremely large datapoints. Advanced voice based Business Intelligence toolkit, control and ask using voice only!</p>
                </div>

                {/* Shipmnts */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div className="mb-2 sm:mb-0">
                            <p className="text-lg font-serif font-semibold text-ink">ML Engineer</p>
                            <p className="text-base text-ink font-medium">
                                <Link href="https://shipmnts.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:scale-105">
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
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div className="mb-2 sm:mb-0">
                            <p className="text-lg font-serif font-semibold text-ink">Summer Intern</p>
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
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div className="mb-2 sm:mb-0">
                            <p className="text-lg font-serif font-semibold text-ink">Machine Learning Intern</p>
                            <p className="text-base text-ink font-medium">
                                <Link href="https://connecticus.in/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:scale-105">
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
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div className="mb-2 sm:mb-0">
                            <p className="text-lg font-serif font-semibold text-ink">Summer Intern</p>
                            <p className="text-base text-ink font-medium">
                                <Link href="https://www.mastersoft.ai/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:scale-105">
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
            <div>
                <h2 className="text-xl font-serif font-bold text-ink mb-6 border-b border-gray-300 pb-2">Projects</h2>

                {/* Artha */}
                <div className="mb-6">
                    <div className="mb-2">
                        <Link href="https://github.com/yashbonde/artha" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:scale-105">
                            <code className="text-lg font-semibold text-ink">artha</code>
                            <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                        </Link>
                    </div>
                    <p className="text-sm text-ink">Building world&apos;s largest digital museum of ancient Indian texts.</p>
                </div>

                {/* Vriksham */}
                <div className="mb-6">
                    <div className="mb-2">
                        <Link href="https://github.com/yashbonde/vriksham" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:scale-105">
                            <code className="text-lg font-semibold text-ink">vriksham</code>
                            <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                        </Link>
                    </div>
                    <p className="text-sm text-ink">Tree based conversation storage engine interface and Cypher implementation in go.</p>
                </div>

                {/* TuneAPI */}
                <div className="mb-6">
                    <div className="mb-2">
                        <Link href="https://github.com/yashbonde/tuneapi/tree/main" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:scale-105">
                            <code className="text-lg font-semibold text-ink">tuneapi</code>
                            <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                        </Link>
                    </div>
                    <p className="text-sm text-ink">A swiss knife python package for building application with LLMs. Very opinionated. Available in Python and Typescript</p>
                </div>

                {/* Astea */}
                <div className="mb-6">
                    <div className="mb-2">
                        <Link href="https://github.com/yashbonde/astea" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:scale-105">
                            <code className="text-lg font-semibold text-ink">astea</code>
                            <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                        </Link>
                    </div>
                    <p className="text-sm text-ink">Simple pure-python AST engine with lazy lookup and code traversal</p>
                </div>

                {/* ChainFury */}
                <div className="mb-6">
                    <div className="mb-2">
                        <Link href="https://github.com/NimbleBoxAI/ChainFury" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:scale-105">
                            <code className="text-lg font-semibold text-ink">ChainFury</code>
                            <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                        </Link>
                    </div>
                    <p className="text-sm text-ink">🦋 Production grade chaining engine behind TuneChat. Self host today!</p>
                </div>

                {/* nbox */}
                <div className="mb-6">
                    <div className="mb-2">
                        <Link href="https://github.com/NimbleBoxAI/nbox" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:scale-105">
                            <code className="text-lg font-semibold text-ink">nbox</code>
                            <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                        </Link>
                    </div>
                    <p className="text-sm text-ink">The official python package for NimbleBox. Exposes all APIs as CLIs and contains modules to make ML 🌸</p>
                </div>

                {/* yQL */}
                <div className="mb-6">
                    <div className="mb-2">
                        <Link href="https://github.com/yashbonde/yQL" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:scale-105">
                            <code className="text-lg font-semibold text-ink">yQL</code>
                            <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                        </Link>
                    </div>
                    <p className="text-sm text-ink">protobuf powered RPC but REST instead sockets, creates client & server stubs. Used in production at NimbleBox.</p>
                </div>

                {/* general-perceivers */}
                <div className="mb-6">
                    <div className="mb-2">
                        <Link href="https://github.com/yashbonde/general-perceivers" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:scale-105">
                            <code className="text-lg font-semibold text-ink">general-perceivers</code>
                            <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                        </Link>
                    </div>
                    <p className="text-sm text-ink">gperc or How to general purpose perceivers! Train models by just throwing data at it. gperc simplifies using PerceiverIO an architecture by DeepMind</p>
                </div>

                {/* chess_lm */}
                <div className="mb-6">
                    <div className="mb-2">
                        <Link href="https://github.com/yashbonde/chess_lm" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:scale-105">
                            <code className="text-lg font-semibold text-ink">chess_lm</code>
                            <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                        </Link>
                    </div>
                    <p className="text-sm text-ink">Supervised Pre-training a chess engine on moves only, can it surpass me? Can it learn board representation internally? Can this learned vector be used with tree search?</p>
                </div>

                {/* dall-e-baby */}
                <div className="mb-6">
                    <div className="mb-2">
                        <Link href="https://github.com/yashbonde/dall-e-baby" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:scale-105">
                            <code className="text-lg font-semibold text-ink">dall-e-baby</code>
                            <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                        </Link>
                    </div>
                    <p className="text-sm text-ink">OpenAI&apos;s dall-e is a kick ass model that takes in a natural language prompt and generates an images based on that. Now I cannot recreate the complete Dall-E so I make the baby version of it trained in CIFAR10-100 dataset. If Dall-E is picasso this is well ... baby.</p>
                </div>

                {/* spyql */}
                <div className="mb-6">
                    <div className="mb-2">
                        <Link href="https://github.com/yashbonde/spyql" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:scale-105">
                            <code className="text-lg font-semibold text-ink">spyql</code>
                            <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                        </Link>
                    </div>
                    <p className="text-sm text-ink">Query data on the command line with SQL-like SELECTs powered by Python expressions</p>
                </div>

                {/* vaayuvidha */}
                <div className="mb-6">
                    <div className="mb-2">
                        <Link href="https://github.com/yashbonde/vaayuvidha" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:scale-105">
                            <code className="text-lg font-semibold text-ink">vaayuvidha</code>
                            <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                        </Link>
                    </div>
                    <p className="text-sm text-ink">Code to run a novel recurrent-GNN model for weather prediction.</p>
                </div>

                {/* Freeciv */}
                <div className="mb-6">
                    <div className="mb-2">
                        <Link href="https://github.com/yashbonde/freeciv-python" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:scale-105">
                            <code className="text-lg font-semibold text-ink">freeciv-python</code>
                            <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                        </Link>
                    </div>
                    <p className="text-sm text-ink">Python agent to play Freeciv game.</p>
                </div>
            </div>

            {/* Education */}
            <div>
                <h2 className="text-xl font-serif font-bold text-ink mb-6 border-b border-gray-300 pb-2">Education</h2>

                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div className="mb-2 sm:mb-0">
                            <p className="text-lg font-serif font-semibold text-ink">B. Tech. in Electronics and Telecommunication</p>
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


