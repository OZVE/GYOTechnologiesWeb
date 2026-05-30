import { RefObject } from 'react';

interface CursorOrbProps {
  cursorRef: RefObject<HTMLDivElement>;
}

export default function CursorOrb({ cursorRef }: CursorOrbProps) {
  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-7 w-7 rounded-full border border-[#171411]/40 bg-[#efe7da]/25 opacity-0 mix-blend-difference backdrop-blur-sm md:block"
      aria-hidden="true"
    />
  );
}
