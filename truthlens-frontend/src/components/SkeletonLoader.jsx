export default function SkeletonLoader({ rows = 4 }) {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className={`h-4 bg-gray-200 rounded ${i % 3 === 0 ? 'w-3/4' : i % 2 === 0 ? 'w-full' : 'w-5/6'}`} />
      ))}
    </div>
  );
}
