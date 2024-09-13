import { Metadata } from "next";
import InteractiveHomeContent from "./_components/InteractiveHomeContent";


export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to chatSPA",
};

export default function HomePage() {
  return (
    <div className="app-container" style={{ position: "relative" }}>
      <div>
        <p style={{ fontSize: "70px" }}>Welcome to Chat</p>
        <br />
        <InteractiveHomeContent />
      </div>
    </div>
  );
}