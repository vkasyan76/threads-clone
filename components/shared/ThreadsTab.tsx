import { redirect } from "next/navigation";

// import { fetchCommunityPosts } from "@/lib/actions/community.actions";
// import { fetchUserPosts } from "@/lib/actions/user.actions";

import ThreadCard from "../cards/ThreadCard";
import { fetchUserPosts } from "@/lib/actions/user.actions";

interface Result {
  name: string;
  image: string;
  id: string;
  threads: {
    _id: string;
    text: string;
    parentId: string | null;
    author: {
      name: string;
      image: string;
      id: string;
    };
    community: {
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: string;
    children: {
      author: {
        image: string;
      };
    }[];
  }[];
}
interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}
async function ThreadsTab({ currentUserId, accountId, accountType }: Props) {
  let result: Result;

  result = await fetchUserPosts(accountId);
  //   console.log("Threads fetched by User", result);

  //   console.log("Threads Authors info", result.threads);

  // Loop through threads and log the author details
  //   result.threads.forEach((thread) => {
  //     console.log(`Thread ID: ${thread._id}`);
  //     console.log(`Author ID: ${thread.author.id}`);
  //     console.log(`Author Name: ${thread.author.name}`);
  //     console.log(`Author Image: ${thread.author.image}`);
  //   });

  if (!result) {
    redirect("/");
  }
  return (
    // author is conditional to indicate whether the logged in user is the author or owner of the community (accountType)
    <section className="mt-9 flex flex-col gap-10">
      {result.threads.map((thread) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          }
          community={
            accountType === "Community"
              ? { name: result.name, id: result.id, image: result.image }
              : thread.community
          }
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      ))}
    </section>
  );
}
export default ThreadsTab;

//   if (accountType === "Community") {
//     result = await fetchCommunityPosts(accountId);
//   } else {
//     result = await fetchUserPosts(accountId);
//   }
