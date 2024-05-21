import { Mail } from 'lucide-react';

export default function Footer() {
  return (
    <div className="grid grid-cols-2 bg-black min-h-12 px-4 py-2 sm:px-6 lg:px-8">
      <div className="flex items-center justify-start text-white">
        © Copyright 2024. All Rights Reserved by Sahyog Sabka.
      </div>
      <button className="flex items-center justify-end text-white"><Mail /></button>
    </div>
  );
}
