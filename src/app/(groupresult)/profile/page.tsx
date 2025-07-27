import { cookies } from "next/headers"
import { redirect } from "next/navigation";
export default async function page() {
    const usercookies= await cookies();
    const user=usercookies.get("user")?.value
    if(!user){
        redirect('/login');
    }
  return (
    <div>
        {user}
    </div>
  )
}
