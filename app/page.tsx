// app/page.tsx
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to chatSPA",
};
export default async function HomePage() {
  return (
    <div className="app-container" style={{ position: "relative" }}>
      <h1>HomePage</h1>
    </div>
  );
}
