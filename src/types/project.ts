export type Project = {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  image?: string;
  videoUrl?: string;
  featured?: boolean;
};
