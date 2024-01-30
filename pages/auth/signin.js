import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import { db } from "../../firebase";



export default function Signin() {
  const router = useRouter();
  async function onGoogleClick() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      const user = auth.currentUser.providerData[0];
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          userImg: user.photoURL,
          uid: user.uid,
          timestamp: serverTimestamp(),
          username: user.displayName.split(" ").join("").toLocaleLowerCase(),
        });
      }
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Header />
      <div className="flex justify-center space-x-7 mt-20">
        
        <div className="">
          <div className="flex flex-col items-center gap-y-8">
            <Image
              className="w-32 object-cover "
              src="/logo.png"
              height={300}
              width={400}
              alt="connect-logo"
            />
            <p className="font-serif font-semibold">Connecting and Sharing</p>
            <button
              onClick={onGoogleClick}
              className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
