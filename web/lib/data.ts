import { BrainCircuit, Globe, Code2, Terminal } from 'lucide-react';
import {
  SiPytorch, SiTensorflow, SiScikitlearn, SiPandas, SiNumpy,
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer,
  SiPython, SiJavascript, SiHtml5, SiCss, SiMysql,
  SiGit, SiDocker, SiFigma, SiJupyter, SiVercel, SiN8N,
} from 'react-icons/si';
import type { ComponentType } from 'react';

export interface SkillItem {
  name: string;
  icon: ComponentType<{ className?: string }>;
}

export interface SkillGroup {
  category: string;
  icon: ComponentType<{ className?: string }>;
  items: SkillItem[];
}

export interface Project {
  title: string;
  roles: string[];
  description: string;
  overview: string;
  technologies: string[];
  challenges?: string[];
  solutions?: string[];
  tags: string[];
  github?: string;
  live?: string;
  date: string;
  categories: string[];
  image: string;
}

export const NAV_LINKS = ['About','Skills', 'Lab', 'Projects', 'Contact'];

export const CATEGORIES = ['All', 'AI', 'Automation', 'Front End'];

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

export const PROJECTS: Project[] = [
  {
    title: 'Stock Price Prediction Model',
    roles: ['Data Analysis', 'Model Optimization'],
    description: 'Developed and evaluated a hybrid deep learning model combining TCN and BiLSTM to improve accuracy of stock price predictions.',
    overview: 'A hybrid deep learning model that combines Temporal Convolutional Networks (TCN) and Bidirectional LSTM (BiLSTM) to predict stock prices with higher accuracy. The model integrates historical price data with technical indicators and fundamental analysis features, outperforming single-architecture baselines on Indonesian stock market data.',
    technologies: ['Python', 'TensorFlow', 'Keras', 'Pandas', 'NumPy', 'scikit-learn'],
    challenges: [
      'Synchronizing multi-source financial data with different sampling frequencies',
      'Preventing overfitting on volatile stock market data',
      'Tuning hybrid architecture hyperparameters for optimal temporal feature extraction',
    ],
    solutions: [
      'Implemented a custom data pipeline that resamples and aligns technical/fundamental indicators to daily price intervals',
      'Used dropout layers, early stopping, and k-fold cross-validation to regularize the hybrid model',
      'Conducted systematic grid search over TCN dilation rates and BiLSTM units to balance memory and accuracy',
    ],
    tags: ['Python', 'Deep Learning', 'TCN', 'BiLSTM'],
    github: 'https://github.com/Poor1ST/Stock-Price-Prediction-TCN-BiLSTM',
    date: '2023-11',
    categories: ['AI'],
    image: 'stock_price_prediction.png',
  },
  {
    title: 'Interactive Portfolio Website',
    roles: ['Front End Developer'],
    description: 'This very portfolio, built with Next.js and Framer Motion to create a dynamic and engaging user experience.',
    overview: 'A personal portfolio website showcasing AI/ML and frontend engineering projects. Built with Next.js App Router and Framer Motion to deliver smooth page transitions, scroll-triggered animations, and an interactive 3D hero section powered by WebGL shaders. Features a Transformer architecture visualization lab and a sentiment analysis API integration.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js (React Three Fiber)', 'WebGL Shaders'],
    challenges: [
      'Achieving smooth 60fps animations while rendering WebGL shader backgrounds',
      'Designing a cohesive dark-themed UI that feels performant and immersive',
      'Integrating external AI APIs (HuggingFace) without exposing API keys on the client',
    ],
    solutions: [
      'Leveraged Framer Motion\'s layout animations and whileInView triggers with GPU-accelerated CSS transforms',
      'Used Tailwind CSS with a custom indigo/purple accent palette, glassmorphism cards, and consistent spacing tokens',
      'Created a server-side API route in Next.js to proxy HuggingFace sentiment requests securely',
    ],
    tags: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
    live: 'https://nur-aziz-portfolio.vercel.app/',
    github: 'https://github.com/Poor1ST/portfolio',
    date: '2024-05',
    categories: ['Front End'],
    image: 'portfolio.png',
  },
  {
    title: 'Depression Diagnosis',
    roles: ['Algorithm Implementation', 'Front End Developer'],
    description: 'A web that uses an expert system to diagnose depression based on user input and certainty factor.',
    overview: 'A web-based expert system that diagnoses depression severity using the Certainty Factor method. Users answer a structured questionnaire, and the system applies rule-based inference to compute a confidence-weighted diagnosis. The frontend provides a clean, accessible interface for symptom input and results visualization.',
    technologies: ['Expert System', 'Certainty Factor', 'PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    challenges: [
      'Encoding psychiatric domain knowledge into a complete rule-based inference engine',
      'Handling uncertainty in user responses with the Certainty Factor approach',
      'Building a diagnostic interface that is informative without being alarming',
    ],
    solutions: [
      'Collaborated with a psychology consultant to define symptom-rule mappings and severity thresholds',
      'Implemented CF combination formulas to merge multiple symptom confidences into a single diagnosis score',
      'Designed a results page that shows severity level, confidence percentage, and a clear recommendation to consult a professional',
    ],
    tags: ['Expert System', 'Web Dev'],
    date: '2023-01',
    categories: ['AI', 'Front End'],
    image: 'depression_diagnosis.png',
  },
  {
    title: 'Geo Logbook',
    roles: ['Front End Developer'],
    description: 'Developed an interactive and customizable travel journal web application by translating six Figma design pages into a fully functional user interface.',
    overview: 'A travel journal web application that lets users document trips with location data, photos, and personal notes. Six Figma design pages were faithfully translated into a responsive Next.js interface with dynamic routing, image uploads, and an interactive map view for visualizing travel history.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Figma', 'Leaflet Map'],
    challenges: [
      'Translating complex Figma design systems into pixel-perfect, responsive React components',
      'Integrating map visualization with journal entries for spatial browsing',
      'Managing image uploads and optimising load times on the journal feed',
    ],
    solutions: [
      'Created a shared component library mirroring Figma\'s design tokens (spacing, color, typography)',
      'Used Leaflet with custom markers to plot journal entries on an interactive map',
      'Implemented Next.js Image optimization for uploaded journal photos with lazy loading',
    ],
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    date: '2023-08',
    categories: ['Front End'],
    image: 'geologbook.png',
  },
  {
    title: 'Reality to Comic Style Model',
    roles: ['AI Developer'],
    description: 'Implemented and trained a CycleGAN model for an image-to-image translation task, converting real-world facial photographs into a consistent, stylized comic book art form.',
    overview: 'A CycleGAN-based image translation model that converts real-world facial photographs into stylized comic book art. Trained on unpaired photo and comic face datasets, the model learns to preserve identity features while applying a consistent cel-shaded, halftone comic aesthetic. The project explores generative adversarial training without paired examples.',
    technologies: ['PyTorch', 'CycleGAN', 'Computer Vision', 'OpenCV', 'Albumentations'],
    challenges: [
      'Training CycleGAN on unpaired photo-comic datasets without losing facial identity',
      'Preventing mode collapse while generating diverse comic styles',
      'Balancing cycle-consistency loss with adversarial loss for realistic texturing',
    ],
    solutions: [
      'Applied identity preservation loss weighting to maintain facial structure during style transfer',
      'Used historical replay buffers and learning rate scheduling to stabilize GAN training',
      'Experimented with patchGAN discriminators for finer-grained texture realism in comic outputs',
    ],
    tags: ['CycleGAN', 'Computer Vision', 'PyTorch'],
    date: '2022-12',
    categories: ['AI'],
    image: 'face_to_comic.png',
  },
  {
    title: 'Sokin',
    roles: ['Frontend Developer'],
    description: 'Contributed to building an e-commerce platform for a food delivery service on a team of six.',
    overview: 'An e-commerce platform for a food delivery service, built collaboratively in a six-person team. The platform handles restaurant listings, menu browsing, cart management, and order tracking. My contributions focused on building responsive product pages, checkout flows, and integrating RESTful payment APIs.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'REST API', 'Zustand'],
    challenges: [
      'Coordinating feature development across six developers without merge conflicts',
      'Implementing a real-time cart that syncs across browser tabs',
      'Integrating with third-party payment gateway APIs securely',
    ],
    solutions: [
      'Followed a feature-branch Git workflow with weekly sync meetings and PR code reviews',
      'Used Zustand for lightweight client-side cart state with localStorage persistence and BroadcastChannel API for cross-tab sync',
      'Abstracted payment API interactions behind a service layer with idempotency keys to prevent duplicate charges',
    ],
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    date: '2022-07',
    categories: ['Front End'],
    image: 'Sokin.png',
  },
  {
    title: 'Automatic Snake Game',
    roles: ['Data Preprocessing', 'Hyperparameter Tuning'],
    description: "Optimized a self-learning Snake game AI by structuring the visual game environment for machine processing and systematically tuning the Genetic Algorithm's hyperparameters.",
    overview: 'An AI agent that learns to play the classic Snake game using a Genetic Algorithm. The visual game environment was preprocessed into numeric state representations for the AI, and systematic hyperparameter tuning (mutation rate, population size, crossover strategy) was performed to evolve increasingly effective snake-controlling neural networks across generations.',
    technologies: ['Python', 'Genetic Algorithm', 'NumPy', 'Pygame', 'Matplotlib'],
    challenges: [
      'Encoding the 2D game grid into a fixed-length feature vector for the neural network',
      'Designing a fitness function that rewards both survival time and food collection',
      'Tuning GA hyperparameters to converge within a reasonable number of generations',
    ],
    solutions: [
      'Extracted 11 directional danger and food-distance features from the grid rather than using raw pixels',
      'Used a weighted fitness score combining food eaten, steps taken, and penalties for dying early',
      'Ran a grid search over mutation rates (0.01-0.1) and population sizes (50-500) to find the optimal evolution speed',
    ],
    tags: ['Genetic Algorithm', 'AI', 'Python'],
    date: '2021-11',
    categories: ['AI'],
    image: 'snake_game.png',
  },
];
