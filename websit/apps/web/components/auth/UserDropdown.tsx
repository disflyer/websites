'use client'
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { Session } from "next-auth";
import SignOut from "./SignOut";

const UserDropdown = ({ session }: { session: Session }) => {
    return (
        <div>
            <Dropdown placement="bottom-start">
                <DropdownTrigger>
                    <Avatar className="transition-transform" as="button" src={session?.user?.image as string} showFallback name={session?.user?.name as string} />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-bold">Signed in as <span className="text-blue-400">{session.user?.name}</span></p>
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger">
                        <SignOut />
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}

export default UserDropdown