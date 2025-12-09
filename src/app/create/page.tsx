"use client";

import { useState } from "react";
import { Wand2, Image as ImageIcon, Hash, Send, Clock, Twitter, Linkedin, Facebook, Instagram } from "lucide-react";

export default function Create() {
    const [content, setContent] = useState("");
    const [activePlatform, setActivePlatform] = useState("twitter");

    const platforms = [
        { id: "twitter", icon: Twitter, color: "#1DA1F2", name: "Twitter" },
        { id: "linkedin", icon: Linkedin, color: "#0A66C2", name: "LinkedIn" },
        { id: "instagram", icon: Instagram, color: "#E1306C", name: "Instagram" },
        { id: "facebook", icon: Facebook, color: "#1877F2", name: "Facebook" },
    ];

    return (
        <div className="flex flex-col gap-6 animate-fade-in">
            <header>
                <h1>Create Content</h1>
                <p>Draft, optimize, and schedule your posts across all platforms.</p>
            </header>

            <div className="grid-cols-2" style={{ gridTemplateColumns: '1.5fr 1fr' }}>

                {/* Editor */}
                <div className="glass-panel card flex flex-col gap-4">
                    <div className="flex gap-2 mb-2 p-2 bg-slate-800/50 rounded-lg">
                        {platforms.map((p) => (
                            <button
                                key={p.id}
                                onClick={() => setActivePlatform(p.id)}
                                className={`p-2 rounded-md transition-all ${activePlatform === p.id ? 'bg-slate-700 shadow-md' : 'hover:bg-slate-700/50'}`}
                            >
                                <p.icon size={20} color={activePlatform === p.id ? p.color : "#94a3b8"} />
                            </button>
                        ))}
                    </div>

                    <textarea
                        className="w-full h-64 bg-transparent border-none focus:ring-0 text-lg text-white resize-none placeholder-slate-600"
                        placeholder="What's on your mind?..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>

                    <div className="flex justify-between items-center pt-4 border-t border-slate-700/50">
                        <div className="flex gap-2">
                            <button className="p-2 text-slate-400 hover:text-white rounded-md hover:bg-slate-700/50" title="Add Image">
                                <ImageIcon size={20} />
                            </button>
                            <button className="p-2 text-slate-400 hover:text-white rounded-md hover:bg-slate-700/50" title="Add Hashtags">
                                <Hash size={20} />
                            </button>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <span>{content.length} chars</span>
                        </div>
                    </div>
                </div>

                {/* AI Assistant */}
                <div className="flex flex-col gap-6">
                    <div className="glass-panel card border-indigo-500/30">
                        <div className="flex items-center gap-2 mb-4">
                            <Wand2 className="text-indigo-400" size={24} />
                            <h3 className="text-lg font-bold text-white">AI Assistant</h3>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button className="p-3 bg-slate-800/50 rounded-lg text-left text-sm hover:bg-slate-800 transition-colors flex justify-between items-center group">
                                <span className="text-slate-300">Generate viral hooks</span>
                                <Wand2 size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" />
                            </button>
                            <button className="p-3 bg-slate-800/50 rounded-lg text-left text-sm hover:bg-slate-800 transition-colors flex justify-between items-center group">
                                <span className="text-slate-300">Optimize for engagement</span>
                                <Wand2 size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" />
                            </button>
                            <button className="p-3 bg-slate-800/50 rounded-lg text-left text-sm hover:bg-slate-800 transition-colors flex justify-between items-center group">
                                <span className="text-slate-300">Suggest hashtags</span>
                                <Wand2 size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" />
                            </button>
                        </div>

                        <div className="mt-6 pt-6 border-t border-slate-700/50">
                            <p className="text-xs text-slate-500 mb-2 font-semibold uppercase tracking-wider">Top Performing Times</p>
                            <div className="flex gap-2 flex-wrap">
                                <span className="text-xs bg-green-900/40 text-green-400 px-2 py-1 rounded-md border border-green-500/20">Today 2:00 PM</span>
                                <span className="text-xs bg-green-900/40 text-green-400 px-2 py-1 rounded-md border border-green-500/20">Today 6:30 PM</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel card p-4">
                        <div className="flex justify-between items-center">
                            <button className="flex-1 py-3 font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-2">
                                <Clock size={16} /> Schedule
                            </button>
                            <button className="flex-1 py-3 font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg ml-3 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20">
                                <Send size={16} /> Post Now
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
