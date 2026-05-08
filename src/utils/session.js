export function getStoredToken() {
  return localStorage.getItem('extensio_token');
}

export function getStoredUser() {
  const storedUser = localStorage.getItem('extensio_user');

  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser);
  } catch {
    clearSession();
    return null;
  }
}

export function saveSession({ token, user }) {
  localStorage.setItem('extensio_token', token);
  localStorage.setItem('extensio_user', JSON.stringify(user));
  window.dispatchEvent(new Event('extensio-auth-changed'));
}

export function clearSession() {
  localStorage.removeItem('extensio_token');
  localStorage.removeItem('extensio_user');
  window.dispatchEvent(new Event('extensio-auth-changed'));
}
