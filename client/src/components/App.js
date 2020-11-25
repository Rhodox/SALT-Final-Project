import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Context from "../contexts/Context.js";
import "../styles/app.css";

import Background from "./staticComponents/Background";
import Header from "./staticComponents/Header";
import Footer from "./staticComponents/Footer";

import CreateUser from "./CreateUser";
import Splash from "./Splash";
import Login from "./Login";
import Chat from "./Chat";
import SchedulePlanner from "./SchedulePlanner/SchedulePlanner";
import CreateActivity from "./SchedulePlanner/CreateActivity";

export const ActivitiesContext = React.createContext();
export const UpdateAtivitiesContext = React.createContext();


function App() {

	const [userInfo, setUserInfo] = useState();
	const [ActivitiesArray, updateActivitiesArray] = useState([
		{
			Activity: "Eat",
			Description: "Please work",
			Time: "Now"
		}
	]);

	return (
		<BrowserRouter>
			<Context.Provider value={{ userInfo, setUserInfo }}>
				<div className="App">
					<Switch>
						<Route exact path="/">
							{userInfo ? <Redirect to="/home" /> : <Redirect to="/login" />}
						</Route>

						<Route exact path="/home">
							{userInfo ? <Splash /> : <Redirect to="/login" />}
						</Route>

						<Route exact path="/home/chat">
							{/* {userInfo ? */} <Chat /> {/* : <Redirect to="/login" />} */}
						</Route>

						<Route exact path="/login">
							<Login />
						</Route>

						<Route exact path="/create-user">
							{<CreateUser />}
						</Route>

						<ActivitiesContext.Provider value={ActivitiesArray}>
							<UpdateAtivitiesContext.Provider value={updateActivitiesArray}>
								<Route exact path="/schedule-planner">
									<SchedulePlanner />
								</Route>

								<Route exact path="/create-activity">
									<CreateActivity />
								</Route>
							</UpdateAtivitiesContext.Provider>
						</ActivitiesContext.Provider>


						<Route render={() => <h3 className="error-text">404 - HEALTHHUB PAGE NOT FOUND</h3>} />
					</Switch>
				</div>
			</Context.Provider>
		</BrowserRouter>
	);
}

export default App;
