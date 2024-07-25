import { auth } from "../_services/auth";

async function page() {
  const session = await auth();
  console.log("session= ", session);
  return (
    <div>
      <p style={{ fontSize: "50px" }}>
        This account is the result of signin Google provider
      </p>
    </div>
  );
}
export default page;
