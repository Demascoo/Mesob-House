import { Outlet } from "react-router-dom";
import TopBar from "./components/TopBar";
import BottomNav from "./components/BottomNav";
import Footer from "./components/Footer";
import ErrorBoundary from "./ErrorBoundary";

export default function Layout() {
  return (
    <div className="app">
      <TopBar />
      <main className="main">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
