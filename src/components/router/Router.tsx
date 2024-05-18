import {
  IonIcon, IonLabel,
  IonRouterOutlet, IonTabBar, IonTabButton, IonTabs,
} from "@ionic/react";
import "@pages/list/Tab1.css";
import React from "react";
import { IonReactRouter } from "@ionic/react-router";
import Render from "@components/router/Render";
import { compass, mapOutline, person } from "ionicons/icons";
import HuntingList from "@pages/list/HuntingList";
import Tab2 from "@pages/Tab2";
import Tab3 from "@pages/Tab3";

export interface TabsToComponentsProps {
  name: string,
  tab: string,
  href: string,
  icon: string,
  render: React.ReactElement,
}

const Router: React.FC = () => {

  // Routes for bottom tabs with component render
  const TabsToComponents: TabsToComponentsProps[] = [
    {
      name: "Hunting list",
      tab: "list",
      href: "/list",
      icon: mapOutline,
      render: <HuntingList />
    },
    {
      name: "Active hunts",
      tab: "active",
      href: "/active",
      icon: compass,
      render: <Tab2 />
    },
    {
      name: "My account",
      tab: "account",
      href: "/account",
      icon: person,
      render: <Tab3 />
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
            ),
          )}
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default Router;
