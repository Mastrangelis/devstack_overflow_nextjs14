'use client';

import { ClerkProvider } from '@clerk/nextjs';
import React, { useState, useEffect, ReactNode } from 'react';

const darkClerkMode: any = {
  layout: {
    socialButtonsVariant: 'iconButton',
    logoImageUrl: '/favicon.ico',
  },
  elements: {
    footerActionLink: {
      color: '#FF7000',
      '&:hover': {
        color: '#FF7000 !important',
        opacity: '0.8 !important',
      },
    },
    userButtonPopoverActionButton: {
      color: 'white',
      '&:hover': {
        color: 'rgba(255, 255, 255, 0.83) !important',
        backgroundColor: 'rgba(0, 0, 0, 0.8) !important',
      },
    },

    formButtonPrimary: {
      backgroundColor: '#FF7000',
      textColor: 'white',
      '&:hover': {
        backgroundColor: '#FF7000 !important',
        opacity: '0.8 !important',
      },
    },
    socialButtonsIconButton: {
      background: '#212734',
      '&:hover': {
        background: '#212734 !important',
        opacity: '0.5',
      },
    },
    socialButtonsProviderIcon__github: {
      filter: 'invert(1) !important',
    },
    dividerLine: {
      textColor: 'white',
      borderColor: 'white',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    input: {
      backgroundColor: '#212734',
      placeholderColor: 'white !important',
      borderColor: 'rgba(255, 255, 255, 1)',
      color: 'white',
    },
    dividerText: {
      color: 'white',
    },
    formFieldInputShowPasswordButton: {
      color: 'white !important',
    },
    socialButtonsIconButton__loading: {
      color: 'white !important',
    },
    menuButton: {
      color: 'white !important',
    },
    avatarImageActionsRemove: {
      border: '1px solid red',
      margin: '5px',
    },
    formButtonReset: {
      color: 'white',
      '&:hover': {
        color: 'rgba(255, 255, 255, 0.83) !important',
        backgroundColor: 'rgba(0, 0, 0, 0.8) !important',
      },
    },

    navbarButton: {
      color: 'white',
      '&:hover': {
        color: 'rgba(255, 255, 255, 0.83) !important',
        backgroundColor: 'rgba(0, 0, 0, 0.8) !important',
      },
    },
    profileSectionPrimaryButton: {
      color: 'white',
      '&:hover': {
        color: 'rgba(255, 255, 255, 0.83) !important',
        backgroundColor: 'rgba(0, 0, 0, 0.8) !important',
      },
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
  },
  variables: {
    colorBackground: '#101012',
    colorText: 'white',
  },
};

const lightClerkMode: any = {
  layout: {
    socialButtonsVariant: 'iconButton',
    logoImageUrl: '/favicon.ico',
  },
  elements: {
    formButtonPrimary: {
      backgroundColor: '#FF7000',
      textColor: 'white',
      '&:hover': {
        backgroundColor: '#FF7000 !important',
        opacity: '0.8 !important',
      },
      boxShadow: 'none !important',
    },
    footerActionLink: 'primary-text-gradient hover:text-primary-500',
  },
};

export function ClerkProviderWrapper({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState('');

  const getTheme = () => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme === 'system' || localTheme === 'dark') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  useEffect(() => {
    window.addEventListener('storage', () => {
      // When storage changes refetch
      getTheme();
    });

    return () => {
      // When the component unmounts remove the event listener
      window.removeEventListener('storage', getTheme);
    };
  }, []);

  return (
    <ClerkProvider
      appearance={
        mode === 'dark'
          ? {
              ...darkClerkMode,
            }
          : {
              ...lightClerkMode,
            }
      }
    >
      {children}
    </ClerkProvider>
  );
}
