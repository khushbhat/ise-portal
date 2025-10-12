const API_URL = 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  login: async (email: string, password: string, role: 'hod' | 'faculty' = 'hod') => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    });
  },
};

// Faculty Users API
export const facultyUsersAPI = {
  getAll: async () => apiCall('/faculty-users'),
  create: async (data: any) => apiCall('/faculty-users', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: async (id: number, data: any) => apiCall(`/faculty-users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: async (id: number) => apiCall(`/faculty-users/${id}`, {
    method: 'DELETE',
  }),
};

// Settings API
export const settingsAPI = {
  get: async (key: string) => apiCall(`/settings/${key}`),
  update: async (key: string, value: string) => apiCall(`/settings/${key}`, {
    method: 'PUT',
    body: JSON.stringify({ value }),
  }),
};

// Home API
export const homeAPI = {
  get: async () => apiCall('/home'),
  update: async (data: any) => apiCall('/home', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// Announcements API
export const announcementsAPI = {
  getAll: async () => apiCall('/announcements'),
  create: async (data: any) => apiCall('/announcements', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  delete: async (id: number) => apiCall(`/announcements/${id}`, {
    method: 'DELETE',
  }),
};

// About API
export const aboutAPI = {
  get: async () => apiCall('/about'),
  update: async (data: any) => apiCall('/about', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// Faculty API
export const facultyAPI = {
  getAll: async () => apiCall('/faculty'),
  getById: async (id: number) => apiCall(`/faculty/${id}`),
  create: async (data: any) => apiCall('/faculty', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: async (id: number, data: any) => apiCall(`/faculty/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: async (id: number) => apiCall(`/faculty/${id}`, {
    method: 'DELETE',
  }),
};

// Research API
export const researchAPI = {
  getAll: async () => apiCall('/research'),
  create: async (data: any) => apiCall('/research', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: async (id: number, data: any) => apiCall(`/research/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: async (id: number) => apiCall(`/research/${id}`, {
    method: 'DELETE',
  }),
};

// Events API
export const eventsAPI = {
  getAll: async () => apiCall('/events'),
  create: async (data: any) => apiCall('/events', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: async (id: number, data: any) => apiCall(`/events/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: async (id: number) => apiCall(`/events/${id}`, {
    method: 'DELETE',
  }),
};

// Achievements API
export const achievementsAPI = {
  getAll: async () => apiCall('/achievements'),
  create: async (data: any) => apiCall('/achievements', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: async (id: number, data: any) => apiCall(`/achievements/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: async (id: number) => apiCall(`/achievements/${id}`, {
    method: 'DELETE',
  }),
};

// Activities API
export const activitiesAPI = {
  getAll: async () => apiCall('/activities'),
  create: async (data: any) => apiCall('/activities', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: async (id: number, data: any) => apiCall(`/activities/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: async (id: number) => apiCall(`/activities/${id}`, {
    method: 'DELETE',
  }),
};

// BOS API
export const bosAPI = {
  getAll: async () => apiCall('/bos'),
  create: async (data: any) => apiCall('/bos', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: async (id: number, data: any) => apiCall(`/bos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: async (id: number) => apiCall(`/bos/${id}`, {
    method: 'DELETE',
  }),
};

// BOE API
export const boeAPI = {
  getAll: async () => apiCall('/boe'),
  create: async (data: any) => apiCall('/boe', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: async (id: number, data: any) => apiCall(`/boe/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: async (id: number) => apiCall(`/boe/${id}`, {
    method: 'DELETE',
  }),
};

// Resources API
export const resourcesAPI = {
  getAll: async () => apiCall('/resources'),
  create: async (data: any) => apiCall('/resources', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: async (id: number, data: any) => apiCall(`/resources/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: async (id: number) => apiCall(`/resources/${id}`, {
    method: 'DELETE',
  }),
};
