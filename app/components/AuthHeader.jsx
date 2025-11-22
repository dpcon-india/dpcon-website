import Link from 'next/link';

export default function AuthHeader({ currentPage, title }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
        <Link href="/" className="hover:text-[#00296b] transition-colors">Home</Link>
        <span>/</span>
        <span className="text-[#00296b]">{currentPage}</span>
      </div>
      <h1 className="text-3xl font-light text-[#00296b] tracking-tight">{title}</h1>
    </div>
  );
}
