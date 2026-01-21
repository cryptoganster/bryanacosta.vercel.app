export function TimelineLine() {
  return (
    <div 
      className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 md:-translate-x-1/2 z-0"
      aria-hidden="true"
    >
      {/* Base gradient line */}
      <div className="h-full w-full bg-gradient-to-b from-gray-800 via-[#4C02FB] to-gray-800 opacity-30" />
      
      {/* Animated flowing overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#4C02FB] to-transparent opacity-70 h-full w-full blur-[1px]"
        style={{
          backgroundSize: '100% 200%',
          animation: 'flow 10s linear infinite',
        }}
      />
    </div>
  )
}
