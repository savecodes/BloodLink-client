import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/Home/HomePage/HomePage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import NotFound from "../components/NotFound/NotFound";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import CreateDonationRequest from "../pages/Dashboard/CreateDonationRequest/CreateDonationRequest";
import MyRequests from "../pages/Dashboard/MyRequests/MyRequests";
import DonationRequestDetails from "../pages/Dashboard/Shared/DonationRequestDetails/DonationRequestDetails";
import EditDonationRequest from "../pages/Dashboard/Shared/EditDonationRequest/EditDonationRequest";
import SearchDonors from "../pages/SearchDonorsPage/SearchDonors";
import DonationsRequests from "../pages/DonationsRequestsPage/DonationsRequests";
import AboutUs from "../pages/AboutUsPage/AboutUs";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "/search-donors",
        Component: SearchDonors,
      },
      {
        path: "/donations-requests",
        Component: DonationsRequests,
      },
      {
        path: "/about-us",
        Component: AboutUs,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "profile",
        Component: MyProfile,
      },
      {
        path: "my-donation-requests",
        children: [
          {
            index: true,
            Component: MyRequests,
          },
          {
            path: "details/:id",
            Component: DonationRequestDetails, // VIEW
          },
          {
            path: "edit/:id",
            Component: EditDonationRequest, // EDIT
          },
        ],
      },
      {
        path: "create-donation-request",
        Component: CreateDonationRequest,
      },
      {
        path: "funding",
        Component: DashboardHome,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export default router;
