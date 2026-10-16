import { Outlet, useLocation } from "react-router-dom";
import useRouteScrollRestoration from "../../hooks/useRouteScrollRestoration";
import BackToTop from "./BackToTop";
import Footer from "./Footer";
import Navbar from "./Navbar";
import PageStage from "./PageStage";
import Toast from "./Toast";

export default function Layout() {
  const { pathname } = useLocation();
  useRouteScrollRestoration();

  return (
    <div className="flex min-h-dvh max-w-full flex-col overflow-x-clip">
      <Navbar />
      <main className="w-full min-w-0 max-w-full flex-1 overflow-x-clip">
        <PageStage key={pathname}>
          <Outlet />
        </PageStage>
      </main>
      <Footer />
      <Toast />
      <BackToTop />
    </div>
  );
}
