import React from "react";

type CategoriesProps = {
   value: number;
   onChangeCategory: (i: number) => void;
};

export const Categories: React.FC<CategoriesProps> = React.memo(
   ({ value, onChangeCategory }) => {
      const categories = [
         "Все",
         "Мясные",
         "Вегетарианская",
         "Гриль",
         "Острые",
         "Закрытые",
      ];

      return (
         <div className="categories">
            <ul>
               {categories?.map((categoryName, idx) => (
                  <li
                     key={idx}
                     onClick={() => onChangeCategory(idx)}
                     className={value === idx ? "active" : ""}>
                     {categoryName}
                  </li>
               ))}
            </ul>
         </div>
      );
   }
);
