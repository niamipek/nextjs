const iconStyle = {
  width: 22,
  height: 22,
  color: "#8ea1bc",
  flexShrink: 0,
};

export function GoogleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M21.6 12.23c0-.74-.06-1.28-.2-1.84H12v3.45h5.52c-.11.86-.72 2.16-2.08 3.03l-.02.12 3.03 2.35.21.02c1.92-1.76 2.94-4.34 2.94-7.13Z" fill="#4285F4" />
      <path d="M12 22c2.7 0 4.97-.89 6.62-2.42l-3.15-2.45c-.84.59-1.98 1.01-3.47 1.01-2.64 0-4.88-1.76-5.67-4.19l-.12.01-3.15 2.44-.04.11A9.99 9.99 0 0 0 12 22Z" fill="#34A853" />
      <path d="M6.33 13.95A5.97 5.97 0 0 1 6 12c0-.68.12-1.33.32-1.95l-.01-.13L3.11 7.44l-.1.05A10 10 0 0 0 2 12c0 1.62.39 3.14 1.07 4.49l3.26-2.54Z" fill="#FBBC05" />
      <path d="M12 5.86c1.87 0 3.13.8 3.84 1.47l2.8-2.74C16.96 3.03 14.7 2 12 2a9.99 9.99 0 0 0-8.98 5.49l3.42 2.44C7.25 7.62 9.38 5.86 12 5.86Z" fill="#EA4335" />
    </svg>
  );
}

export function GithubIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 19c-4 1.3-4-2-6-2m12 4v-3.35a2.9 2.9 0 0 0-.8-2.25c2.66-.3 5.46-1.3 5.46-5.9a4.6 4.6 0 0 0-1.25-3.2 4.3 4.3 0 0 0-.08-3.17s-1-.32-3.3 1.23a11.2 11.2 0 0 0-6 0C6.72 2.8 5.72 3.12 5.72 3.12a4.3 4.3 0 0 0-.08 3.17 4.6 4.6 0 0 0-1.25 3.2c0 4.58 2.78 5.6 5.44 5.9A2.9 2.9 0 0 0 9 17.64V21" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function UserIcon() {
  return (
    <svg style={iconStyle} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M16 19a4 4 0 0 0-8 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg style={iconStyle} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg style={iconStyle} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="10" width="16" height="10" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 10V8a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function EyeIcon() {
  return (
    <svg style={iconStyle} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
