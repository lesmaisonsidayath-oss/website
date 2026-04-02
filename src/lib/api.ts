const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}/api${endpoint}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60 },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

// ── Types API ──
export interface ApiProperty {
  id: number;
  title: string;
  slug: string;
  description: string;
  type: 'location' | 'location_meublee' | 'vente';
  category: string;
  status: string;
  price: number;
  surface: number;
  rooms: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  city: string;
  neighborhood: string | null;
  address: string | null;
  features: string[];
  is_visible: boolean;
  is_featured: boolean;
  images: { id: number; url: string; is_main: boolean }[];
  main_image_url: string | null;
  created_at: string;
}

export interface ApiFormation {
  id: number;
  title: string;
  slug: string;
  description: string;
  topics: string[];
  instructor: string;
  duration: string;
  format: string;
  level: string;
  price: number;
  date: string | null;
  image_url: string | null;
}

export interface ApiBlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image_url: string | null;
  is_published: boolean;
  published_at: string | null;
  creator: { name: string } | null;
}

export interface ApiTestimonial {
  id: number;
  name: string;
  role: string | null;
  content: string;
  rating: number;
  avatar_url: string | null;
}

export interface ApiNavigationItem {
  id: number;
  label: string;
  href: string;
  parent_id: number | null;
  sort_order: number;
  children: ApiNavigationItem[];
}

export interface ApiContactSettings {
  phone: string;
  phone_secondary: string | null;
  email: string;
  email_secondary: string | null;
  address: string;
  city: string;
  whatsapp: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  linkedin_url: string | null;
  tiktok_url: string | null;
  hours_weekday: string | null;
  hours_weekend: string | null;
  google_maps_embed: string | null;
}

// ── API calls ──
export async function getProperties(params?: Record<string, string>): Promise<ApiProperty[]> {
  const query = params ? '?' + new URLSearchParams(params).toString() : '';
  const res = await fetchApi<{ data: ApiProperty[] }>(`/properties${query}`);
  return res.data;
}

export async function getProperty(slug: string): Promise<ApiProperty> {
  const res = await fetchApi<{ data: ApiProperty }>(`/properties/${slug}`);
  return res.data;
}

export async function getFormations(): Promise<ApiFormation[]> {
  const res = await fetchApi<{ data: ApiFormation[] }>('/formations');
  return res.data;
}

export async function getBlogPosts(): Promise<ApiBlogPost[]> {
  const res = await fetchApi<{ data: ApiBlogPost[] }>('/blog');
  return res.data;
}

export async function getBlogPost(slug: string): Promise<ApiBlogPost> {
  const res = await fetchApi<{ data: ApiBlogPost }>(`/blog/${slug}`);
  return res.data;
}

export async function getTestimonials(): Promise<ApiTestimonial[]> {
  const res = await fetchApi<{ data: ApiTestimonial[] }>('/testimonials');
  return res.data;
}

export async function getNavigation(): Promise<ApiNavigationItem[]> {
  const res = await fetchApi<{ data: ApiNavigationItem[] }>('/navigation');
  return res.data;
}

export async function getContactSettings(): Promise<ApiContactSettings> {
  const res = await fetchApi<{ data: ApiContactSettings }>('/contact-settings');
  return res.data;
}

export async function sendContactMessage(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<void> {
  await fetchApi('/contact-messages', {
    method: 'POST',
    body: JSON.stringify(data),
    next: undefined,
  });
}

// ── Helper: format price ──
export function formatPrice(price: number, type: 'location' | 'location_meublee' | 'vente'): string {
  const formatted = new Intl.NumberFormat('fr-FR').format(price);
  return type === 'location' || type === 'location_meublee' ? `${formatted} FCFA/mois` : `${formatted} FCFA`;
}
