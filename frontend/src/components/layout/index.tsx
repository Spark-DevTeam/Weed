import { Outlet } from "react-router-dom";
import { Navigation } from "@/components";

export const Layout = () => {
  return (
    <div>
      <Outlet />
      <Navigation />
    </div>
  )
}