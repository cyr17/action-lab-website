'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const BackButton = () => {
  const router = useRouter()
  const [backText, setBackText] = useState('Back')
  const [currentPath, setCurrentPath] = useState('')
  useEffect(() => {
    // Retrieve the previous path from sessionStorage
     // Retrieve the navigation stack from sessionStorage
     const navigationStack = JSON.parse(sessionStorage.getItem('navigationStack') || '[]')
    
     let previousPath = '/'
     if (navigationStack.length > 1) {
       // Get the second last item in the stack as the actual "previous" page
       previousPath = navigationStack[navigationStack.length - 2]
       
       setCurrentPath(navigationStack[navigationStack.length - 1]);
     }

    console.log("Previous path",previousPath)
    
    console.log("current path",currentPath)
    let text = 'Back'

    if (previousPath?.includes('caseStudies/')) {
      // text should be string after 'caseStudies/'
      text = previousPath.split('caseStudies/')[1]
      
    } 
    else if (previousPath === '/casestudies') {
      text = 'Back to Case Studies'
    }
    else if(previousPath?.includes('solutions/')) {
      text = previousPath.split('solutions/')[1]
    }
    else if (previousPath === '/solutions') {
      text = 'Back to Solutions'
    }
    else if (previousPath === '/') {
      text = 'Back to Home'
    } else {
      text = 'Back to Home'
    }

    setBackText(text)
  }, [])

  const handleBackNavigation = () => {
    // Pop the current path from the stack
    const navigationStack = JSON.parse(sessionStorage.getItem('navigationStack') || '[]')
    navigationStack.pop() // Remove current page
    sessionStorage.setItem('navigationStack', JSON.stringify(navigationStack))

    // Navigate back programmatically
    router.back()
  }

  console.log("current path2",currentPath)
  if ( currentPath === '/'){
    return (
      <>
      </>
    )
  }

  else{
    return (
      <button className='left-16 flex flex-row justify-start text-black'
          onClick={handleBackNavigation}
      >
        <div className='flex flex-row gap-4 cursor-pointer font-bold hover:underline'>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 7.15329C15.5523 7.15329 16 7.60101 16 8.15329C16 8.70557 15.5523 9.15329 15 9.15329V7.15329ZM0.292893 8.8604C-0.0976315 8.46987 -0.0976315 7.83671 0.292893 7.44618L6.65685 1.08222C7.04738 0.691698 7.68054 0.691698 8.07107 1.08222C8.46159 1.47275 8.46159 2.10591 8.07107 2.49644L2.41421 8.15329L8.07107 13.8101C8.46159 14.2007 8.46159 14.8338 8.07107 15.2244C7.68054 15.6149 7.04738 15.6149 6.65685 15.2244L0.292893 8.8604ZM15 9.15329H1V7.15329H15V9.15329Z" fill="black"/>
          </svg>
          {backText}
        </div>
      </button>
    );
  }
};

export default BackButton;
