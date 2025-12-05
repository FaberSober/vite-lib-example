import React from 'react';
import './Button.css'; // Vite 会自动提取 CSS 到 dist/style.css

export interface ButtonProps {
  label: string;
  onClick?: () => void;
}

export const Button = ({ label, onClick }: ButtonProps) => {
  return <button className="my-btn" onClick={onClick}>{label}</button>;
};