import Render from "@components/router/Render";
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Account from "@pages/Account";
import Overview from "@pages/Overview";
import HuntingList from "@pages/list/HuntingList";
import { compass, mapOutline, person } from "ionicons/icons";
import React from "react";

export interface TabsToComponentsProps {
	name: string;
	tab: string;
	href: string;
	icon: string;
	render: React.ReactElement;
}

const Router: React.FC = () => {
	// Routes for bottom tabs with component render
	const TabsToComponents: TabsToComponentsProps[] = [
		{
			name: "Hunting list",
			tab: "list",
			href: "/list",
			icon: mapOutline,
			render: <HuntingList />,
		},
		{
			name: "Hunt overview",
			tab: "Active Hunt overview",
			href: "/overview",
			icon: compass,
			render: <Overview />,
		},
		{
			name: "My account",
			tab: "account",
			href: "/account",
			icon: person,
			render: <Account />,
		},
	];

	return (
		<IonReactRouter>
			<IonTabs>
				<IonRouterOutlet>
					<Render tabsToComponents={TabsToComponents} />
				</IonRouterOutlet>
				<IonTabBar slot="bottom">
					{/* Bottom tabs for navigation */}
					{TabsToComponents.map((tab, index) => (
						<IonTabButton tab={tab.tab} href={tab.href} key={`navigation-tab-button-${index}`}>
							<IonIcon aria-hidden="true" icon={tab.icon} />
							<IonLabel>{tab.name}</IonLabel>
						</IonTabButton>
					))}
				</IonTabBar>
			</IonTabs>
		</IonReactRouter>
	);
};

export default Router;
