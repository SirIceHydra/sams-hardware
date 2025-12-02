import { categories } from "@/assets/assets";

const CategoriesMarquee = () => {

    return (
        <div className="overflow-hidden w-full relative max-w-7xl mx-auto select-none group sm:my-20">
            <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-[#f8fafc] to-transparent" />
            <div className="flex min-w-[200%] animate-[marqueeScroll_10s_linear_infinite] sm:animate-[marqueeScroll_40s_linear_infinite] group-hover:[animation-play-state:paused] gap-4" >
                {[...categories, ...categories, ...categories, ...categories].map((company, index) => (
                    <button key={index} className="px-5 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 text-xs sm:text-sm hover:bg-orange-500 hover:border-orange-500 hover:text-white active:scale-95 transition-all duration-300 shadow-sm">
                        {company}
                    </button>
                ))}
            </div>
            <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-[#f8fafc] to-transparent" />
        </div>
    );
};

export default CategoriesMarquee;