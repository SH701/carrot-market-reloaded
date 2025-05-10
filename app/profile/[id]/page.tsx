import db from "@/lib/db"
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export default async function UserProfile({params}:{params:{id:string}}){
    const user = await db.user.findUnique({
        where:{id:Number(params.id)}
    });
    if(!user) return <p>정보를 찾을 수 없습니다.</p>
    return(
        <div className="p-5">
            <h1 className="text-2xl">{user.username}님의 프로필</h1>
            {user.avatar?(<Image src={user.avatar} alt="User avatar"  className="object-cover rounded-full"/>):(<UserIcon/>)}
        </div>
    )
}