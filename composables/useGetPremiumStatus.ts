import { useCurrentUser } from "vuefire";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

export default async function () {
  const app = useFirebaseApp();
  const user = useCurrentUser();
  const userId = user.value?.uid;

  if (!userId) return false;

  const db = getFirestore(app);
  const subscriptionsRef = collection(db, "customers", userId, "subscriptions");
  const q = query(
    subscriptionsRef,
    where("status", "in", ["trialing", "active"])
  );

  return new Promise<boolean>((resolve, reject) => {
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        // In this implementation we only expect one active or trialing subscription to exist.
        // console.log("Subscription snapshot", snapshot.docs.length);
        if (snapshot.docs.length === 0) {
          //console.log("No active or trialing subscriptions found");
          resolve(false);
        } else {
          // console.log("Active or trialing subscription found");
          resolve(true);
        }
        unsubscribe();
      },
      reject
    );
  });
}
