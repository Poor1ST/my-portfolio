'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Settings2, Send, Sparkles, RefreshCw, Cpu, GitMerge, Combine } from 'lucide-react';
import { useTransformerSimulation } from '@/hooks/use-transformer-simulation';

const ParamControl = ({ label, value, options, onChange, disabled }: { label: string, value: number, options: number[], onChange: (val: number) => void, disabled: boolean }) => (
  <div className="flex flex-col gap-2">
    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">{label}</span>
    <div className="flex bg-slate-900/50 rounded-xl p-1 border border-white/5">
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          disabled={disabled}
          className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
            value === opt
              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
              : 'text-slate-500 hover:text-slate-300 transparent border border-transparent'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

export default function InteractiveLab() {
  const {
    inputText, setInputText,
    status, result,
    numLayers, setNumLayers,
    numHeads, setNumHeads,
    hiddenDim, setHiddenDim,
    activeStep,
    handleAnalyze, reset,
  } = useTransformerSimulation();

  return (
    <section id="lab" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative border-t border-white/10 z-10 bg-slate-950/30 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8"
        >
          <div>
            <h3 className="font-mono text-indigo-400 text-sm uppercase tracking-[0.2em] mb-4">Interactive Lab //</h3>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase">
              Transformer <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Architecture</span>
            </h2>
          </div>
          <div className="text-slate-400 max-w-sm md:text-right font-light text-xs sm:text-sm">
            Tune the hyperparameters of a simulated Transformer model and visualize how the data flows through its multi-head attention and feed-forward layers.
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">

          {/* LEFT: Input & Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-6 md:p-8 flex flex-col gap-5 sm:gap-6 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[40px]"></div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Settings2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-100">Model Params</h3>
            </div>

            <div className="space-y-4">
              <ParamControl label="Layers (Depth)" value={numLayers} options={[1, 2, 3]} onChange={setNumLayers} disabled={status === 'analyzing'} />
              <ParamControl label="Attention Heads" value={numHeads} options={[2, 4, 8]} onChange={setNumHeads} disabled={status === 'analyzing'} />
              <ParamControl label="Hidden Dimension" value={hiddenDim} options={[64, 128, 256]} onChange={setHiddenDim} disabled={status === 'analyzing'} />
            </div>

            <div className="h-px bg-white/10 w-full my-2"></div>

            <form onSubmit={handleAnalyze} className="relative z-10 flex-1 flex flex-col justify-end">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to analyze..."
                className="w-full h-24 sm:h-28 bg-slate-900/50 border border-white/10 rounded-2xl p-3 sm:p-4 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 resize-none transition-all text-sm font-light shadow-inner mb-3 sm:mb-4"
                disabled={status === 'analyzing'}
              ></textarea>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={reset}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 transition-colors"
                  disabled={status === 'analyzing'}
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  type="submit"
                  disabled={status === 'analyzing' || !inputText.trim()}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  {status === 'analyzing' ? (
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 animate-pulse" /> Processing Flow...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" /> Run Inference
                    </span>
                  )}
                </button>
              </div>
            </form>

            <AnimatePresence>
              {status === 'complete' && result && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 p-3 sm:p-4 border border-indigo-500/30 rounded-2xl bg-indigo-500/10 backdrop-blur-md"
                >
                  <p className="text-[10px] sm:text-xs font-mono text-indigo-300 uppercase tracking-widest mb-2">Output Tensor</p>
                  <div className="flex items-end justify-between">
                    <span className={`text-lg sm:text-xl font-black ${
                      result.class === 'Positive' ? 'text-emerald-400' :
                      result.class === 'Negative' ? 'text-rose-400' : 'text-slate-300'
                    }`}>
                      {result.class}
                    </span>
                    <span className="text-[10px] sm:text-xs font-mono text-slate-400">
                      Conf: {((result.confidence) * 100).toFixed(1)}%
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* RIGHT: Architecture Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 bg-slate-900/30 backdrop-blur-xl border border-white/5 rounded-3xl p-4 sm:p-6 relative overflow-hidden flex flex-col justify-end shadow-inner min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] gap-2 sm:gap-3"
          >
            {/* Output Header */}
            <div className={`p-3 rounded-xl border transition-all duration-300 flex items-center justify-center gap-2 ${
              activeStep?.type === 'output' || status === 'complete'
                ? 'bg-indigo-500/20 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                : 'bg-white/5 border-white/10 text-slate-500'
            }`}>
              <Cpu className="w-4 h-4" />
              <span className="text-sm font-mono tracking-wider">Classification Head</span>
            </div>

            {/* Transformer Layers */}
            <div className="flex-1 flex flex-col-reverse gap-4 overflow-y-auto pr-2 custom-scrollbar my-2">
              {Array.from({ length: numLayers }).map((_, layerIdx) => (
                <div key={layerIdx} className="relative border border-white/10 rounded-2xl p-2 bg-slate-950/50 flex flex-col gap-2">
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] uppercase font-mono tracking-widest text-slate-500">
                    Layer {layerIdx + 1}
                  </div>

                  {/* Feed Forward */}
                  <div className="relative">
                    <div className="absolute left-4 -bottom-2 w-px h-2 bg-indigo-500/30"></div>
                    <div className="absolute right-4 -bottom-2 w-px h-2 bg-indigo-500/30"></div>
                    <div className={`p-2 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center gap-1 ${
                      (activeStep?.type?.startsWith('ffn') && activeStep?.layer === layerIdx)
                        ? 'bg-emerald-900/40 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                        : 'bg-white/5 border-white/10 text-slate-400'
                    }`}>
                      <span className="text-[10px] font-mono font-semibold tracking-widest text-emerald-200 text-center">Feed Forward Network</span>

                      <div className="w-full flex flex-col gap-1 relative h-8 justify-center">
                         <div className="flex gap-1 justify-center z-10 transition-all duration-500">
                           {Array.from({ length: 16 }).map((_, i) => (
                              <motion.div
                                 key={`expand-${i}`}
                                 initial={{ height: 4, opacity: 0.3 }}
                                 animate={{
                                    height: (activeStep?.type === 'ffn_expand' || activeStep?.type === 'ffn_contract') && activeStep?.layer === layerIdx ? 16 : 4,
                                    opacity: (activeStep?.type === 'ffn_expand' || activeStep?.type === 'ffn_contract') && activeStep?.layer === layerIdx ? 1 : 0.3,
                                    backgroundColor: activeStep?.type === 'ffn_expand' ? '#34d399' : '#10b981'
                                 }}
                                 className="w-1.5 rounded-full"
                              />
                           ))}
                         </div>
                         <AnimatePresence>
                           {activeStep?.type === 'ffn_expand' && activeStep?.layer === layerIdx && (
                             <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="absolute top-0 right-2 text-[8px] font-mono text-emerald-300 bg-black/40 px-1 rounded"
                             >
                               GeLU
                             </motion.div>
                           )}
                         </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  {/* Add & Norm 1 */}
                  <div className="flex justify-center -my-3 z-10">
                    <motion.div
                      animate={{
                        scale: activeStep?.type === 'add_norm_1' && activeStep?.layer === layerIdx ? 1.05 : 1,
                        backgroundColor: activeStep?.type === 'add_norm_1' && activeStep?.layer === layerIdx ? 'rgba(56, 189, 248, 0.2)' : 'rgba(30, 41, 59, 1)',
                        borderColor: activeStep?.type === 'add_norm_1' && activeStep?.layer === layerIdx ? 'rgba(56, 189, 248, 0.5)' : 'rgba(255, 255, 255, 0.1)',
                        color: activeStep?.type === 'add_norm_1' && activeStep?.layer === layerIdx ? '#38bdf8' : '#94a3b8'
                      }}
                      className="text-[8px] font-mono px-2 py-0.5 rounded-full border flex items-center gap-1 shadow-lg"
                    >
                      <Combine className="w-2.5 h-2.5" /> Add & LayerNorm
                    </motion.div>
                  </div>

                  {/* Multi-Head Attention Details */}
                  <div className={`p-2 rounded-xl border transition-all duration-300 relative overflow-hidden ${
                    (activeStep?.type?.startsWith('attention') || activeStep?.type === 'concat_heads') && activeStep?.layer === layerIdx
                      ? 'bg-purple-900/40 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                      : 'bg-white/5 border-white/10 text-slate-400'
                  }`}>
                    <div className="text-center mb-2 text-[10px] font-mono font-semibold tracking-widest text-[#d8b4fe]">
                      Multi-Head Attention
                    </div>

                    <div className="flex flex-col gap-2 relative z-10">
                      {/* Q, K, V Matrices Generation */}
                      <div className="flex justify-between items-center px-1 sm:px-4">
                        {[
                          { name: 'Q', label: 'Query', color: 'bg-pink-500' },
                          { name: 'K', label: 'Key', color: 'bg-blue-500' },
                          { name: 'V', label: 'Value', color: 'bg-indigo-500' }
                        ].map((mat) => (
                          <motion.div
                             key={mat.name}
                             animate={{
                                y: activeStep?.type === 'attention_qkv' && activeStep?.layer === layerIdx ? [0, -2, 0] : 0,
                                boxShadow: activeStep?.type === 'attention_qkv' && activeStep?.layer === layerIdx ? `0 0 12px ${mat.color.replace('bg-', '')}` : 'none',
                                borderColor: activeStep?.type === 'attention_qkv' && activeStep?.layer === layerIdx ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)'
                             }}
                             className="relative flex flex-col items-center gap-0.5 group z-10"
                          >
                            <div className={`w-5 h-5 text-[10px] rounded border border-white/10 flex items-center justify-center font-black ${mat.color}/20 text-white shadow-lg`}>
                              {mat.name}
                            </div>
                            <span className="hidden sm:block text-[7px] font-mono opacity-80 uppercase tracking-widest">{mat.label}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* The Heads */}
                      <div className="flex gap-0.5 sm:gap-1 justify-center mt-1 relative w-full">
                        {/* Animated paths for MatMul */}
                        <AnimatePresence>
                          {activeStep?.type === 'attention_scores' && activeStep?.layer === layerIdx && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8, y: -20 }}
                              animate={{ opacity: 1, scale: 1, y: -10 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-600 border border-purple-400 text-white text-[9px] px-3 py-1 rounded-full z-20 font-mono shadow-[0_0_15px_rgba(168,85,247,0.8)] whitespace-nowrap"
                            >
                              Softmax(Q×K<sup className="text-[6px]">T</sup> / √d)
                            </motion.div>
                          )}
                          {activeStep?.type === 'attention_output' && activeStep?.layer === layerIdx && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: -10 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 border border-indigo-400 text-white text-[9px] px-3 py-1 rounded-full z-20 font-mono shadow-[0_0_15px_rgba(99,102,241,0.8)] whitespace-nowrap"
                            >
                              Weights × V
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {Array.from({ length: numHeads }).map((_, i) => (
                          <div key={i} className={`flex-1 rounded border overflow-hidden flex flex-col items-center justify-center transition-all duration-300 relative ${
                            (activeStep?.type?.startsWith('attention') || activeStep?.type === 'concat_heads') && activeStep?.layer === layerIdx
                              ? 'bg-purple-950/50 border-purple-500/30'
                              : 'bg-slate-900/50 border-white/5'
                          }`}>
                            <div className="w-full py-0.5 bg-black/40 text-center border-b border-white/5">
                              <span className="hidden sm:inline text-[7px] font-mono opacity-80">Head {i+1}</span>
                            </div>

                            <div className="flex gap-1 py-1 px-1 items-center h-8 justify-center w-full">
                              {((activeStep?.type?.startsWith('attention') || activeStep?.type === 'concat_heads') && activeStep?.layer === layerIdx) ? (
                                <div className="flex items-center gap-1">
                                   <motion.div
                                      animate={{
                                         height: activeStep.type === 'attention_scores' ? 16 : 8,
                                         opacity: activeStep.type === 'attention_output' ? 0.5 : 1
                                      }}
                                      className="w-1.5 sm:w-1.5 bg-gradient-to-b from-pink-500/80 to-blue-500/80 rounded-[2px] shadow-[0_0_5px_rgba(236,72,153,0.5)]"
                                   />
                                   <motion.div
                                      animate={{
                                         height: activeStep.type === 'attention_output' ? 16 : 8,
                                         x: activeStep.type === 'concat_heads' ? -4 : 0,
                                         scale: activeStep.type === 'concat_heads' ? 1.2 : 1
                                      }}
                                      className="w-1.5 sm:w-1.5 bg-indigo-500/80 rounded-[2px] shadow-[0_0_5px_rgba(99,102,241,0.5)]"
                                   />
                                </div>
                              ) : (
                                   <GitMerge className="w-3 h-3 opacity-20" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Concat & Linear Projection */}
                      <motion.div
                         animate={{
                            backgroundColor: activeStep?.type === 'concat_heads' && activeStep?.layer === layerIdx ? 'rgba(147,51,234,0.4)' : 'rgba(255,255,255,0.05)',
                            borderColor: activeStep?.type === 'concat_heads' && activeStep?.layer === layerIdx ? 'rgba(168,85,247,0.6)' : 'rgba(255,255,255,0.1)'
                         }}
                         className="mt-1 h-6 rounded-lg border flex items-center justify-center transition-colors"
                      >
                        <span className={`text-[8px] tracking-widest uppercase font-mono ${activeStep?.type === 'concat_heads' && activeStep?.layer === layerIdx ? 'text-purple-200' : 'text-slate-500'}`}>
                           Concat + Linear Proj (<span className="opacity-80">W<sup>O</sup></span>)
                        </span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Add & Norm 2 */}
                  <div className="flex justify-center -mb-2 mt-[-8px] z-10">
                    <motion.div
                      animate={{
                        scale: activeStep?.type === 'add_norm_2' && activeStep?.layer === layerIdx ? 1.05 : 1,
                        backgroundColor: activeStep?.type === 'add_norm_2' && activeStep?.layer === layerIdx ? 'rgba(56, 189, 248, 0.2)' : 'rgba(30, 41, 59, 1)',
                        borderColor: activeStep?.type === 'add_norm_2' && activeStep?.layer === layerIdx ? 'rgba(56, 189, 248, 0.5)' : 'rgba(255, 255, 255, 0.1)',
                        color: activeStep?.type === 'add_norm_2' && activeStep?.layer === layerIdx ? '#38bdf8' : '#94a3b8'
                      }}
                      className="text-[8px] font-mono px-2 py-0.5 rounded-full border flex items-center gap-1 shadow-lg translate-y-2"
                    >
                      <Combine className="w-2.5 h-2.5" /> Add & LayerNorm
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Embedding */}
            <div className={`p-3 rounded-xl border transition-all duration-300 mt-2 flex flex-col items-center justify-center ${
              activeStep?.type === 'embedding'
                ? 'bg-pink-500/20 border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.3)]'
                : 'bg-white/5 border-white/10 text-slate-400'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-mono tracking-wider">Input Embedding + Positional Encoding</span>
              </div>
              <div className="flex gap-1 w-full max-w-sm justify-center">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className={`flex-1 h-2 rounded-sm transition-all duration-500 ${
                    activeStep?.type === 'embedding'
                      ? 'bg-pink-400 animate-pulse'
                      : status === 'complete' ? 'bg-slate-500' : 'bg-slate-700'
                  }`} style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
