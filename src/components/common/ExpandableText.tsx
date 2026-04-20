import { useState } from 'react';

interface ExpandableTextProps {
  text: string;
  maxLength: number;
  moreText?: string;
  lessText?: string;
}

export default function ExpandableText({
  text,
  maxLength = 150,
  moreText = 'Read More',
  lessText = 'Read Less'
}: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showText, setShowText] = useState(text.slice(0, maxLength));

  const toggleText = () => {
    if (!isExpanded) {
      setShowText(text);
    } else {
      setShowText(text.slice(0, maxLength));
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="text-jeet-gray-dark">
      <p className="mb-2">{showText}{!isExpanded && text.length > maxLength ? '...' : ''}</p>
      <button
        onClick={toggleText}
        className="text-jeet-blue hover:text-jeet-blue-dark text-sm"
      >
        {isExpanded ? lessText : moreText}
      </button>
    </div>
  );
}
