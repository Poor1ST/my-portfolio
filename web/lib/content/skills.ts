import { BrainCircuit, Globe, Code2, Terminal } from 'lucide-react';
import {
  SiPytorch, SiTensorflow, SiScikitlearn, SiPandas, SiNumpy,
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer,
  SiPython, SiJavascript, SiHtml5, SiCss, SiMysql,
  SiGit, SiDocker, SiFigma, SiJupyter, SiVercel, SiN8N,
} from 'react-icons/si';
import type { SkillGroup } from '@/lib/types';

export const SKILLS: SkillGroup[] = [
  { category: 'AI / ML', icon: BrainCircuit, items: [
    { name: 'PyTorch', icon: SiPytorch },
    { name: 'TensorFlow', icon: SiTensorflow },
    { name: 'Scikit-Learn', icon: SiScikitlearn },
    { name: 'Pandas', icon: SiPandas },
    { name: 'NumPy', icon: SiNumpy },
    { name: 'CycleGAN', icon: BrainCircuit },
    { name: 'TCN', icon: BrainCircuit },
    { name: 'BiLSTM', icon: BrainCircuit },
  ] },
  { category: 'Frontend', icon: Globe, items: [
    { name: 'React', icon: SiReact },
    { name: 'Next.js', icon: SiNextdotjs },
    { name: 'TypeScript', icon: SiTypescript },
    { name: 'Tailwind CSS', icon: SiTailwindcss },
    { name: 'Framer Motion', icon: SiFramer },
  ] },
  { category: 'Languages', icon: Code2, items: [
    { name: 'Python', icon: SiPython },
    { name: 'JavaScript', icon: SiJavascript },
    { name: 'HTML5', icon: SiHtml5 },
    { name: 'CSS3', icon: SiCss },
    { name: 'SQL', icon: SiMysql },
  ] },
  { category: 'Tools', icon: Terminal, items: [
    { name: 'n8n', icon: SiN8N },
    { name: 'Git', icon: SiGit },
    { name: 'Docker', icon: SiDocker },
    { name: 'Figma', icon: SiFigma },
    { name: 'Jupyter', icon: SiJupyter },
    { name: 'Vercel', icon: SiVercel },
  ] },
];
