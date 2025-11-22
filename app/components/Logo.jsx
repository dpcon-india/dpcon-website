import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link href="/" className="flex flex-col group">
      <div className="flex items-center gap-1">
        <Image src="/dpconlogo.png" alt="DPCON Logo" width={40} height={40} className="object-contain" />
        <h1 className="text-xl font-semibold tracking-wide text-black uppercase">
          DPCON
        </h1>
      </div>
      <p className="ml-2 text-[10px] text-gray-600 tracking-[0.04em]">
        Engineers India Pvt Ltd
      </p>
    </Link>
  );
}
