import React, { forwardRef } from 'react';
import ModernTechTemplate from './ModernTechTemplate';
import CorporateTemplate from './CorporateTemplate';
import StudentFresherTemplate from './StudentFresherTemplate';
import ExecutiveTemplate from './ExecutiveTemplate';
import CreativeTemplate from './CreativeTemplate';
import StartupFounderTemplate from './StartupFounderTemplate';
import PremiumDesignTemplate from './PremiumDesignTemplate';
import MinimalTemplate from './MinimalTemplate';
import ElegantTemplate from './ElegantTemplate';
import DeveloperTemplate from './DeveloperTemplate';
import HarvardTemplate from './HarvardTemplate';
import StanfordTemplate from './StanfordTemplate';
import ProductManagerTemplate from './ProductManagerTemplate';
import DesignerTemplate from './DesignerTemplate';
import ClassicBorderTemplate from './ClassicBorderTemplate';

const LivePreview = forwardRef(({ data }, ref) => {
  
  const renderTemplate = () => {
    switch(data.template) {
      case 'classic_border':
        return <ClassicBorderTemplate data={data} />;
      case 'corporate':
        return <CorporateTemplate data={data} />;
      case 'student_fresher':
        return <StudentFresherTemplate data={data} />;
      case 'executive':
        return <ExecutiveTemplate data={data} />;
      case 'creative':
        return <CreativeTemplate data={data} />;
      case 'startup_founder':
      case 'startup':
        return <StartupFounderTemplate data={data} />;
      case 'premium_design':
        return <PremiumDesignTemplate data={data} />;
      case 'minimal':
        return <MinimalTemplate data={data} />;
      case 'elegant':
        return <ElegantTemplate data={data} />;
      case 'developer':
      case 'software_engineer':
        return <DeveloperTemplate data={data} />;
      case 'harvard':
        return <HarvardTemplate data={data} />;
      case 'stanford':
        return <StanfordTemplate data={data} />;
      case 'product_manager':
        return <ProductManagerTemplate data={data} />;
      case 'designer':
        return <DesignerTemplate data={data} />;
      case 'modern_tech':
      default:
        return <ModernTechTemplate data={data} />;
    }
  };

  return (
    <div className="print-wrapper" style={{
      position: 'relative',
    }}>
      {/* Paper realistic styling wrapper */}
      <div ref={ref} className="print-container" style={{
        width: '210mm', // Exact A4 width
        minHeight: '297mm', // Exact A4 height
        backgroundColor: 'white',
        color: '#111',
        padding: '20mm', // Standard margins
        boxSizing: 'border-box',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.1)',
        fontFamily: 'sans-serif',
        borderRadius: '2px', // Very slight radius for physical paper feel
        position: 'relative',
        zIndex: 1,
        transition: 'background-color 0.3s ease',
      }}>
        {/* Subtle paper grain texture overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.015%22/%3E%3C/svg%3E")',
          pointerEvents: 'none',
          zIndex: 0
        }}></div>

        <style>
          {`
            @media print {
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              .print-wrapper { box-shadow: none !important; margin: 0 !important; padding: 0 !important; }
              .print-container { 
                width: 100% !important; 
                min-height: 100% !important; 
                padding: 0 !important; 
                box-shadow: none !important; 
                border-radius: 0 !important;
              }
              .print-container > div:first-child { display: none !important; /* Hide texture on print */ }
              @page { margin: 0; size: A4 portrait; }
            }
          `}
        </style>
        
        <div style={{ position: 'relative', zIndex: 2, height: '100%' }}>
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
});

export default LivePreview;
