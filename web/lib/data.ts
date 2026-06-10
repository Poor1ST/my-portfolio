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
  status?: 'completed' | 'in-progress';
}

export interface ExperienceRole {
  title: string;
  period: string;
}

export interface Experience {
  organization: string;
  location: string;
  type: 'internship' | 'apprenticeship' | 'organization';
  roles: ExperienceRole[];
  description: string[];
  tags: string[];
}

export const NAV_LINKS = ['About', 'Lab', 'Skills', 'Experience', 'Projects', 'Contact'];

export const CATEGORIES = ['All', 'AI', 'Front End'];

export const EXPERIENCES: Experience[] = [
  {
    organization: 'Aksoro',
    location: 'Sleman, Indonesia',
    type: 'internship',
    roles: [{ title: 'AI Trainer', period: 'Feb 2026 – May 2026' }],
    description: [
      'Trained, optimized, and maintained 25+ customer service AI agents across client accounts, collaborating directly with clients to translate business needs into effective AI configurations.',
      'Accelerated AI training workflow by researching AI implementation and developing a custom AI skill for automated prompt generation, reducing manual effort in the training phase.',
      'Conducted research on Agentic AI and emerging AI technologies, evaluating feasibility and cost-benefit trade-offs before recommending implementation decisions.',
    ],
    tags: ['AI Agents', 'Prompt Engineering', 'Agentic AI', 'Client Management'],
  },
  {
    organization: 'Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka',
    location: 'Bandung, Indonesia',
    type: 'apprenticeship',
    roles: [{ title: 'Machine Learning Cohort', period: 'Aug 2023 – Jan 2024' }],
    description: [
      'Completed intensive training in Machine Learning including supervised & unsupervised learning, computer vision, and NLP using TensorFlow.',
      'Developed and deployed ML models for real-world case studies.',
      'Gained skills in data preprocessing, visualization, and analysis using Python and Pandas.',
    ],
    tags: ['TensorFlow', 'Deep Learning', 'Computer Vision', 'NLP'],
  },
  {
    organization: 'OmahTI UGM',
    location: 'Sleman, Indonesia',
    type: 'organization',
    roles: [
      { title: 'Head of Resource Management', period: 'Jan 2023 – Dec 2023' },
      { title: 'Staff of Competitive Programming', period: 'Sep 2021 – Dec 2023' },
    ],
    description: [
      'Managed assets and resource allocation for the organization as Head of Resource Management.',
      'Participated in weekly training sessions to strengthen algorithmic thinking and problem-solving skills.',
      'Designed and curated programming problems for high school-level programming competitions.',
    ],
    tags: ['Problem Solving', 'C++', 'Resource Management', 'Leadership'],
  },
];

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
    description: 'Proposed and evaluated a hybrid architecture combining Temporal Convolutional Network (TCN) and Bidirectional Long Short-Term Memory (BiLSTM) to improve stock price prediction accuracy on the IDX30 index.',
    overview: 'This research developed a hybrid deep learning model (TCN-BiLSTM) to predict the next day\'s stock closing price based on the historical data of the previous 20 days. The model enriches the input space by combining three distinct data types: historical price data (OHLCV), technical indicators (ADX, MACD, RSI, %K), and quarterly fundamental data. Experiments were conducted on four representative stocks across different sectors in the IDX30 index (ADRO, BBCA, CPIN, TLKM) over the 2014–2024 period. The results demonstrated that the hybrid model utilizing the complete multi-source dataset achieved the best performance, yielding an average RMSE of 0.0614 and an R² of 95.33%, outperforming conventional standalone models.',
    technologies: ['Python', 'TensorFlow', 'Keras', 'Pandas', 'NumPy', 'scikit-learn', 'yfinance', 'finta', 'scipy (CubicSpline)', 'Matplotlib'],
    challenges: [
      'Synchronizing multi-source data due to differing temporal frequencies, where fundamental data is only published quarterly while stock prices and technical indicators are available daily',
      'Handling non-linear relationships and high volatility inherent in stock market data to prevent severe overfitting and numerical instability',
      'Determining the optimal combination of hyperparameters (such as window size, batch size, filters, and kernel sizes) in a hybrid architecture to balance local and global temporal feature extraction',
    ],
    solutions: [
      'Applied Cubic Spline numerical interpolation (using scipy.interpolate.CubicSpline) to smoothly stretch and align quarterly fundamental data into daily frequency intervals matching the price data',
      'Standardized all features using Z-Score Normalization to guarantee comparable scales, and incorporated Dropout layers (0.2 rate) along with residual connections within the TCN blocks',
      'Conducted systematic manual hyperparameter tuning on the validation set to discover the optimal configuration: a window size of 20, batch size of 5, 32 BiLSTM units (1 layer), 32 TCN filters with a kernel size of 7 (3 layers), and a learning rate of 0.0001',
    ],
    tags: ['Deep Learning', 'TCN', 'BiLSTM', 'Stock Price Prediction', 'Cubic Spline Interpolation'],
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
    description: 'Developed an expert system presentation concept designed to detect and diagnose depression levels among university students using uncertainty calculations.',
    overview: 'This project introduces an expert system tailored for the university environment to address mental health concerns, specifically depression among final-year college students. Operating with uncertainty via Certainty Factors (incorporating Measure of Belief [MB] and Measure of Disbelief [MD]), the system processes student-reported symptoms to calculate definitive diagnosis probabilities across four levels of depression (Mood Disorder, Mild Depression, Moderate Depression, and Severe Depression).',
    technologies: ['Expert System Theory', 'Certainty Factor Algorithm', 'UI/UX Design Mockups'],
    challenges: [
      'Quantifying subjective human psychological symptoms into precise numerical probability weights.',
      'Handling mathematical combinations of multiple overlapping symptoms that collectively point to varying degrees of depression.',
      'Designing an intuitive, non-intimidating student user interface for sensitive mental health self-assessment.',
    ],
    solutions: [
      'Mapped symptoms with specific rule bases consisting of predefined Measure of Belief (MB) and Measure of Disbelief (MD) matrices (e.g., G001 symptom mapping to P001 with MB=0.6, MD=0.2).',
      'Implemented Certainty Factor (CF) combining formulas to handle positive, negative, and mixed confidence metrics sequentially across all inputs.',
      'Designed a user-friendly survey dashboard with multi-tiered confidence option buttons ranging from "Don\'t Know" to "Certain" to seamlessly capture student sentiment inputs.',
    ],
    tags: ['Expert System', 'Certainty Factor', 'Mental Health Tech', 'Decision Support System'],
    github: 'https://github.com/Yeozekiel/sistem-pakar',
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
    live: 'https://face-to-comic.streamlit.app/',
    github: 'https://github.com/Poor1ST/convert-to-comic',
    image: 'face_to_comic.png',
  },
  {
    title: 'Sokin',
    roles: ['Frontend Developer'],
    description: 'Built a multi-role food order and delivery platform featuring real-time location tracking, live order management, and separate interfaces for customers, drivers, and merchants.',
    overview: 'A food order and delivery service app built with the refine framework on top of Next.js, serving three distinct roles: customer, driver, and merchant. Customers browse restaurants and place orders, drivers receive real-time dispatch notifications with live location tracking via Mapbox and Socket.io, and merchants manage menus and order fulfillment. The backend uses Prisma/PostgreSQL for data persistence, next-auth for authentication, and Cloudinary for image uploads.',
    technologies: ['refine', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'Socket.io', 'Mapbox GL', 'next-auth', 'Cloudinary', 'react-hook-form', 'Framer Motion'],
    challenges: [
      'Implementing real-time location tracking and order dispatch notifications across three separate user roles',
      'Managing role-based authentication and access control for customer, driver, and merchant interfaces',
      'Handling image uploads and optimizations for menu items and merchant profiles',
    ],
    solutions: [
      'Used Socket.io with separate rooms for real-time order status updates and driver location broadcasting on Mapbox',
      'Leveraged refine framework\'s built-in auth provider with next-auth and Prisma adapter to enforce role-based routing and access control',
      'Integrated Cloudinary via next-cloudinary for efficient image upload, transformation, and lazy loading',
    ],
    tags: ['refine', 'Next.js', 'Tailwind CSS', 'Real-time', 'PWA'],
    github: 'https://github.com/ferdianfefe/sokin',
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
  {
    title: 'Financial Research Agent',
    roles: ['AI Developer', 'Full Stack Developer'],
    description: 'A conversational AI agent that fetches live market data, searches financial news, queries ingested documents via RAG, and delivers structured analysis reports — built with LangChain, FastAPI, and React.',
    overview: 'A full-stack conversational AI assistant for financial analysis. Users chat to get live market data (price, RSI, SMA), search financial news, upload PDFs for RAG-based Q&A, and request structured analysis reports with directional bias, confidence levels, support/resistance levels, and risk factors. Built entirely on free-tier APIs (Groq, DuckDuckGo, yfinance).',
    technologies: ['Python', 'FastAPI', 'LangChain', 'React', 'TypeScript', 'ChromaDB', 'Groq', 'Docker'],
    challenges: [
      'Integrating multiple free-tier API services (Groq, DuckDuckGo, yfinance) into a reliable agent pipeline',
      'Implementing local RAG with ChromaDB and HuggingFace embeddings without paid vector databases',
      'Generating structured, markdown-formatted analysis reports from unstructured LLM output',
    ],
    solutions: [
      'Used LangChain ReAct agent framework with ConversationBufferWindowMemory to orchestrate tool calls across free APIs',
      'Deployed ChromaDB with sentence-transformers/all-MiniLM-L6-v2 for fully local, no-cost document retrieval',
      'Designed a structured Pydantic analysis report schema with clear agent prompts to produce consistent report formatting',
    ],
    tags: ['LangChain', 'FastAPI', 'RAG', 'LLM', 'Financial Analysis'],
    github: 'https://github.com/Poor1ST/Financial-Research-Agent',
    date: '2025-06',
    categories: ['AI', 'Front End'],
    image: 'financial_research_agent.png',
    status: 'in-progress',
  },
];
