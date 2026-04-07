import type { Metadata } from "next";
import { CustomerPageClient } from "./components/CustomerPageClient";
import { filterCustomers, getCustomerPageFilters, type CustomerSearchParams } from "./filterCustomers";

type CustomerPageProps = {
  searchParams?: Promise<CustomerSearchParams> | CustomerSearchParams;
};

export const metadata: Metadata = {
  title: "Customers | Sales Dashboard",
  description: "Browse customers, tiers, segments, and purchase status in the sales dashboard.",
};

export default async function CustomerPage({ searchParams }: CustomerPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams ?? {});
  const filters = getCustomerPageFilters(resolvedSearchParams);
  const filteredCustomers = filterCustomers(filters);

  return <CustomerPageClient customers={filteredCustomers} filters={filters} />;
}
