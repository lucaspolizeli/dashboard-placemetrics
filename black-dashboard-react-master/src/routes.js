import Dashboard from "views/Dashboard.jsx";
import DataHistory from "views/DataHistory.jsx";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/dataHistory",
    name: "Histórico de Registros",
    icon: "tim-icons icon-bullet-list-67",
    component: DataHistory,
    layout: "/admin"
  }
];
export default routes;
