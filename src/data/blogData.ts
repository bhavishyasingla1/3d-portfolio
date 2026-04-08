export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTime: number;
}

export interface BlogCategory {
  name: string;
  description: string;
}

export const blogPosts: BlogPost[] = [];

export const blogCategories: BlogCategory[] = [];
