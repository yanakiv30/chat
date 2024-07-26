import React from 'react';
import Link from 'next/link';

const NotFound: React.FC = () => {
  return React.createElement('div', {
    style: {
      textAlign: 'center',
      marginTop: '1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.5rem'
    }
  }, 
    React.createElement('h1', {
      style: {
        fontSize: '1.875rem',
        fontWeight: 600
      }
    }, "This page could not be found :("),
    React.createElement(Link, {
      href: '/',
      style: {
        display: 'inline-block',
        backgroundColor: '#3498db',
        color: '#ffffff',
        padding: '0.75rem 1.5rem',
        fontSize: '1.125rem',
        textDecoration: 'none'
      }
    }, "Go back home")
  );
};

export default NotFound;