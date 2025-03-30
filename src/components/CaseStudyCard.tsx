import React from 'react';

interface CaseStudyCardProps {
  image: string;
  title: string;
  challenge: string;
  solution: string;
  result: string;
  link?: string; // Optional link for the case study
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  image,
  title,
  challenge,
  solution,
  result,
  link
}) => {
  const titleElement = link ? (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-xl font-semibold mb-4 text-[#1c1c1e] hover:text-[#1473e6] transition-colors duration-200"
    >
      {title}
    </a>
  ) : (
    <h3 className="text-xl font-semibold mb-4 text-[#1c1c1e]">{title}</h3>
  );

  const imageElement = link ? (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block h-48 overflow-hidden"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
      />
    </a>
  ) : (
    <div className="h-48 overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
      />
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {imageElement}
      <div className="p-6">
        {titleElement}
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-[#1473e6]">Desafío</p>
            <p className="text-gray-600">{challenge}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-[#1473e6]">Solución</p>
            <p className="text-gray-600">{solution}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-[#1473e6]">Resultado</p>
            <p className="text-gray-600">{result}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyCard;