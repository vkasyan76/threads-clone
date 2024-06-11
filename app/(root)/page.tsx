import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
// import { UserButton } from "@clerk/nextjs";
import { auth, clerkClient } from "@clerk/nextjs/server";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { userId, sessionClaims } = auth();
  if (!userId) return null; // to avoid typescript warnings

  const user = await clerkClient.users.getUser(userId);
  const result = await fetchPosts(
    searchParams.page ? +searchParams.page : 1,
    30
  );
  // console.log("result", result);

  // console.log("author", result.posts);

  return (
    <div className="">
      {/* <UserButton afterSignOutUrl="/" /> */}
      <h1 className="head-text head-left">
        <section className="mt-9 flex flex-col gap-10">
          {result.posts.length === 0 ? (
            <p className="no-result">No threads found</p>
          ) : (
            <>
              {result.posts.map((post) => (
                <ThreadCard
                  key={post._id}
                  id={post._id}
                  currentUserId={user?.id}
                  parentId={post.parentId}
                  content={post.text}
                  author={post.author}
                  community={post.community}
                  createdAt={post.createdAt}
                  comments={post.children}
                />
              ))}
            </>
          )}
        </section>
      </h1>
    </div>
  );
}
