import { cityOptions, customers, segmentOptions, statusOptions, tierOptions, type CustomerDetail } from "./data";

export type CustomerPageFilters = {
  keyword: string;
  tier: string;
  segment: string;
  status: string;
  city: string;
};

export type CustomerSearchParams = Record<string, string | string[] | undefined>;

export const defaultCustomerPageFilters: CustomerPageFilters = {
  keyword: "",
  tier: tierOptions[0],
  segment: segmentOptions[0],
  status: statusOptions[0],
  city: cityOptions[0],
};

function readStringParam(value: string | string[] | undefined, fallback: string) {
  if (typeof value === "string") return value;
  if (Array.isArray(value) && value.length > 0) return value[0] ?? fallback;
  return fallback;
}

export function getCustomerPageFilters(searchParams: CustomerSearchParams = {}): CustomerPageFilters {
  return {
    keyword: readStringParam(searchParams.q, defaultCustomerPageFilters.keyword),
    tier: readStringParam(searchParams.tier, defaultCustomerPageFilters.tier),
    segment: readStringParam(searchParams.segment, defaultCustomerPageFilters.segment),
    status: readStringParam(searchParams.status, defaultCustomerPageFilters.status),
    city: readStringParam(searchParams.city, defaultCustomerPageFilters.city),
  };
}

export function filterCustomers(filters: CustomerPageFilters, sourceCustomers: CustomerDetail[] = customers) {
  const keyword = filters.keyword.trim().toLowerCase();

  return sourceCustomers.filter((customer) => {
    const matchesKeyword =
      keyword.length === 0 ||
      customer.code.toLowerCase().includes(keyword) ||
      customer.name.toLowerCase().includes(keyword) ||
      customer.phone.toLowerCase().includes(keyword);

    const matchesTier = filters.tier === defaultCustomerPageFilters.tier || customer.tier === filters.tier;
    const matchesSegment = filters.segment === defaultCustomerPageFilters.segment || customer.segment === filters.segment;
    const matchesStatus = filters.status === defaultCustomerPageFilters.status || customer.status === filters.status;
    const matchesCity = filters.city === defaultCustomerPageFilters.city || customer.city === filters.city;

    return matchesKeyword && matchesTier && matchesSegment && matchesStatus && matchesCity;
  });
}
