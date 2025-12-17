'use client'

import React, { useState } from 'react'
import { XIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const RatingModal = ({ ratingModal, setRatingModal }) => {

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    const handleSubmit = async () => {
        if (rating < 0 || rating > 5) {
            return toast('Please select a rating');
        }
        if (review.length < 5) {
            return toast('Write a short review');
        }

        setRatingModal(null);
    }

    return (
        <div className='fixed inset-0 z-[120] flex items-center justify-center bg-[var(--te-dark)]/80 backdrop-blur-sm p-4'>
            <div className='bg-[var(--te-white)] p-6 rounded-sm border border-[var(--te-grey-200)] w-full max-w-sm relative'>
                <button onClick={() => setRatingModal(null)} className='absolute top-4 right-4 text-[var(--te-grey-400)] hover:text-[var(--te-orange)] transition-colors'>
                    <XIcon size={18} />
                </button>
                
                <div className="mb-6">
                    <h2 className='text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest'>Rate Product</h2>
                    <div className="w-12 h-[2px] bg-[var(--te-orange)] mt-2" />
                </div>
                
                {/* Rating dots - clickable LED style */}
                <div className='flex items-center justify-center gap-3 mb-6'>
                    {Array.from({ length: 5 }, (_, i) => (
                        <button
                            key={i}
                            type="button"
                            className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                                rating > i 
                                    ? 'bg-[var(--te-green)] border-[var(--te-green)]' 
                                    : 'bg-[var(--te-cream)] border-[var(--te-grey-200)] hover:border-[var(--te-grey-300)]'
                            }`}
                            style={rating > i ? { boxShadow: '0 0 12px var(--te-green)' } : {}}
                            onClick={() => setRating(i + 1)}
                        >
                            <span className={`text-xs font-bold font-[family-name:var(--font-jetbrains)] ${rating > i ? 'text-white' : 'text-[var(--te-grey-400)]'}`}>
                                {i + 1}
                            </span>
                        </button>
                    ))}
                </div>
                
                <textarea
                    className='w-full p-3 border border-[var(--te-grey-200)] rounded-sm mb-4 focus:outline-none focus:border-[var(--te-orange)] transition-colors bg-[var(--te-white)] text-[var(--te-dark)] placeholder-[var(--te-grey-300)] text-sm font-medium tracking-wide resize-none'
                    placeholder='Write your review (optional)'
                    rows='4'
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                ></textarea>
                
                <button 
                    onClick={e => toast.promise(handleSubmit(), { loading: 'Submitting...' })} 
                    className='w-full bg-[var(--te-orange)] text-white py-3 rounded-sm hover:bg-[var(--te-dark)] active:scale-[0.98] transition-all font-bold tracking-widest uppercase text-xs'
                    style={{ boxShadow: '0 3px 0 rgba(200, 60, 0, 0.4)' }}
                >
                    Submit Rating
                </button>
            </div>
        </div>
    )
}

export default RatingModal
