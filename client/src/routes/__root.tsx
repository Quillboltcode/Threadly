import { createRootRoute, Outlet } from "@tanstack/react-router";
import LeftSidebar from "../components/LeftSidebar";
import MainContent from "../components/MainContent";
import RightSidebar from "../components/RightSidebar";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";


export const Route = createRootRoute({
  component: () => (
    <>
    <div className="h-screen flex flex-row bg-gray-900 text-white relative">
      <LeftSidebar  />
      <MainContent />
      <RightSidebar />
    </div>
        <Outlet />
        {import.meta.env.DEV && <TanStackRouterDevtools />}
    </>
  ),
});