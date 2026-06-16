import type { Experience } from '@/lib/types';

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
