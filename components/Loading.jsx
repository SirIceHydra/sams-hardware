'use client'

const Loading = () => {

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-[var(--te-cream)] gap-4'>
            {/* Spinning ring */}
            <div className='w-10 h-10 rounded-full border-2 border-[var(--te-grey-200)] border-t-[var(--te-yellow)] animate-spin' />
            
            {/* Loading text */}
            <div className='flex flex-col items-center gap-1'>
                <span className='text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.3em] uppercase'>Loading</span>
                {/* LED indicator dots */}
                <div className='flex gap-1.5 mt-1'>
                    {[0, 1, 2].map((i) => (
                        <div 
                            key={i}
                            className='w-1.5 h-1.5 rounded-full bg-[var(--te-yellow)] animate-pulse'
                            style={{ 
                                animationDelay: `${i * 0.2}s`,
                                boxShadow: '0 0 6px var(--te-yellow-glow)'
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Loading