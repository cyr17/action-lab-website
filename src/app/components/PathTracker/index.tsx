// components/PathTracker.tsx
'use client'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export const PathTracker = () => {
  const pathname = usePathname()

  useEffect(() => {
    // Get the navigation stack from sessionStorage or initialize an empty array
    const navigationStack = JSON.parse(sessionStorage.getItem('navigationStack') || '[]')

    // If the current path is different from the last path in the stack, push it
    if (navigationStack[navigationStack.length - 1] !== pathname) {
      navigationStack.push(pathname)
    }

    // Store the updated stack back in sessionStorage
    sessionStorage.setItem('navigationStack', JSON.stringify(navigationStack))
  }, [pathname])

  return null
}