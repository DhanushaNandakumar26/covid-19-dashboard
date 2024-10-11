// Chicklet.tsx
import React from 'react';

interface CheckletProps {
  count: number;
  label: string;
  bgColor: string;
  icon: React.ReactNode;
}

const Checklet: React.FC<CheckletProps> = ({ count, label, bgColor, icon }) => {
  return (
    <div className={`flex flex-col items-center p-4 rounded-lg text-gray-300 ${bgColor}`}>
      <div className="text-3xl">{icon}</div>
      <div className="mt-2 text-sm font-bold">{count}</div>
      <div className="text-xs">{label}</div>
    </div>
  );
};

export default Checklet;
