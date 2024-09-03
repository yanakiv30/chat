import { auth } from "../_services/auth";
import SignUp from "../../app/signup/page";
import { redirect } from "next/navigation";
import {
  fetchUserByEmailServer,
  insertNewUserServer,
} from "@/apiUtils/apiUsersServer";

async function Page() {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/login");
  }
  const { user } = session;
  const emailFromGoogle = user.email;
  const userFromGoogle = user.name;
  const sessionImage = user.image;

  const { existingUser, fetchError } = await fetchUserByEmailServer(
    emailFromGoogle!
  );
  if (fetchError) {
    console.error("Error fetching user:", fetchError);
  }

  if (fetchError && fetchError.code !== "PGRST116") {
    throw new Error(fetchError.message);
  }

  if (existingUser) {
    if (existingUser.is_google_user) {
      return (
        <div className="background-login">
          <SignUp incomingUser={existingUser} />
        </div>
      );
    } else {
      redirect(
        "/login?message=" +
          encodeURIComponent(
            "An account with your Google email already exists. Please log in your existing account using this form."
          )
      );
    }
  }

  const newUser = {
    username: userFromGoogle,
    full_name: userFromGoogle,
    avatar: sessionImage,
    status: "new",
    email: emailFromGoogle,
    is_google_user: true,
  };

  try {
    const { data, error } = await insertNewUserServer(newUser);
    if (error) {
      console.error("Error inserting user:", error);
    }
    const userWithId = data[0];

    return (
      <div className="background-login">
        <SignUp incomingUser={userWithId} />
      </div>
    );
  } catch (error: any) {
    const errorMessage = "Error creating user: " + error.message;
    console.error(errorMessage);
    redirect("/error?message=" + encodeURIComponent(errorMessage));
  }
}

export default Page;
