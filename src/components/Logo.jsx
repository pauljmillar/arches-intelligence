export default function Logo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M10 52 V20 c0-3.5 4.5-4.5 6.5-1.2 L32 42 47.5 18.8 C49.5 15.5 54 16.5 54 20 V52"
        stroke="#FFC72C"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
