import { Github, Linkedin, MessageCircle } from 'lucide-react';
import { URLS } from './urls';

export const SOCIAL_LINKS = {
  github: {
    url: URLS.github,
    label: 'GitHub',
    icon: Github,
  },
  linkedin: {
    url: URLS.linkedin,
    label: 'LinkedIn',
    icon: Linkedin,
  },
  whatsapp: {
    url: URLS.whatsapp,
    label: 'WhatsApp',
    icon: MessageCircle,
  },
} as const;
