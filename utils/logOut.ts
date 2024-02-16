export default function () {
  const router = useRouter();
  const { auth } = useSupabaseClient();

  async function logout() {
    try {
      const { error } = await auth.signOut();
      if (error) throw error;
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  logout();
}
