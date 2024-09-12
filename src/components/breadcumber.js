import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { TiChevronRight } from "react-icons/ti";

const BreadCrumbLinks = () => {
  return (
    <Breadcrumb spacing="8px" separator={<TiChevronRight color="gray.500" />}>
      <BreadcrumbItem>
        <BreadcrumbLink href="/home">Home</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink href="/agenda">Agenda</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default BreadCrumbLinks;
