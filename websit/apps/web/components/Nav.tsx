'use client'
import { BreadcrumbItem, Breadcrumbs, Button, Image } from "@nextui-org/react";

const Nav = ({ paths }) => {
  return (
    <Breadcrumbs color="secondary" className="h-[40px]">
      {paths.map((path, index) => <BreadcrumbItem key={index} href={path.path}>{path.name}</BreadcrumbItem>)}
    </Breadcrumbs>
  )
}

export default Nav