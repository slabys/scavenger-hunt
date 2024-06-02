import HuntDetail from "@components/hunts/HuntDetail";
import { TabsToComponentsProps } from "@components/router/Router";
import React from "react";
import { Redirect, Route } from "react-router-dom";

interface RenderProps {
	tabsToComponents: TabsToComponentsProps[];
}

const Render: React.FC<RenderProps> = ({ tabsToComponents }) => {
	return (
		<>
			{/*Tab routes*/}
			{tabsToComponents.map((route, index) => (
				<Route exact path={route.href} key={`render-route-${index}`}>
					{route.render}
				</Route>
			))}

			{/* Hunt Detail */}
			<Route exact path="/hunt/:id">
				<HuntDetail />
			</Route>

			<Route exact path="/">
				<Redirect to="/list" />
			</Route>
		</>
	);
};

export default Render;
