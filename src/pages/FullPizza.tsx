import axios from "axios";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const FullPizza: React.FC = () => {
   const [pizza, setPizza] = React.useState<{
      imageUrl: string;
      title: string;
      price: number;
   }>();

   const { id } = useParams();
   const navigate = useNavigate();

   React.useEffect(() => {
      async function fetchPizza() {
         try {
            const { data } = await axios.get(
               "https://6688719f0ea28ca88b85405a.mockapi.io/items/" + id
            );
            setPizza(data);
         } catch (error) {
            alert("Ошибка при получении пиццы!");
            navigate("/");
         }
      }

      fetchPizza();
   }, []);

   if (!pizza) {
      return <>"Загрузка..."</>;
   }

   return (
      <div className="container">
         <div className="fullpizza">
            <img src={pizza.imageUrl} alt="" />
            <div className="fullpizza__line"></div>
            <div className="fullpizza__descr">
               <h2>{pizza.title}</h2>
               <h4>{pizza.price} ₽</h4>
               <button
                  onClick={() => navigate(-1)}
                  className="button button--outline button--add">
                  <span>Prev</span>
               </button>
            </div>
         </div>
      </div>
   );
};

export default FullPizza;
