import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useAuth = () => {
  const router = useRouter();
  const signOut = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) throw new Error();
      toast.success("Signed out successfully!");
      router.push("/sign-in");
      router.refresh();
    } catch (e) {
      toast.error("Failed to sign out, please try again!");
    }
  };

  return { signOut };
};
