'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, RefreshCw, Layers, GitCommitVertical, Key, BrainCircuit, Type, Shrink, Target, Activity, ScanText } from 'lucide-react';
import { useTransformerSimulation } from '@/hooks/use-transformer-simulation';

interface StepNodeProps {
  isActive?: boolean;
  isDone?: boolean;
  isSuccess?: boolean;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: React.ReactNode;
  layout?: 'center' | 'left';
}

const StepNode = ({
  isActive, isDone, isSuccess, title, subtitle, icon: Icon, children, layout = 'center'
}: StepNodeProps) => {
  const isFaded = !isActive && !isDone && !isSuccess;

  return (
    <div className={`relative flex flex-col ${layout === 'center' ? 'items-center text-center' : 'items-start'} z-10 w-full`}>
       <motion.div
         initial={false}
         animate={{
           borderColor: isSuccess ? 'rgba(16, 185, 129, 0.5)' : isActive ? 'rgba(99, 102, 241, 0.5)' : 'rgba(255, 255, 255, 0.1)',
           backgroundColor: isSuccess ? 'rgba(16, 185, 129, 0.1)' : isActive ? 'rgba(30, 27, 75, 0.9)' : 'rgba(15, 23, 42, 0.8)',
           scale: isActive ? 1.02 : 1,
           opacity: isFaded ? 0.3 : 1,
           boxShadow: isActive ? '0 0 30px rgba(99, 102, 241, 0.2)' : isSuccess ? '0 0 30px rgba(16, 185, 129, 0.2)' : 'none',
         }}
          className="w-full max-w-sm rounded-[1.5rem] p-3 sm:p-4 border border-white/10 backdrop-blur-sm transition-all"
       >
             <div className={`flex items-center gap-3 ${layout === 'center' ? 'justify-center' : ''}`}>
                <div className={`p-2 rounded-xl transition-colors duration-500 ${
                   isSuccess ? 'bg-emerald-500/20 text-emerald-400' : isActive ? 'bg-indigo-500/20 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-white/5 text-slate-500'
                }`}>
                   <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
            <div className="text-left">
                <h4 className={`font-bold text-sm sm:text-base transition-colors duration-500 ${isSuccess ? 'text-emerald-300' : isActive ? 'text-indigo-300' : 'text-slate-300'}`}>
                  {title}
                </h4>
                <p className="text-[10px] sm:text-xs text-slate-400 font-light">{subtitle}</p>
            </div>
         </div>
          {children && (
             <div className="mt-3">
               {children}
             </div>
          )}
       </motion.div>
    </div>
  );
};

export default function InteractiveLab() {
  const {
    inputText, setInputText,
    status, result,
    activeStep, activeLayer,
    handleAnalyze, reset,
  } = useTransformerSimulation();

  return (
    <section id="lab" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-slate-950 overflow-hidden min-h-screen border-t border-white/5">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h3 className="font-mono text-indigo-400 text-sm uppercase tracking-widest mb-4">Visual Explorer //</h3>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
              Inside <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">BERT</span>
            </h2>
          </div>
          <div className="text-slate-400 max-w-sm font-light text-sm text-left md:text-right">
            See exactly how an AI model turns raw text into deep understanding, layer by layer.
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* LEFT: Controls (Sticky on Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 sticky top-24"
          >
             <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-[60px] pointer-events-none"></div>

                <div>
                  <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2 mb-2">
                     <Layers className="w-5 h-5 text-indigo-400" /> Start Simulation
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 font-light">Type a sentence below and watch how data flows through the neural network.</p>
                </div>

                <form onSubmit={handleAnalyze} className="relative z-10 flex flex-col gap-4">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="e.g. The movie was absolutely fantastic!"
                    className="w-full h-32 bg-black/40 border border-white/10 rounded-2xl p-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 resize-none transition-all text-sm font-light shadow-inner"
                    disabled={status === 'analyzing'}
                  ></textarea>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={reset}
                      className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 transition-colors"
                      disabled={status === 'analyzing'}
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    <button
                      type="submit"
                      disabled={status === 'analyzing' || !inputText.trim()}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 text-white px-4 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
                    >
                      {status === 'analyzing' ? (
                        <span className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 animate-pulse" /> Processing...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-4 h-4" /> Run Architecture
                        </span>
                      )}
                    </button>
                  </div>
                </form>

                <AnimatePresence>
                  {status === 'complete' && result && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="mt-4 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex justify-between items-center relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-[40px]"></div>
                      <div className="relative z-10">
                         <div className="text-xs text-emerald-400/80 uppercase tracking-widest font-mono mb-1">Final Output</div>
                         <div className="text-2xl font-black text-emerald-400">{result.class}</div>
                      </div>
                      <div className="relative z-10 text-right">
                         <div className="text-[10px] text-slate-400 font-mono">Confidence</div>
                         <div className="text-lg text-emerald-100 font-mono">{((result.confidence) * 100).toFixed(1)}%</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
          </motion.div>

          {/* RIGHT: Pipeline Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 w-full relative py-2 sm:py-8"
          >
              {status !== 'idle' && (
                <div className="absolute top-10 bottom-10 left-[2.5rem] sm:left-1/2 sm:-translate-x-1/2 w-[3px] bg-slate-800/80 rounded-full overflow-hidden z-0">
                   <motion.div
                     className="w-full bg-gradient-to-b from-indigo-500 via-purple-500 to-emerald-500 absolute top-0"
                     initial={{ height: '0%', top: '0%' }}
                     animate={{
                        height: status === 'complete' ? '100%' : '15%',
                        top: status === 'complete' ? '0%' : (
                           activeStep === 'input' ? '0%' :
                           activeStep === 'embedding' ? '25%' :
                           activeStep === 'encoder' ? '50%' :
                           activeStep === 'pooling' ? '80%' :
                           activeStep === 'output' ? '90%' : '-20%'
                        ),
                     }}
                     transition={{ type: 'tween', ease: 'easeInOut', duration: status === 'complete' ? 0.3 : 0.6 }}
                   />
                </div>
              )}

             <div className="flex flex-col gap-6 sm:gap-8 relative z-10 items-start sm:items-center ml-[4rem] sm:ml-0">

                {/* 1. Input */}
                <StepNode
                  isActive={activeStep === 'input'}
                  isDone={activeStep !== 'input' && activeStep !== null}
                  title="1. Read Text"
                  subtitle="Breaking sentence into pieces (tokens)"
                  icon={Type}
                  layout="left"
                >
                </StepNode>

                {/* 2. Embeddings */}
                <StepNode
                  isActive={activeStep === 'embedding'}
                  isDone={['encoder', 'pooling', 'output'].includes(activeStep as string) || status === 'complete'}
                  title="2. Word Meaning"
                  subtitle="Converting pieces to numbers [50265 → 768]"
                  icon={Key}
                  layout="left"
                >
                    <div className="flex flex-col gap-1.5 pt-3 border-t border-white/5">
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[10px] sm:text-[11px]">
                          <div className="bg-black/30 p-1.5 sm:p-2 rounded-lg border border-white/5">
                             <span className="text-pink-400 font-mono block mb-0.5">word_embeddings</span>
                             <span className="text-slate-400">Core word identity</span>
                          </div>
                          <div className="bg-black/30 p-1.5 sm:p-2 rounded-lg border border-white/5">
                             <span className="text-pink-400 font-mono block mb-0.5">position_embeddings</span>
                             <span className="text-slate-400">Word order in sentence</span>
                          </div>
                       </div>
                       <div className="flex items-center gap-2 text-[10px] sm:text-xs bg-amber-500/10 text-amber-300/80 p-1.5 sm:p-2 rounded-lg border border-amber-500/20">
                         <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5"/> LayerNorm <span className="opacity-60 ml-auto font-mono">768</span>
                       </div>
                    </div>
                </StepNode>

                {/* 3. Encoder Layers */}
                <StepNode
                  isActive={activeStep === 'encoder'}
                  isDone={['pooling', 'output'].includes(activeStep as string) || status === 'complete'}
                  title="3. Deep Understanding"
                  subtitle="Processing context across 12 layers"
                  icon={BrainCircuit}
                  layout="left"
                >
                    <div className="mt-3 w-full flex flex-col gap-2">
                       <div className="flex items-center justify-between text-[10px] sm:text-xs text-indigo-300">
                         <span>Active Layer</span>
                         <span className="font-mono bg-indigo-500/20 px-2 py-0.5 rounded text-[9px] sm:text-[10px]">{activeLayer !== null ? activeLayer + 1 : 12} / 12</span>
                       </div>
                       <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden border border-white/5 p-[1px]">
                          <motion.div
                             className="h-full bg-indigo-500 rounded-full"
                             initial={{ width: '0%' }}
                             animate={{ width: `${((activeLayer !== null ? activeLayer + 1 : 12) / 12) * 100}%` }}
                             transition={{ duration: 0.15 }}
                          />
                       </div>

                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div className="bg-black/40 border border-purple-500/20 rounded-xl p-2 sm:p-3 relative overflow-hidden">
                             {activeStep === 'encoder' && <motion.div animate={{ opacity: [0, 0.15, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="absolute inset-0 bg-purple-500" />}
                             <div className="text-[10px] sm:text-xs font-semibold text-purple-300 relative z-10 flex items-center gap-1"><GitCommitVertical className="w-3 h-3 sm:w-3.5 sm:h-3.5"/> Self-Attention</div>
                             <div className="text-[9px] sm:text-[10px] text-slate-400 leading-relaxed mt-0.5 relative z-10">Connecting context between all words.</div>
                          </div>
                          <div className="bg-black/40 border border-teal-500/20 rounded-xl p-2 sm:p-3 relative overflow-hidden">
                             {activeStep === 'encoder' && <motion.div animate={{ opacity: [0, 0.15, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.5 }} className="absolute inset-0 bg-teal-500" />}
                             <div className="text-[10px] sm:text-xs font-semibold text-teal-300 relative z-10 flex items-center gap-1"><ScanText className="w-3 h-3 sm:w-3.5 sm:h-3.5"/> Feed-Forward</div>
                             <div className="text-[9px] sm:text-[10px] text-slate-400 leading-relaxed mt-0.5 relative z-10">Refining meaning via +GELU.</div>
                          </div>
                       </div>
                    </div>
                </StepNode>

                {/* 4. Pooling */}
                <StepNode
                  isActive={activeStep === 'pooling'}
                  isDone={['output'].includes(activeStep as string) || status === 'complete'}
                  title="4. Summarize"
                  subtitle="Condensing to one final thought"
                  icon={Shrink}
                  layout="left"
                >
                    <div className="text-[10px] sm:text-xs text-slate-400 bg-black/30 p-1.5 sm:p-2 rounded-lg border border-white/5 flex items-center gap-2">
                      <span className="font-mono text-purple-400">[batch, 768]</span> <span className="text-white/20">→</span> <span className="font-mono text-pink-400">Tanh Projection</span>
                    </div>
                </StepNode>

                {/* 5. Output */}
                <StepNode
                  isActive={activeStep === 'output' || status === 'complete'}
                  isDone={status === 'complete'}
                  isSuccess={status === 'complete'}
                  title="5. Final Result"
                  subtitle="Making the classification decision"
                  icon={Target}
                  layout="left"
                >
                    <div className="flex flex-col mt-3 pt-3 border-t border-white/5 gap-2">
                       <div className="text-[10px] sm:text-xs text-slate-400 bg-black/30 p-1.5 sm:p-2 rounded-lg border border-white/5 flex items-center justify-between">
                         <span className="font-mono text-purple-400">Linear [768]</span>
                         <span className="text-white/20">→</span>
                         <span className="font-mono text-emerald-400">Softmax [3]</span>
                       </div>
                       {status === 'complete' && result && (
                         <div className="flex justify-center items-end gap-4 sm:gap-6 mt-2 mb-1">
                           {[
                             { key: 'positive', label: 'POS', barColor: 'bg-emerald-500', textColor: 'text-emerald-400' },
                             { key: 'neutral', label: 'NEU', barColor: 'bg-amber-500', textColor: 'text-amber-400' },
                             { key: 'negative', label: 'NEG', barColor: 'bg-rose-500', textColor: 'text-rose-400' },
                           ].map(({ key, label, barColor, textColor }) => {
                             const p = result.all.find((r) => r.label === key);
                             const score = p ? p.score : 0;
                             const pct = Math.max(score * 100, 2);
                             return (
                               <div key={key} className="flex flex-col items-center gap-1">
                                 <div className="h-14 sm:h-16 w-4 sm:w-5 bg-black border border-white/10 rounded-full overflow-hidden flex flex-col justify-end">
                                   <motion.div
                                     initial={{ height: '0%' }}
                                     animate={{ height: `${pct}%` }}
                                     className={`w-full ${barColor} rounded-full`}
                                   />
                                 </div>
                                 <span className={`text-[9px] sm:text-[10px] ${textColor}`}>{label}</span>
                                 <span className="text-[7px] sm:text-[8px] text-slate-500 font-mono">{(score * 100).toFixed(0)}%</span>
                               </div>
                             );
                           })}
                         </div>
                       )}
                    </div>
                </StepNode>

             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
