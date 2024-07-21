// app/page.tsx

import { Metadata } from 'next';
import ClientComponent from '../app/_components/ClientComponent';



export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to chatSPA',
};

export default function HomePage() {
  return (
    <div className="app-container" style={{ position: 'relative' }}>
      <ClientComponent />
    </div>
  );
}
