'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
const Crumbs = () => {
  const pathname = usePathname();

  // Split the pathname into segments
  const pathSegments = pathname.split('/').filter(Boolean);

  // Generate breadcrumb links
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    return { label: segment, path };
  });
  // if path is home, return null
  if (breadcrumbs.length === 0) {
    return null;
  }
  if (breadcrumbs.length === 1) {
    // check if path is /home
    if (breadcrumbs[0].path === "/home") {
      return null;
    }
  }
  return (
    <div className="px-8 sm:px-[3rem] md:px-[6rem] lg:px-[12rem]">
    <nav className="flex items-center gap-2 text-black font-bold">
      {/* Home Logo */}
      <Link href="/">
        <svg width="26" height="20" viewBox="0 0 134 92" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M102.488 56.0858V58.7586H105.16L129.938 58.7586L123.954 88.4663L72.7798 88.4661V2.67286H102.488V56.0858Z" stroke="#1E1E1E" strokeWidth="5.34573"/>
        <path d="M59.6493 0L105.16 0L51.7038 91.1389H0L59.6493 0Z" fill="#1E1E1E"/>
        </svg>
      </Link>

      {/* Separator and Breadcrumbs */}
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={breadcrumb.path} className="flex items-center gap-2">
          {/* Separator */}
          <span>{'/'}</span>

          {/* Breadcrumb Link */}
          <Link href={breadcrumb.path}>
            <div className="hover:underline capitalize">{breadcrumb.label}</div>
          </Link>
        </span>
      ))}
    </nav>
    </div>
  );
};

export default Crumbs;
