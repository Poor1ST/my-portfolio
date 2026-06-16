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
