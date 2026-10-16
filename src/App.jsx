import { MotionConfig } from "framer-motion";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GuestOnly, RequireAuth } from "./components/auth/RouteGuards";
import SplashScreen from "./components/auth/SplashScreen";
import Layout from "./components/layout/Layout";
import RippleLayer from "./components/ui/RippleLayer";
import { AuthProvider } from "./context/AuthContext";
import { MarketplaceProvider } from "./context/MarketplaceContext";
import LandingPage from "./pages/landing/LandingPage";
import ListingsPage from "./pages/listings/ListingsPage";
import PropertyDetailPage from "./pages/property/PropertyDetailPage";
import WishlistPage from "./pages/wishlist/WishlistPage";
import ComparePage from "./pages/compare/ComparePage";
import AgentsPage from "./pages/agents/AgentsPage";
import AgentProfilePage from "./pages/agents/AgentProfilePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import SubmitPropertyPage from "./pages/submit/SubmitPropertyPage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <AuthProvider>
          <MarketplaceProvider>
            <Routes>
              <Route element={<GuestOnly />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
              </Route>
              <Route element={<RequireAuth />}>
                <Route element={<Layout />}>
                  <Route index element={<LandingPage />} />
                  <Route path="listings" element={<ListingsPage />} />
                  <Route path="property/:id" element={<PropertyDetailPage />} />
                  <Route path="wishlist" element={<WishlistPage />} />
                  <Route path="compare" element={<ComparePage />} />
                  <Route path="agents" element={<AgentsPage />} />
                  <Route path="agents/:id" element={<AgentProfilePage />} />
                  <Route path="submit" element={<SubmitPropertyPage />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Route>
            </Routes>
            <SplashScreen />
            <RippleLayer />
          </MarketplaceProvider>
        </AuthProvider>
      </BrowserRouter>
    </MotionConfig>
  );
}
