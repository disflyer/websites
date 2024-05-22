import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { api } from "trpc/server";

const Group = async () => {
	const hello = await api.group.hello({ text: "from tRPC" })
	return (
		<>
			<header className="flex pt-[50px]">
				<Image
					isBlurred
					width={200}
					src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
					alt="NextUI Album Cover"
					className="m-2"
				/>
				{hello.greeting}
			</header>

		</>
	)
}

export default Group