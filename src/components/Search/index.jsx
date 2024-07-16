import React, { useCallback, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { setSearchValue } from "../../redux/slices/filterSlice";

import s from "./Search.module.scss";
import { useDispatch } from "react-redux";

const Search = () => {
	const dispatch = useDispatch();
	const [value, setValue] = useState("");
	const inputRef = useRef();

	const onClickClear = () => {
		dispatch(setSearchValue(""));
		setValue("");
		inputRef.current.focus();
	};

	const updateSearchValue = useCallback(
		debounce((str) => {
			dispatch(setSearchValue(str));
		}, 250),
		[],
	);

	const onChangeInput = (event) => {
		setValue(event.target.value);
		updateSearchValue(event.target.value);
	};

	return (
		<div className={s.root}>
			<svg
				className={s.icon}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 32 32"
			>
				<g id="search">
					<path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
				</g>
			</svg>
			<input
				ref={inputRef}
				value={value}
				onChange={onChangeInput}
				className={s.input}
				type="text"
				placeholder="Поиск пиццы..."
			/>
			{value && (
				<svg
					onClick={onClickClear}
					className={s.clearIcon}
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
				</svg>
			)}
		</div>
	);
};

export default Search;
