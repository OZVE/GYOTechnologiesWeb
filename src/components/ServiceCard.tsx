import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, features }) => {
  return (
    <div className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="w-14 h-14 text-[#1473e6] mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold mb-4 text-[#1c1c1e]">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="w-1.5 h-1.5 bg-[#1473e6] rounded-full mt-2 mr-3 flex-shrink-0" />
            <span className="text-gray-600 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceCard;