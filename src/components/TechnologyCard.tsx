import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface TechnologyCardProps {
  icon: React.ReactNode;
  title: string;
  technologies: string[];
}

const TechnologyCard: React.FC<TechnologyCardProps> = ({ icon, title, technologies }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
      <div className="w-12 h-12 text-[#1473e6] mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-4 text-[#1c1c1e]">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechnologyCard;