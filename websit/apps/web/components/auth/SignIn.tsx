import { signIn } from 'server/auth'
import { Button } from "@nextui-org/react";

const SignIn = ({ provider, ...props }: { provider?: string }) => {
    return <form
        action={async () => {
            "use server"
            await signIn(provider)
        }}
    >
        <Button color="primary" variant='light'  {...props} type="submit">Sign in</Button>
    </form>
}

export default SignIn