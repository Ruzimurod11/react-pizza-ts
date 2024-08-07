import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza: React.FC = () => {
	const [pizza, setPizza] = useState<{
		imageUrl: string;
		title: string;
		price: string;
	}>();
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get(
					"https://6688719f0ea28ca88b85405a.mockapi.io/items/" + id,
				);
				setPizza(data);
			} catch (error) {
				alert("Ошибка при получении пиццы!");
				navigate("/");
			}
		}

		fetchPizza();
	}, [id, navigate]);

	if (!pizza) {
		return <>Загрузка...</>;
	}
	return (
		<div className="container cart__info--container">
			<img
				src={pizza.imageUrl}
				alt="pizza"
			/>
			<div className="cart__info--card">
				<h2 className="cart__info--title">{pizza.title}</h2>
				<h4 className="cart__info--price">{pizza.price} ₽</h4>
			</div>
		</div>
	);
};

export default FullPizza;
