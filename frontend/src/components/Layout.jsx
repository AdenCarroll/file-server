import { Outlet } from "react-router-dom";
import { Container } from "reactstrap";
import AppNavbar from "./Navbar";

export default function Layout() {
  return (
    <>
      <AppNavbar />

      <Container fluid className="py-4 px-4">
        <div className="mx-auto" style={{ maxWidth: 1200 }}>
          <Outlet />
        </div>
      </Container>
    </>
  );
}
