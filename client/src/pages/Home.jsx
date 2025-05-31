import React from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    { text: 'Create Resume', path: '/create-resume' },
    { text: 'Tailor Resume', path: '/tailor-resume' },
    { text: 'Create Cover Letter', path: '/cover-letter' },
    { text: 'ATS Scanner', path: '/ats-scan' },
    { text: 'Bullet Point Generator', path: '/bullet-points' },
    { text: 'Download Center', path: '/downloads' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl w-full p-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Smart Resume Builder
        </h1>
        <div className="grid grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Button
              key={index}
              text={feature.text}
              onClick={() => navigate(feature.path)}
              className="w-full text-center"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home; 