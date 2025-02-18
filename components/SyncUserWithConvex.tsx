"use client";

import { api } from "@/convex/_generated/api";
// import { updateUser } from "@/convex/users"; // don't need this unless inside a server function
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";

function SyncUserWithConvex() {
  const { user } = useUser();
  const updateUser = useMutation(api.users.updateUser);

  useEffect(() => {
    if (!user) return;

    const syncUser = async () => {
      try {
        await updateUser({
          userId: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.emailAddresses[0]?.emailAddress ?? "",
        });
      } catch (error) {
        console.error("Error syncing user:", error);
      }
    };

    syncUser();
  }, [user, updateUser]);

  return null;
}

export default SyncUserWithConvex;
