//import react into the bundle
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

//include bootstrap npm library into the bundle
import "bootstrap";

//include your index.scss file into the bundle
import "../styles/index.scss";
//import { useState } from "react/cjs/react.production.min";

//import your own components

const ToDoList = () => {
	const [inputValue, setInputValue] = useState("");
	const [todo, setTodo] = useState([]);

	useEffect(() => {
		getData();
	}, []);

	const handleSubmit = e => {
		e.preventDefault();
		if (inputValue != null) {
			let newTask = [
				...todo,
				{
					label: inputValue,
					done: false
				}
			];
			setTodo(newTask);
			updateTasks();
			//updateTasks(setTodo(newTask));
		}
		setInputValue("");
	};

	const removeTask = element => {
		let removeFromArray = todo.filter(
			item => todo.indexOf(item) !== element
		);
		setTodo(removeFromArray);
		updateTasks();
	};

	const URL =
		"https://assets.breatheco.de/apis/fake/todos/user/sometimespipe";
	let options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	};

	const getData = () =>
		fetch(URL, options)
			.then(res => {
				if (!res.ok) {
					throw Error(res.statusText);
				} else {
					return res.json();
				}
			})
			.then(data => {
				console.log("to do list", data);
				setTodo(data);
			})

			.catch(error => console.error("Error: ", error));

	const updateTasks = () =>
		fetch(URL, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(todo)
		})
			.then(res => {
				if (!res.ok) {
					throw Error(res.statusText);
				} else {
					return res.json();
				}
			})
			.then(data => {
				console.log("to do list", data);
			})

			.catch(error => console.error("Error: ", error));

	const deleteAll = () =>
		fetch(URL, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ label: inputValue, done: false })
		})
			.then(res => {
				if (!res.ok) {
					throw Error(res.statusText);
				} else {
					return res.json();
				}
			})
			.then(data => {
				console.log("to do list", data);
				setTodo([]);
			})

			.catch(error => console.error("Error: ", error));

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="card text-center">
					<div className="card-header">
						<input
							type="text"
							className="mx-auto w-70"
							value={inputValue}
							onChange={e => setInputValue(e.target.value)}
							autoFocus
						/>

						<button type="submit" className="btn btn-primary">
							Add task
						</button>
					</div>
					<div className="card-body">
						<div>
							{todo.map((item, index) => {
								return (
									<li key={index}>
										{item.label}
										<span
											className="float-right"
											onClick={() =>
												removeTask(todo.indexOf(item))
											}>
											<i
												className="fas fa-times"
												style={{ color: "red" }}></i>
										</span>
									</li>
								);
							})}
							<footer>
								<button
									type="button"
									className="btn btn-secondary btn-sm m-1"
									onClick={deleteAll}>
									Delete All
								</button>
							</footer>
						</div>
					</div>
				</div>
			</form>
		</>
	);
};

//render your react application
ReactDOM.render(<ToDoList />, document.querySelector("#app"));
