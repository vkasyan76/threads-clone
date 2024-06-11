import { redirect } from "next/navigation";
import { auth, clerkClient } from "@clerk/nextjs/server";

// import Comment from "@/components/forms/Comment";
import ThreadCard from "@/components/cards/ThreadCard";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchThreadById } from "@/lib/actions/thread.actions";
// import { fetchThreadById } from "@/lib/actions/thread.actions";

export const revalidate = 0;

async function page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const { userId } = auth();
  if (!userId) return null; // to avoid typescript warnings

  const user = await clerkClient.users.getUser(userId);

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const thread = await fetchThreadById(params.id);

  //   console.log("thread", thread);

  //   console.log("children", thread.children);

  return (
    <section className="relative">
      <ThreadCard
        key={thread._id}
        id={thread._id}
        currentUserId={user?.id}
        parentId={thread.parentId}
        content={thread.text}
        author={thread.author}
        community={thread.community}
        createdAt={thread.createdAt}
        comments={thread.children}
      />
    </section>
  );
}

export default page;
