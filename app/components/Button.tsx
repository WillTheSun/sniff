import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    useRegularFont?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', useRegularFont = false, ...props }) => {
    const baseStyle = "font-medium p-2 rounded-lg shadow-md text-sm";
    const variantStyle = variant === 'primary'
        ? "bg-[#333333] hover:bg-[#444444] text-white"
        : "bg-[#FFE5D9] hover:bg-[#FFD0BA] text-[#333333]";
    const buttonStyle = useRegularFont ? {} : {
        fontFamily: 'Courier, monospace',
        letterSpacing: '-0.05em'
    };

    return (
        <button
            className={`${baseStyle} ${variantStyle} ${className}`}
            style={buttonStyle}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
