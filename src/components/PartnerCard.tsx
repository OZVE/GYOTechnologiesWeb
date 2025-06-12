interface PartnerCardProps {
  logo: string;
  name: string;
  description: string;
  link?: string;
}

const PartnerCard = ({
  logo,
  name,
  description,
  link
}: PartnerCardProps) => {
  const content = (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col items-center text-center">
      <div className="w-32 h-32 mb-4 flex items-center justify-center">
        <img
          src={logo}
          alt={name}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <h3 className="text-xl mb-2">{name}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );

  return link ? (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block"
    >
      {content}
    </a>
  ) : content;
};

export default PartnerCard; 