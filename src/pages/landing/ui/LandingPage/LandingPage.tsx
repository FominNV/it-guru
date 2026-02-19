import { useState, type ChangeEvent, type FC } from "react";
import { mapProductData, ProductTable } from "@/features/products";
import { useDebounce } from "@/shared/hooks";
import {
  useGetProductListQuery,
  useSearchProductsQuery,
  type IProductData,
  type PaginateListType,
} from "@/shared/store";
import { MainContainer, MainLayout } from "@/shared/ui";
import { Header } from "@/widgets/header";
import "./LandingPage.scss";

export const LandingPage: FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearch = useDebounce(searchValue.trim());

  const {
    data: defaultData,
    isLoading: isLoadingDefault,
    isFetching: isFetchingDefault,
  } = useGetProductListQuery();

  const {
    data: searchData,
    isLoading: isLoadingSearch,
    isFetching: isFetchingSearch,
  } = useSearchProductsQuery(debouncedSearch, {
    skip: debouncedSearch.trim().length === 0,
  });

  const isSearching: boolean = debouncedSearch.length > 0;
  const isLoading: boolean =
    isLoadingDefault ||
    isFetchingDefault ||
    isLoadingSearch ||
    isFetchingSearch;

  const source: PaginateListType<"products", IProductData> | undefined =
    isSearching ? searchData : defaultData;
  const { products = [] } = source || {};

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <MainLayout>
      <div className="landing-page">
        <div className="landing-page__header-wrap">
          <Header onSearchChange={handleChangeSearch} />
        </div>
        <div className="landing-page__content">
          <MainContainer>
            <ProductTable
              items={mapProductData(products)}
              isLoading={isLoading}
            />
          </MainContainer>
        </div>
      </div>
    </MainLayout>
  );
};
