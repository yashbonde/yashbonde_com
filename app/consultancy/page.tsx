import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CheckCircle, Mail, ArrowDown } from "lucide-react";

export default function ConsultancyPage() {
    return (
        <section>
            {/* Mobile Layout: Image full width, text below */}
            <div className="flex flex-col sm:hidden mb-10">
                <div className="flex-shrink-0 w-full sm:w-auto">
                    <Image
                        src="https://ndotovhaihcfvwintgpc.supabase.co/storage/v1/object/public/yashbonde/photos/IMG_5717.jpeg"
                        alt="Yash Bonde"
                        width={400}
                        height={250}
                        className="rounded-lg object-cover max-w-full h-auto"
                    />
                </div>

                <div className="flex-1">
                    <div className="text-3xl font-serif font-bold text-ink mb-2">AI Consulting</div>
                    <div className="text-lg text-ink mb-4">
                        <span className="font-semibold">$140K+</span> in delivered projects •
                        <span className="font-semibold"> 500K+</span> users impacted •
                        <span className="font-semibold"> 96%</span> accuracy in production systems
                    </div>
                    <div className="text-base text-ink mb-4">
                        Transform your business with AI solutions that drive real value.
                        From enterprise AI strategy to production-ready implementations.
                    </div>
                    <div className="text-sm text-ink mb-4">
                        <Link href="/about" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 ">
                            View My Work
                            <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                        </Link>
                    </div>
                    <div className="text-sm text-ink mb-1">
                        <Link href="#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-paper rounded-lg font-medium hover:bg-gray-800 transition-colors">
                            Start Your Project
                            <ArrowDown className="w-4 h-4 font-bold text-paper" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Desktop Layout: Image and text side by side */}
            <div className="hidden sm:flex sm:flex-row items-start sm:items-end gap-8 mb-10">
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
                    <div className="text-3xl font-serif font-bold text-ink mb-2">AI Consulting</div>
                    <div className="text-lg text-ink mb-4">
                        <span className="font-semibold">$140K+</span> in delivered projects •
                        <span className="font-semibold"> 500K+</span> users impacted •
                        <span className="font-semibold"> 96%</span> accuracy in production systems
                    </div>
                    <div className="text-base text-ink mb-4">
                        Transform your business with AI solutions that drive real value.
                        From enterprise AI strategy to production-ready implementations.
                    </div>
                    <div className="text-sm text-ink mb-4">
                        <Link href="/about" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 ">
                            View My Work
                            <ArrowUpRight className="w-4 h-4 font-bold text-ink" />
                        </Link>
                    </div>
                    <div className="text-sm text-ink mb-1">
                        <Link href="#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-paper rounded-lg font-medium hover:bg-gray-800 transition-colors">
                            Start Your Project
                            <ArrowDown className="w-4 h-4 font-bold text-paper" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-serif font-bold text-ink mb-6">Services</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {/* AI Strategy & Development */}
                    <div className="border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-xl font-serif font-semibold text-ink">AI Strategy & Development</span>
                        </div>
                        <p className="text-sm text-ink mb-4">
                            Strategic AI roadmap development and full-cycle implementation from concept to production
                        </p>
                        <ul className="text-sm text-ink space-y-2">
                            <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                Assess AI readiness and quantify ROI
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                Tech stack recommendations
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                LLM fine-tuning and optimization
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                AI agent development
                            </li>
                        </ul>
                    </div>

                    {/* Enterprise Integration & Support */}
                    <div className="border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-xl font-serif font-semibold text-ink">Enterprise Integration & Training</span>
                        </div>
                        <p className="text-sm text-ink mb-4">
                            Seamless AI integration into your enterprise systems with comprehensive team enablement
                        </p>
                        <ul className="text-sm text-ink space-y-2">
                            <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                POC development & pilot program design
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                API development and integration
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                Data pipeline optimization
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                Technical team training & documentation
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Case Studies Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-serif font-bold text-ink mb-6">Delivered Projects</h2>
                <div className="space-y-8">
                    {/* Abu Dhabi F1 Project */}
                    <div className="border-l-4 border-orange-500">
                        <div className="mb-3">
                            <span className="text-lg font-serif font-semibold text-ink">AI-Powered Sales Automation</span>
                        </div>
                        <p className="text-sm text-ink mb-3">
                            Largest event organizer in the UAE
                        </p>
                        <p className="text-sm text-ink mb-3">
                            Developed AI agents that reduced sales TAT from <span className="font-bold">14 days to 5 minutes</span> by auto-generating
                            <span className="font-bold"> 200+ slide</span> presentations personalized for each prospect and event.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-mono">AI Agents</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-mono">MS Teams</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-mono">Sales</span>
                        </div>
                    </div>

                    {/* Clarivate Project */}
                    <div className="border-l-4 border-blue-500">
                        <div className="mb-3">
                            <span className="text-lg font-serif font-semibold text-ink">Large-Scale Document Processing</span>
                        </div>
                        <p className="text-sm text-ink mb-3">
                            World's largest scientific contents provider
                        </p>
                        <p className="text-sm text-ink mb-3">
                            Architected data processing pipeline running inference on <span className="font-bold">100K+ documents/day</span> for extraction
                            tasks with <span className="font-bold">96% accuracy</span>, becoming the biggest revenue driver for Tune AI.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-mono">Document Processing</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-mono">96% Accuracy</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-mono">100K+ Documents/Day</span>
                        </div>
                    </div>

                    {/* NPAW Text-SQL Project */}
                    <div className="border-l-4 border-green-500">
                        <div className="mb-3">
                            <span className="text-lg font-serif font-semibold text-ink">Natural Language to SQL Query Engine</span>
                        </div>
                        <p className="text-sm text-ink mb-3">
                            European analytics company
                        </p>
                        <p className="text-sm text-ink mb-3">
                            Developed a Grafana plugin agent that converts user input in natural language to charts.
                            The solution used a decision tree to parse query parameters based on prompting, deployed
                            model sharded <span className="font-bold">GPT-2 (1Bn)</span> on <span className="font-bold">two Nvidia-3090 GPUs</span> to maximize context length.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-mono">Text-to-SQL</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-mono">Grafana Plugin</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div id="contact" className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="max-w-2xl">
                    <div className="text-2xl font-serif font-semibold text-ink mb-4">
                        Let's Talk
                    </div>
                    <p className="text-sm text-ink mb-6">
                        Discuss your project requirements and explore how AI can drive value for your organization.
                        I typically reply within 24 hours.
                    </p>

                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-paper rounded-lg font-medium hover:bg-gray-800 transition-colors">
                            <Mail className="w-5 h-5 text-paper" />
                            <Link
                                href="mailto:hello@yashbonde.com"
                                className="text-sm text-paper hover:transition-colors"
                            >
                                hello@yashbonde.com
                            </Link>
                        </div>
                    </div>
                </div>
            </div>


        </section >
    );
}
