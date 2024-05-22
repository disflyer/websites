import { Button } from "@nextui-org/react"
import { signOut } from "next-auth/react"

const SignOut = () => {
    return <form
        action={() => {
            signOut()
        }}
    >
        <Button variant='light' type="submit">Log Out</Button>
    </form>
}

export default SignOut