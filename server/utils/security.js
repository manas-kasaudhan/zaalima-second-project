/**
 * Simple sanitization to prevent common malicious patterns in generated code.
 * This is a basic version and should be expanded for production.
 */
function sanitizeGeneratedCode(filesJson) {
  const maliciousPatterns = [
    /eval\(/g,
    /new Function\(/g,
    /XMLHttpRequest/g, // Prefer fetch
    /document\.cookie/g,
    /localStorage/g, // Use chrome.storage instead
    /sessionStorage/g,
    /inline-script/g,
  ];

  const sanitizedFiles = { ...filesJson };

  for (const [filename, content] of Object.entries(sanitizedFiles)) {
    if (typeof content === 'string') {
      let cleanContent = content;
      
      // We don't want to block everything, but we can warn or flag.
      // For this MVP, we'll just log if we find something suspicious.
      maliciousPatterns.forEach(pattern => {
        if (pattern.test(cleanContent)) {
          console.warn(`Suspicious pattern ${pattern} found in ${filename}`);
        }
      });
    }
  }

  return sanitizedFiles;
}

module.exports = { sanitizeGeneratedCode };
