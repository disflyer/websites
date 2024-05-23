import { BreadcrumbItem, Breadcrumbs, Button, Image } from "@nextui-org/react";
import { api } from "trpc/server";
import Section from "./Section";
import Nav from "components/Nav";


const Group = async ({ params }) => {
	const data = await api.group.get({ id: params.group_id })

	return (
		<>
			<header className="pt-[50px]">
				<Nav paths={[{ path: "/", name: "Home" }, { name: "Group" }]} />
				<div className="flex justify-between">
					<div className="flex">
						<Image
							isBlurred
							src={data.img || "https://nextui.org/images/fruit-1.jpeg"}
							alt="NextUI Album Cover"
							className="m-2 h-[180px] w-[180px] object-cover"
						/>
						<h2 className="hidden sm:block font-bold text-[40px] text-right ml-10">{data.name}</h2>
					</div>
					<div className="flex flex-col sm:justify-center sm:px-[20px] sm:py-[30px]">
						<h2 className="block sm:hidden font-bold text-[40px] text-right mb-8">{data.name}</h2>
						<Button radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
							Study Chunks
						</Button>
					</div>
				</div>
			</header>
			<Section group_id={params.group_id} group={data} />
		</>
	)
}



export default Group