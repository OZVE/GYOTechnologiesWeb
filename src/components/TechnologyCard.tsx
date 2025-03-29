import React from 'react';

interface TechnologyCardProps {
  name: string;
  description: string;
  icon: React.ReactNode;
}

const TechnologyCard = ({ name, description, icon }: TechnologyCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="text-black mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default TechnologyCard;