import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function Page() {
  const { userId, sessionClaims } = auth();
  if (!userId) return null; // to avoid typescript warnings

  const response = await clerkClient.users.getUser(userId);

  // fetch organization list created by user
  // const userInfo = await fetchUser(response.id);

  const userInfo = await fetchUser(userId);

  //   console.log("userInfo", userInfo);

  if (!userInfo?.onboarded) redirect("/onboarding");

  //chatgpt.com/c/a4bd196c-6954-458b-9759-f3ef7c634990
  // Convert userInfo._id to a string if it's not already
  // Ensure that the userId passed to PostThread is a plain string. You can achieve this by converting
  const userIdString = userInfo._id.toString();

  return (
    <>
      <h1 className="head-text">Create Thread</h1>
      {/* 
      <PostThread userId={userInfo._id} /> */}
      <PostThread userId={userIdString} />
    </>
  );
}

export default Page;
