import { auth } from "server/auth";
import SignIn from "./auth/SignIn";
import UserDropdown from "./auth/UserDropdown";

const UserButton = async () => {
    const session = await auth()
    if (!session?.user) return <SignIn />
    return <UserDropdown session={session} />
}

export default UserButton