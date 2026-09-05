import React from 'react';
import { motion } from 'motion/react';
import { 
  Instagram, 
  ExternalLink, 
  Check, 
  Star, 
  MoreHorizontal, 
  TrendingUp, 
  Quote,
  ChevronRight,
  ArrowUpRight,
  Facebook
} from 'lucide-react';
import { TestimonialItem } from '../types';

interface InstagramTestimonialCardProps {
  testimonial: TestimonialItem;
  index: number;
}

export const InstagramTestimonialCard: React.FC<InstagramTestimonialCardProps> = ({ 
  testimonial, 
  index 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative rounded-2xl md:rounded-3xl overflow-hidden bg-[#0c0c0e] text-white border border-stone-800/90 shadow-xl hover:border-[#a8854f]/50 hover:shadow-2xl hover:shadow-[#a8854f]/10 transition-all duration-300 flex flex-col justify-between"
    >
      {/* Subtle luxury background radial light */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#a8854f]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Instagram Window Bar */}
      <div className="relative z-10 px-5 pt-4 pb-3 flex items-center justify-between border-b border-stone-800/80 bg-stone-900/40 backdrop-blur-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center p-0.5">
            <div className="w-full h-full bg-[#0c0c0e] rounded-full flex items-center justify-center">
              <Instagram className="w-3 h-3 text-white" />
            </div>
          </div>
          <a
            href={testimonial.profileLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold font-mono tracking-tight text-stone-200 hover:text-amber-400 transition-colors flex items-center gap-1.5"
          >
            <span>{testimonial.handle}</span>
            {testimonial.isVerified && (
              <span className="w-3.5 h-3.5 bg-[#0095f6] rounded-full inline-flex items-center justify-center shadow-xs">
                <Check className="w-2 h-2 text-white stroke-[3.5]" />
              </span>
            )}
          </a>
        </div>

        <div className="flex items-center gap-2 text-stone-400">
          <a
            href={testimonial.profileLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 hover:text-white transition-colors"
            title="View Profile on Instagram"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <MoreHorizontal className="w-4 h-4 text-stone-500" />
        </div>
      </div>

      {/* Instagram Profile Body */}
      <div className="relative z-10 p-5 md:p-6 pb-4">
        {/* Avatar + Stats Row */}
        <div className="flex items-start gap-4">
          {/* Circular Avatar with Gradient Story Ring */}
          <div className="relative shrink-0">
            <div className="p-[2.5px] rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] group-hover:scale-105 transition-transform duration-300">
              <div className="p-0.5 bg-[#0c0c0e] rounded-full">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name} - ${testimonial.profession} personal branding client at TheFusionMedia`}
                  width="72"
                  height="72"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 md:w-18 md:h-18 rounded-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-[#0c0c0e] flex items-center justify-center shadow-xs">
              <Check className="w-3 h-3 text-white stroke-[3]" />
            </div>
          </div>

          {/* User Name, Profession & Exact Stats */}
          <div className="flex-1 min-w-0 text-left">
            <h3 className="text-sm md:text-base font-bold text-white tracking-tight leading-snug truncate">
              {testimonial.name}
            </h3>
            <p className="text-[11px] font-medium text-[#c4a47a] truncate mb-2.5">
              {testimonial.profession}
            </p>

            {/* Exact Instagram Stats Columns (Posts / Followers / Following) */}
            <div className="flex items-center gap-3 md:gap-4 pt-1.5 border-t border-stone-800/80 text-left">
              <div>
                <span className="block text-xs font-bold text-white font-mono">{testimonial.postsCount}</span>
                <span className="block text-[9.5px] text-stone-400 font-medium">posts</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-white font-mono">{testimonial.followersCount}</span>
                <span className="block text-[9.5px] text-stone-400 font-medium">followers</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-white font-mono">{testimonial.followingCount}</span>
                <span className="block text-[9.5px] text-stone-400 font-medium">following</span>
              </div>
            </div>
          </div>
        </div>

        {/* Instagram Bio Box */}
        <div className="mt-4 p-3 rounded-xl bg-stone-900/70 border border-stone-800/70 text-left text-[11px] leading-relaxed text-stone-300 font-sans space-y-0.5">
          {testimonial.bioLines.map((line, lIdx) => {
            if (line.includes('flerro.in') || line.startsWith('🔗')) {
              return (
                <div key={lIdx} className="truncate text-stone-300 font-normal flex items-center gap-1.5 pt-0.5">
                  <a 
                    href="https://flerro.in" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#3897f0] font-semibold inline-flex items-center gap-1 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>🔗</span>
                    <span>flerro.in</span>
                  </a>
                  <span className="text-[10px] text-stone-400">and 1 more</span>
                </div>
              );
            }

            if (line.toLowerCase().includes('facebook')) {
              const account = line.replace(/Facebook:?/i, '').trim();
              return (
                <div key={lIdx} className="truncate text-stone-300 font-normal flex items-center gap-1.5 pt-0.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#1877F2] inline-flex items-center justify-center text-white shrink-0">
                    <Facebook className="w-2.5 h-2.5 fill-white text-[#1877F2]" />
                  </span>
                  <span className="text-[#3897f0] font-medium">{account}</span>
                </div>
              );
            }

            // Highlight @mentions in Instagram blue/gold style
            const parts = line.split(/(@[a-zA-Z0-9_.]+)/g);
            return (
              <div key={lIdx} className="truncate text-stone-300 font-normal">
                {parts.map((part, pIdx) => 
                  part.startsWith('@') ? (
                    <span key={pIdx} className="text-[#3897f0] font-medium hover:underline cursor-pointer">
                      {part}
                    </span>
                  ) : (
                    part
                  )
                )}
              </div>
            );
          })}
        </div>

        {/* Verified Instagram Insights Snapshot (From Screenshot 2) */}
        {testimonial.insights && (
          <div className="mt-3 p-3 rounded-xl bg-[#09090b] border border-stone-800 text-left font-sans">
            <div className="flex items-center justify-between text-[10px] text-stone-400 font-medium mb-2.5 pb-2 border-b border-stone-800/80">
              <span className="font-bold text-stone-200 uppercase tracking-wider text-[9.5px] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Insights
              </span>
              <span className="font-mono text-[9.5px] text-stone-400 font-medium bg-stone-800/60 px-2 py-0.5 rounded">
                {testimonial.insights.period}
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <div className="p-1.5 rounded-lg bg-stone-900/50 border border-stone-800/60">
                <span className="block text-[9px] text-stone-400 font-medium mb-0.5">Views</span>
                <span className="text-xs font-bold text-emerald-400 font-mono flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3 text-emerald-400 inline" />
                  {testimonial.insights.views}
                </span>
              </div>
              <div className="p-1.5 rounded-lg bg-stone-900/50 border border-stone-800/60">
                <span className="block text-[9px] text-stone-400 font-medium mb-0.5">New followers</span>
                <span className="text-xs font-bold text-emerald-400 font-mono flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3 text-emerald-400 inline" />
                  {testimonial.insights.newFollowers}
                </span>
              </div>
              <div className="p-1.5 rounded-lg bg-stone-900/50 border border-stone-800/60">
                <span className="block text-[9px] text-stone-400 font-medium mb-0.5">Growth %</span>
                <span className="text-xs font-bold text-emerald-400 font-mono flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3 text-emerald-400 inline" />
                  {testimonial.insights.growthPercentage}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Short & Impactful Client Feedback Quote */}
        <div className="mt-3 p-3.5 rounded-xl bg-gradient-to-b from-[#18181b]/90 to-[#121214]/90 border border-stone-700/60 text-left relative">
          <div className="flex items-center justify-between mb-2">
            {/* 5 Golden Stars */}
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, sIdx) => (
                <Star key={sIdx} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <Quote className="w-3 h-3 text-[#a8854f] rotate-180 opacity-80" />
          </div>
          <p className="text-xs md:text-[12.5px] text-stone-200 italic font-medium leading-relaxed">
            {testimonial.quote}
          </p>
        </div>
      </div>

      {/* Bottom Growth & Reach Proof Bar (Requested: 'in 1 month 5 m organic reach 85% grow') */}
      <div className="relative z-10 px-4 py-3 bg-gradient-to-r from-stone-900/95 via-[#181613] to-stone-900/95 border-t border-stone-800 flex items-center justify-between text-left">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-400 shrink-0">
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="block text-[10.5px] font-bold text-amber-300 font-mono tracking-wide">
              {testimonial.metricBadge}
            </span>
            <span className="block text-[9px] text-stone-400 font-medium">
              Verified Brand Scale by Fusion Media
            </span>
          </div>
        </div>

        <span className="hidden sm:inline-block px-2.5 py-1 rounded-md bg-stone-800/90 border border-stone-700/80 text-[10px] font-bold font-mono text-emerald-400 shrink-0">
          {testimonial.subMetric}
        </span>
      </div>
    </motion.div>
  );
};
