import React from 'react';

function CuteCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full rounded overflow-hidden shadow-lg border-2 border-gray-200 p-5 bg-white">
      {children}
    </div>
  );
}

export default CuteCard;
