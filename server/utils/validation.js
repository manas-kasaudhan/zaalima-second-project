function normalizeEmail(email = '') {
  return String(email).trim().toLowerCase();
}

function validateAuthPayload({ username, email, password }, { requireUsername = false } = {}) {
  const normalizedEmail = normalizeEmail(email);
  const trimmedUsername = typeof username === 'string' ? username.trim() : '';
  const normalizedPassword = typeof password === 'string' ? password : '';

  if (requireUsername && trimmedUsername.length < 2) {
    return { error: 'Username must be at least 2 characters long.' };
  }

  if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return { error: 'Please provide a valid email address.' };
  }

  if (normalizedPassword.length < 8) {
    return { error: 'Password must be at least 8 characters long.' };
  }

  return {
    value: {
      username: trimmedUsername,
      email: normalizedEmail,
      password: normalizedPassword,
    },
  };
}

function validateProjectInput({ title, prompt }, { requirePrompt = true } = {}) {
  const normalizedTitle = typeof title === 'string' ? title.trim() : '';
  const normalizedPrompt = typeof prompt === 'string' ? prompt.trim() : '';

  if (requirePrompt && !normalizedPrompt) {
    return { error: 'Prompt is required.' };
  }

  if (normalizedPrompt.length > 5000) {
    return { error: 'Prompt is too long. Keep it under 5000 characters.' };
  }

  if (normalizedTitle.length > 120) {
    return { error: 'Project title is too long. Keep it under 120 characters.' };
  }

  return {
    value: {
      title: normalizedTitle,
      prompt: normalizedPrompt,
    },
  };
}

module.exports = {
  normalizeEmail,
  validateAuthPayload,
  validateProjectInput,
};
