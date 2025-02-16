import React from 'react';
import './WinProbability.css';

interface WinProbabilityProps {
  probability: string;
}

export function WinProbability({ probability }: WinProbabilityProps) {
  return (
    <div className="probability">
      Win probability: {probability}%
    </div>
  );
}