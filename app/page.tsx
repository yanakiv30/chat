import { Metadata } from "next";
import GoogleSignInButton from "./_components/GoogleSignInButton";
import GithubSignInButton from "./_components/GithubSignInButton";
export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to chatSPA",
};
export default async function HomePage() {
  return (
    <div className="app-container" style={{ position: "relative" }}>
      <div>
        <p style={{ fontSize: "70px" }}>Welcome to Chat</p>
        <br></br>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "40px",
          }}
        >
          <GoogleSignInButton px={20} />
          <GithubSignInButton px={20} />
        </div>
      </div>
    </div>
  );
}
