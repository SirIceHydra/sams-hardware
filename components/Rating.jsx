'use client'
import React from "react";

const Rating = ({ value = 4, size = 'default' }) => {
    const dotSize = size === 'small' ? 'w-1.5 h-1.5' : 'w-2.5 h-2.5'
    const gapSize = size === 'small' ? 'gap-1' : 'gap-1.5'

    return (
        <div className={`flex items-center ${gapSize}`}>
            {Array.from({ length: 5 }, (_, i) => (
                <div 
                    key={i}
                    className={`${dotSize} rounded-full transition-all duration-200 ${
                        value > i 
                            ? 'bg-[var(--te-yellow)]' 
                            : 'bg-[var(--te-grey-200)]'
                    }`}
                    style={value > i ? { 
                        boxShadow: '0 0 8px var(--te-yellow-glow)' 
                    } : {}}
                />
            ))}
        </div>
    );
};

export default Rating;
