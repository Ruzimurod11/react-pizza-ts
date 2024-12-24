import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//qs
import qs from "qs";

// Components

import {
   Skeleton,
   PizzaBlock,
   Categories,
   Sort,
   Pagination,
} from "../components";

import { sortList } from "../components/Sort";

import { useAppDispatch } from "../redux/store";
import { selectPizzaData } from "../redux/pizza/selectors";
import { selectFilter } from "../redux/filter/selectors";
import {
   setCategoryId,
   setCurrentPage,
   setFilters,
} from "../redux/filter/slice";
import { fetchPizzas } from "../redux/pizza/asyncActions";
import { SearchPizzaParams } from "../redux/pizza/types";

const Home: React.FC = () => {
   const navigate = useNavigate();
   const isSearch = React.useRef(false);
   const isMounted = React.useRef(false);

   // redux
   const dispatch = useAppDispatch();
   const { items, status } = useSelector(selectPizzaData);
   const { categoryId, currentPage, sort, searchValue } =
      useSelector(selectFilter);

   const onChangeCategory = React.useCallback((idx: number) => {
      dispatch(setCategoryId(idx));
   }, []);

   const onChangePage = (page: number) => {
      dispatch(setCurrentPage(page));
   };

   const getPizzas = async () => {
      const sortBy = sort.sortProperty.replace("-", "");
      const order = sort.sortProperty.includes("-") ? "asc" : "desc";
      const category = categoryId > 0 ? `category=${categoryId}` : "";
      const search = searchValue ? `&search=${searchValue}` : "";

      dispatch(
         fetchPizzas({
            sortBy,
            order,
            category,
            search,
            currentPage: String(currentPage),
         })
      );

      window.scrollTo(0, 0);
   };

   // Если изменили параметры и был первый рендер
   React.useEffect(() => {
      if (isMounted.current) {
         const queryString = qs.stringify({
            sortProperty: sort.sortProperty,
            categoryId,
            currentPage,
         });
         navigate(`?${queryString}`);

         if (!window.location.search) {
            dispatch(fetchPizzas({} as SearchPizzaParams));
         }
      }
      isMounted.current = true;
   }, [categoryId, sort.sortProperty, searchValue, currentPage]);

   // Если был первый рендер, то запрашиваем пиццы
   React.useEffect(() => {
      getPizzas();
   }, [categoryId, sort.sortProperty, searchValue, currentPage]);

   // Если был первый рендер, то проверяем URL параметры и сохраняем в редуксе
   React.useEffect(() => {
      if (window.location.search) {
         const params = qs.parse(
            window.location.search.substring(1)
         ) as unknown as SearchPizzaParams;
         const sort = sortList.find(
            (obj) => obj.sortProperty === params.sortBy
         );

         dispatch(
            setFilters({
               searchValue: params.search,
               categoryId: Number(params.category),
               currentPage: Number(params.currentPage),
               sort: sort || sortList[0],
            })
         );
         isSearch.current = true;
      }
   }, []);

   const pizzas = items?.map((pizza: any) => (
      <PizzaBlock key={pizza.id} {...pizza} />
   ));

   const skeletons = [...new Array(6)].map((_, idx) => <Skeleton key={idx} />);

   return (
      <div className="container">
         <div className="content__top">
            <Categories
               value={categoryId}
               onChangeCategory={onChangeCategory}
            />
            <Sort value={sort} />
         </div>
         <h2 className="content__title">Все пиццы</h2>
         {status === "error" ? (
            <div className="content__error-info">
               <h2>Произошла ошибка 😕</h2>
               <p>
                  К сожалению, не удалось получить пиццы. Попробуйте повторить
                  попытку позже.
               </p>
            </div>
         ) : (
            <div className="content__items">
               {status === "loading" ? skeletons : pizzas}
            </div>
         )}

         <Pagination value={currentPage} onChangePage={onChangePage} />
      </div>
   );
};

export default Home;
