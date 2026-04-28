import React from 'react';
import heroVideo from '../../assets/Smooth_video_transitioning_202604061148.mp4';

const VideoCarousel = () => {
  return (
    <div className="relative w-full h-60 overflow-hidden rounded-none mt-0 shadow-xl border-y border-white/5 transition-all">
      <video
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover dark:grayscale-[0.1]"
      />
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
    </div>
  );
};

export default VideoCarousel;
