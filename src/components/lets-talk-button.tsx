// import { ArrowRight } from 'lucide-react';
// import Link from 'next/link';

// interface LetsTalkButtonProps {
//   href?: string;
//   className?: string;
// }

// export default function LetsTalkButton({ href = '/contact', className }: LetsTalkButtonProps) {
//   return (
//     <Link
//       href={href}
//       className={`
//         group
//         relative
//         inline-flex
//         items-center
//         justify-between
//         rounded-full
//         bg-black
//         px-20
//         py-4
//         text-sm
//         font-medium
//         text-white
//         ${className}
//       `}
//     >
//       {/* Text */}
//       <span
//         className={`
//           text-base
//           font-[degularRegular]
//           transition-transform
//           duration-300
//           ease-in-out
//           group-hover:translate-x-4
//         `}
//       >
//         Let&apos;s talk
//       </span>

//       {/* Circle with Arrow */}
//       <div
//         className={`
//           absolute
//           flex
//           items-center
//           justify-center
//           w-12
//           h-12
//           border
//           border-white
//           rounded-full
//           right-1
//           transition-transform
//           duration-300
//           ease-in-out
//           group-hover:left-1
//           group-hover:right-auto
//         `}
//       >
//         <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0" />
//       </div>
//     </Link>
//   );
// }
