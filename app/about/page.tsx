import Link from "next/link";
import { ArrowDown } from "lucide-react";
import ClickableImage from "@/components/ClickableImage";

export default function AboutPage() {
    return (
        <section className="max-w-3xl mx-auto">
            {/* Mobile Layout: Image full width, text below */}
            <div className="flex flex-col sm:hidden mb-10">
                <div className="mb-6 w-full">
                    <ClickableImage />
                </div>
                <div className="flex-1">
                    <div className="text-3xl font-serif font-bold text-ink mb-2">Yash Bonde</div>
                    <div className="text-base text-ink mb-4">My work experience as builder of AI products that drive
                        real business value. AI researcher in neural networks, agentic systems, product development, building startups.
                    </div>
                    <div className="text-link mb-1">
                        <Link href="https://artha-pearl.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 ">
                            Project अर्थ (Artha)
                        </Link>
                    </div>
                    <div className="text-link mb-1">
                        <Link href="#work-experience" className="inline-flex items-center gap-2 ">
                            Experience
                            <ArrowDown className="w-4 h-4 font-bold text-link" />
                        </Link>
                    </div>
                    <div className="text-link mb-4">
                        <Link href="#projects" className="inline-flex items-center gap-2 ">
                            Projects
                            <ArrowDown className="w-4 h-4 font-bold text-link" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Desktop Layout: Image and text side by side */}
            <div className="hidden sm:flex sm:flex-row items-start sm:items-end gap-8 mb-10">
                {/* Image on the left */}
                <div className="flex-shrink-0 w-full sm:w-auto">
                    <ClickableImage />
                </div>

                {/* Text content on the right */}
                <div className="flex-1">
                    <div className="text-3xl font-serif font-bold text-ink mb-2">Yash Bonde</div>
                    <div className="text-base text-ink mb-4">7+ years of work experience as builder of AI products that drive
                        real business value. Deployed and scaled agentic systems, led product development, and built startups.<br /><br />
                        Currently focusing on AI research in neural networks and automata theory.
                        Building <Link href="https://artha-pearl.vercel.app" target="_blank" rel="noopener noreferrer">Project अर्थ (Artha)</Link>.
                    </div>
                    <div>

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
                                </Link>
                            </p>
                        </div>
                        <div className="text-left sm:text-right text-ink">
                            <p>March - Dec. 2025, Bangalore</p>
                        </div>
                    </div>
                    <p className="text-ink mb-3">Tune AI was acquihired by Ema Unlimited in March, 2025.</p>
                    <ul className="text-ink space-y-1 mb-2">
                        <li className="flex gap-2 text-justify">
                            <span>•</span>
                            <span>Leading post sales implementation for several F50 clients. End to end lifecycle from discovery to delivery.</span>
                        </li>
                        <li className="flex gap-2 text-justify">
                            <span>•</span>
                            <span>Built 2+ internal tools. Reduced effort by multiple hours/week/employee.</span>
                        </li>
                    </ul>
                    <p className="text-ink mb-3">After moving to Post Sales team, I realised the challenges of project management.
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
                                </Link>
                            </p>
                        </div>
                        <div className="text-left sm:text-right text-ink">
                            <p>Dec. 2020 — Feb. 2025, Chennai, Bangalore & San Francisco</p>
                        </div>
                    </div>
                    <p className="text-ink mb-3">GenAI for Enterprises</p>
                    <p className="text-ink mb-3">At Tune I have seen every part of the startup journey from ideation to discovering PMF to failing
                        in monetization to eventually landing contracts with some of the best organisations in their market.
                        Led AI solutioning working directly with Abu Dhabi F1 organizer (Ethara), world’s largest scientific contents product
                        (Clarivate), and Intel. Projects became <span className="font-bold">biggest revenue drivers</span> for Tune AI.
                        Backed by: Accel, Together Fund, Techstars, Venture Catalysts, Cornerstone Venture Partners, Chennai Angels, and Astarc Ventures.</p>

                    <p className="font-semibold text-ink mb-2">Key Achievements</p>
                    <div className="ml-4 mb-3">
                        <ul className="text-ink space-y-1">
                            <li className="flex gap-2 text-justify">
                                <span>•</span>
                                <span>Successfully delivered multiple enterprise projects from ideation to production combined revenue of <span className="font-bold">$140K+</span></span>
                            </li>
                            <li className="flex gap-2 text-justify">
                                <span>•</span>
                                <span>Developed AI Agents reducing sales TAT from <span className="font-bold">14 days → 5 minutes</span> by auto generating <span className="font-bold">200+ slide long PPT</span> presentation and is highly personalized for each prospect and potential event, following the design guidelines. Works from inside <span className="font-bold">MS Teams</span> to answer any question via chat interface.</span>
                            </li>
                            <li className="flex gap-2 text-justify">
                                <span>•</span>
                                <span><span className="font-bold">500K+ users</span> on Tune Chat and <span className="font-bold">finetuned 100+</span> models on Tune Studio</span>
                            </li>
                            <li className="flex gap-2 text-justify">
                                <span>•</span>
                                <span>Mentor & Judge - Hack MIT 2024 & PennApps XXV in September 2024. In person at MIT, Cambridge & University of Pennsylvania, Pennsylvania.</span>
                            </li>
                            <li className="flex gap-2 text-justify">
                                <span>•</span>
                                <span>Architected large data processing pipeline to run inference on <span className="font-bold">100K+ documents/day</span> for extraction task with <span className="font-bold">96% accuracy</span>.</span>
                            </li>
                            <li className="flex gap-2 text-justify">
                                <span>•</span>
                                <span>With <span className="font-bold">Intel</span> we delivered a <Link href="https://drive.google.com/file/d/1DCCDl1qzhsJ2TfSZP_T6EcAJUeptRxK7/view?usp=sharing" target="_blank" rel="noopener noreferrer">whitepaper on OpenVino</Link>, delivering <span className="font-bold">20x faster Mask-RCNN</span></span>
                            </li>
                        </ul>
                    </div>

                    <p className="font-semibold text-ink mb-2">Product developement for features in Tune and NimbleBox:</p>
                    <div className="ml-4 mb-3">
                        <ul className="text-ink space-y-1">
                            <li className="flex gap-2 text-justify">
                                <span>•</span>
                                <span><span className="font-semibold">Blob</span> : Client facing agent and configurable assistant in Studio. Full framework for building agents and interface over API.</span>
                            </li>
                            <li className="flex gap-2 text-justify">
                                <span>•</span>
                                <span><span className="font-semibold">ChainFury</span> : Tool for chain of thought prompting. Implemented end to end with UI and backend.</span>
                            </li>
                            <li className="flex gap-2 text-justify">
                                <span>•</span>
                                <span><span className="font-semibold">Saturn + Silk</span> : Distributed code execution and storage engine that could run any DAG workflow of arbitrary python functions. Ensured retries and rollbacks on errors. A layer on jupyterkernelgateway that could be connected with K8S to run code as a service. This was our take on AWS lambda.</span>
                            </li>
                            <li className="flex gap-2 text-justify">
                                <span>•</span>
                                <span><span className="font-semibold">LMAO</span> : General purpose logging and rule based alerting system with UI rule builder.</span>
                            </li>
                            <li className="flex gap-2 text-justify">
                                <span>•</span>
                                <span>Lot of eventually forgotten code</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* NPAW */}
                <div className="mb-8 ">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div className="mb-2 sm:mb-0">
                            <p className="text-lg font-serif font-semibold position-text">AI Consultant</p>
                            <p className="text-base text-ink font-medium"><code>NPAW, Spain</code></p>
                        </div>
                        <div className="text-left sm:text-right text-ink">
                            <p>Dec. 2020 — March 2021, Remote</p>
                        </div>
                    </div>
                    <p className="text-ink">Research and develop a Grafana plugin agent that converts user input in natural langauge to charts. The novel solution used a decision tree to parse the query parameters based on prompting. Deployed <span className="font-bold">model sharded GPT-2 1Bn</span> on <span className="font-bold">2 Nvidia-3090 GPUs</span> to maximise the context length for each input query.</p>
                </div>

                {/* Shipmnts */}
                <div className="mb-8 ">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div className="mb-2 sm:mb-0">
                            <p className="text-lg font-serif font-semibold position-text">ML Engineer</p>
                            <p className="text-base text-ink font-medium">
                                <Link href="https://shipmnts.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 ">
                                    <code>Shipmnts</code>
                                </Link>
                            </p>
                        </div>
                        <div className="text-left sm:text-right text-ink">
                            <p>July 2019 — Nov. 2020, Ahmedabad</p>
                        </div>
                    </div>
                    <ul className="text-ink space-y-1">
                        <li className="flex gap-2 text-justify">
                            <span>•</span>
                            <span>Built ML solution to convert unstructured business data like documents (scanned, digitised) to structured knowledge using supervised and unsupervised machine learning algorithms</span>
                        </li>
                        <li className="flex gap-2 text-justify">
                            <span>•</span>
                            <span>Built services on top of this extracted data like rules management, abnormality detection along with a full learning system</span>
                        </li>
                        <li className="flex gap-2 text-justify">
                            <span>•</span>
                            <span>Worked with planets largest supply chain companies (<span className="font-bold">Maersk & CMA-CGM</span>) to deliver PoCs, clients based in Europe, <span className="font-bold">APAC and LATAM</span> regions</span>
                        </li>
                        <li className="flex gap-2 text-justify">
                            <span>•</span>
                            <span>Involved in product design, development and UATs</span>
                        </li>
                    </ul>
                </div>

                {/* Internships Section */}
                <div className="mb-8">
                    <span className="text-lg font-serif font-bold mb-6">Internships</span>

                    <div className="space-y-8">
                        {/* Kaaenaat */}
                        <ul className="text-ink space-y-2 mb-2">
                            <li className="flex gap-2 text-justify">
                                <span>•</span>
                                <span>(Kaaenaat, Bangalore, April 2018 — Oct. 2018) Upgraded <strong>Kount</strong> via live traffic analysis (Dynamic Trajectory Clustering and Anomaly Detection) on <strong>embedded devices</strong> for edge applications; developed an in-house application for high-speed Image Segmentation.</span>
                            </li>
                        </ul>
                        {/* Connecticus */}
                        <ul className="text-ink space-y-2 mb-2">
                            <li className="flex gap-2 text-justify">
                                <span>•</span>
                                <span>(<Link href="https://connecticus.in/" target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">
                                    Connecticus
                                </Link>, Pune, May 2017 — July 2017) Built an ML-based FAQ module for <strong>NESSA</strong> using <Link href="https://arxiv.org/pdf/1503.08895" target="_blank" rel="noopener noreferrer">End-to-End Memory Networks</Link> and NLP tasks including POS tagging, stemming, and lemmatisation.</span>
                            </li>
                        </ul>

                        {/* MasterSoft */}
                        <ul className="text-ink space-y-2 mb-2">
                            <li className="flex gap-2 text-justify">
                                <span>•</span>
                                <span>(<Link href="https://www.mastersoft.ai/" target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">
                                    MasterSoft ERP
                                </Link>, Nagpur, May 2016 — July 2016) Designed a <strong>Python 3</strong> toolkit for rapid infographic deployment within ERP solutions, utilizing pandas, numpy, and ggplot2.</span>
                            </li>
                        </ul>

                    </div>
                </div>

                {/* Project Artha */}
                <div className="mb-8 ">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div className="mb-2 sm:mb-0">
                            <p className="text-lg font-serif font-semibold position-text">
                                Developer, {" "}
                                <Link href="https://artha-pearl.vercel.app" target="_blank" rel="noopener noreferrer">
                                    Project अर्थ (Artha)
                                </Link>
                            </p>
                        </div>
                    </div>
                    <p className="text-ink mb-2">Building world&apos;s largest digital enclyclopaedia for ancient Indian literature. Spend time reading, curating and digitising books, editing and
                        compiling the digital Encyclopaedia. Indexed <strong>6,363+</strong> articles, <strong>3+</strong> books, <strong>103,211+</strong> shlokas with unique ids. Read <Link href="https://github.com/yashbonde/artha" target="_blank" rel="noopener noreferrer" className="text-ink hover:text-ink transition-colors">
                            <span className="font-semibold">code</span>
                        </Link> and contribute.
                    </p>
                </div>

                {/* KS2 Labs */}
                <div className="mb-8 ">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div className="mb-2 sm:mb-0">
                            <p className="text-lg font-serif font-semibold position-text">AI Researcher</p>
                        </div>
                    </div>
                    <p className="text-ink mb-2">I spent a lot of time in-between jobs working on AI application research.</p>
                    <div className="ml-4 mb-3">
                        <ul className="text-ink space-y-1">
                            <li className="flex gap-2 text-justify">
                                <span>•</span>
                                <span>Research on RL agents that do not need the perfect board state to play superhuman chess. This would demonstrate that NNs have internal representation capacity to solve complicated problems giving only traces of information.
                                    <Link href="https://www.youtube.com/watch?v=Xd0psila1Ug" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-ink hover:text-ink transition-colors">
                                        <span className="font-semibold ml-1">YouTube</span>
                                    </Link></span>
                            </li>
                            <li className="flex gap-2 text-justify">
                                <span>•</span>
                                <span>New research directions for weather modelling that uses ground based sensor data instead of solely relying on weather satellites, which causes issues like cold-bias and wrong temperature prediction.
                                    <Link href="https://github.com/yashbonde/vaayuvidha" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-ink hover:text-ink transition-colors">
                                        <span className="font-semibold ml-1">GitHub</span>
                                    </Link></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div id="projects" className="mb-8">
            </div>

            {/* Education */}
            <div id="education">
                <span className="text-2xl font-serif font-bold text-ink mb-8">Education</span>

                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div className="mb-2 sm:mb-0">
                            <p className="text-lg font-serif font-semibold position-text">B. Tech. in Electronics and Telecommunication</p>
                            <p className="text-base text-ink font-medium"><code>National Institute of Technology Raipur (NIT Raipur)</code></p>
                        </div>
                        <div className="text-left sm:text-right text-ink">
                            <p>May 2015 — May 2019, Raipur</p>
                        </div>
                    </div>
                    <p className="text-ink mb-1">Activities and societies: Training and Placement Cell NIT Raipur. Entrepreneurship Cell of NIT Raipur. Photography Club of the NIT Raipur. Manager at the Entrepreneurship Cell (E-Cell) of the NIT Raipur.</p>
                    <p className="text-ink mb-1">Was part of a team that organised <span className="font-bold">E-Summit 2016 - 2018</span> Central India&apos;s largest Entrepreneurship Event. Responsible for the conduction of the Wall Street Event in the Annual Techno-Management Fest of the College (<span className="font-bold">Aavartan 2016</span>).</p>
                    <p className="text-ink">Worked on building AI powered Indian sign language detector for Texas Instruments&apos; challenge. Implemented transformer network for speech to text for Microsoft&apos;s challenge (MSAIC).
                        <Link href="https://github.com/krsubham48/Babylon" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 ">
                            <span className="font-semibold ml-1">GitHub</span>
                        </Link></p>
                </div>
            </div>
        </section>
    );
}


