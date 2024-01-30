
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../atom/userAtom";
import Story from "./Story";

export default function Stories() {
  const [storyUsers, setSoryUsers] = useState([]);
  const [currentUser] = useRecoilState(userState)
  
  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border overflow-x-scroll rounded-sm scrollbar-none">
      {currentUser && (
        <Story img={currentUser?.userImg} username={currentUser?.username} isUser="true"/>
      )}
      
    </div>
  );
}
