import React from 'react';

interface BrandNameProps {
    className?: string;
    text?: string;
}

const BrandName: React.FC<BrandNameProps> = ({ className = '', text = 'vibe check mate' }) => {
    const brandStyle = {
        fontFamily: 'Courier, monospace',
        letterSpacing: '-0.05em'
    };

    return (
        <span className={className} style={brandStyle}>
            {text}
        </span>
    );
};

export default BrandName;
