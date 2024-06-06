import AccountProfile from "@/components/forms/AccountProfile";
import { auth, clerkClient } from "@clerk/nextjs/server";

// import { clerkClient } from "@clerk/nextjs/server";

async function Page() {
  const { userId, sessionClaims } = auth();
  if (!userId) return null; // to avoid typescript warnings

  const response = await clerkClient.users.getUser(userId);

  // console.log("response.imageUrl", response.imageUrl);
  // console.log("response.name", response.username);

  //clerk.com/docs/references/backend/user/get-user

  // DatabaseInfo:
  const userInfo = {};

  const userData = {
    // id: userId,
    // objectId: userInfo?._id,
    // username: userInfo ? userInfo?.username : response.username,
    // name: userInfo ? userInfo?.name : response.firstName ?? "",
    // bio: userInfo ? userInfo?.bio : "",
    // image: userInfo ? userInfo?.image : response.imageUrl,
    id: userId,
    objectId: userInfo?._id,
    username: userInfo?.username || response.username,
    name: userInfo?.name || response.firstName || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || response.imageUrl,
  };

  // console.log("userData", userData);

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile now, to use Threds.
      </p>

      <section className="mt-9 bg-dark-2 p-10">
        {/* <AccountProfile user={userData} btnTitle="Continue" /> */}

        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
}

export default Page;
