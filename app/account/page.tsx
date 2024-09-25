import { auth } from "../_services/auth";

import { fetchUserByEmail, insertNewUser } from "@/apiUtils/apiUsersServer";
import { redirect } from "next/navigation";
import App from "../_components/App";

async function Page() {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/");
  }
  const { user } = session;
  const emailFromProvider = user.email;
  const userFromProvider = user.name;
  const sessionImage = user.image;

  const { existingUser, fetchError } = await fetchUserByEmail(
    emailFromProvider!
  );
  if (fetchError) {
    console.error("Error fetching user:", fetchError);
  }  

  if (existingUser) {
    return (
      <div className="background-login">
        <App incomingUser={existingUser} />
      </div>
    );
  }

  const newUser = {
    username: userFromProvider,
    full_name: userFromProvider,
    avatar: sessionImage,
    status: "new",
    email: emailFromProvider,
  };

  try {
    const { data, error } = await insertNewUser(newUser);
    if (error) {
      console.error("Error inserting user:", error);
    }
    if (!data || data.length === 0) {
      throw new Error("No user data returned after insertion");
    }
    const userWithId = data[0];    

    return (
      <div className="background-login">
        <App incomingUser={userWithId} />
      </div>
    );
  } catch (error: any) {
    const errorMessage = "Error creating user: " + error.message;
    console.error(errorMessage);
    redirect("/error?message=" + encodeURIComponent(errorMessage));
  }
}

export default Page;
