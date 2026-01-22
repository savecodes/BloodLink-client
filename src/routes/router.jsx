import { createBrowserRouter, Outlet } from "react-router";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/Home/HomePage/HomePage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import ForgetPassword from "../pages/Auth/ForgetPassword/ForgetPassword";
import NotFound from "../components/NotFound/NotFound";

import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import MyProfile from "../pages/Dashboard/Shared/MyProfile/MyProfile";
import CreateDonationRequest from "../pages/Dashboard/Shared/CreateDonationRequest/CreateDonationRequest";
import MyRequests from "../pages/Dashboard/Shared/MyRequests/MyRequests";
import EditDonationRequest from "../pages/Dashboard/Shared/EditDonationRequest/EditDonationRequest";
import DonationRequestDetails from "../pages/Shared/DonationRequestDetails/DonationRequestDetails";

import SearchDonors from "../pages/SearchDonorsPage/SearchDonors";
import DonationsRequests from "../pages/DonationsRequestsPage/DonationsRequests";
import AboutUs from "../pages/AboutUsPage/AboutUs";

import AllUsers from "../pages/Dashboard/Admin/AllUsers";
import AllDonationsRequests from "../pages/Dashboard/Admin/AllDonationsRequests";

import MakeDonations from "../pages/Dashboard/Donor/MakeDonations";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancel from "../pages/Dashboard/Payment/PaymentCancel";

import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import VolunteerRoute from "./VolunteerRoute";
import DonorGuidelines from "../pages/Shared/Footer/Resources/DonorGuidelines";
import BloodTypes from "../pages/Shared/Footer/Resources/bloodTypes";
import Faqs from "../pages/Shared/FAQ/Faqs";
import ContactPage from "../pages/Shared/ContactPage/ContactPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "search-donors", Component: SearchDonors },
      { path: "donations-requests", Component: DonationsRequests },
      {
        path: "donations-requests/:id",
        element: (
          <PrivateRoute>
            <DonationRequestDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "about-us",
        Component: AboutUs,
      },
      {
        path: "donor-guidelines",
        Component: DonorGuidelines,
      },
      {
        path: "donor-guidelines",
        Component: DonorGuidelines,
      },
      {
        path: "blood-types",
        Component: BloodTypes,
      },
      {
        path: "faq",
        Component: Faqs,
      },
      {
        path: "contact",
        Component: ContactPage,
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
      {
        path: "forgot-password",
        Component: ForgetPassword,
      },
    ],
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
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
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },

      {
        path: "all-blood-donation-request",
        element: (
          <VolunteerRoute>
            <Outlet />
          </VolunteerRoute>
        ),
        children: [
          {
            index: true,
            Component: AllDonationsRequests,
          },
          {
            path: "details/:id",
            Component: DonationRequestDetails,
          },
        ],
      },

      {
        path: "my-donation-requests",
        element: (
          <PrivateRoute>
            <Outlet />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            Component: MyRequests,
          },
          {
            path: "details/:id",
            Component: DonationRequestDetails,
          },
          {
            path: "edit/:id",
            Component: EditDonationRequest,
          },
        ],
      },

      {
        path: "create-donation-request",
        element: (
          <PrivateRoute>
            <CreateDonationRequest />
          </PrivateRoute>
        ),
      },
      {
        path: "make-donation",
        element: (
          <PrivateRoute>
            <MakeDonations />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-cancelled",
        element: (
          <PrivateRoute>
            <PaymentCancel />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "*",
    Component: NotFound,
  },
]);

export default router;
