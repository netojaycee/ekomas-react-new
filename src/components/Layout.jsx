import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Nav from "./Nav";
import Loader from "./Loader";
import { useLoading } from "../context/LoadingContext";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";

const Layout = () => {
  const { isLoading } = useLoading();
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <main className="overflow-x-hidden">
          <Nav />
          <Outlet />
          <Footer />
        </main>
      )}
    </>
  );
};

export default Layout;
