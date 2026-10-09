export interface Program {
  _id: string;
  title: string;
  title_si?: string;
  slug: string;
  faculty: string;
  faculty_si?: string;
  degree: string;
  degree_si?: string;
  duration: string;
  duration_si?: string;
  description: string;
  description_si?: string;
  icon: string;
  featured: boolean;
  overview?: string;
  overview_si?: string;
  modules?: string[];
  modules_si?: string[];
  outcomes?: string[];
  outcomes_si?: string[];
  careers?: string[];
  careers_si?: string[];
  requirements?: string[];
  requirements_si?: string[];
  fees?: string;
  fees_si?: string;
  intake?: string;
  intake_si?: string;
}

export interface NewsItem {
  _id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  date: string;
  image?: string;
  author?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pages: number;
}

export interface ResearchDirector {
  _id: string;
  directorId: string;
  name: string;
  role: string;
  faculty: string;
  specialization: string;
  bio: string;
  photo: string | null;
  order: number;
}
