import type { SkillGroup } from './types';

export const skills: SkillGroup[] = [
  { label: 'Languages', items: ['Java', 'TypeScript', 'Python', 'JavaScript'] },
  { label: 'Backend', items: ['Spring Boot', 'Hono', 'FastAPI', 'REST', 'GraphQL', 'Microservices', 'Kafka', 'JPA/Hibernate'] },
  { label: 'Frontend', items: ['React', 'Next.js', 'Angular', 'Flutter', 'Material UI'] },
  { label: 'Data', items: ['PostgreSQL', 'MySQL', 'SQLite', 'Redis', 'S3', 'Cloudflare D1', 'Cloudflare R2', 'Cloudflare KV'] },
  {
    label: 'Cloud & DevOps',
    items: ['AWS', 'Cloudflare Workers', 'Kubernetes', 'OpenShift', 'Docker', 'Terraform', 'Jenkins', 'GitHub Actions', 'GitLab CI/CD'],
  },
  { label: 'Testing & observability', items: ['JUnit', 'Mockito', 'Vitest', 'Playwright', 'Cypress', 'SonarQube', 'ELK', 'Grafana', 'Prometheus'] },
  { label: 'AI engineering', items: ['Agent orchestration', 'Agent memory', 'Human-in-the-loop pipelines', 'OpenAI API', 'Ollama'] },
  {
    label: 'Tools I use with agents',
    items: ['Claude Code', 'Codex', 'Gemini CLI', 'Cursor', 'Hermes Agent', 'GitHub Copilot'],
  },
];
