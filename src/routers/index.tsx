import React, {useEffect} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Page} from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "shared/Footer/Footer";
import PageHome from "containers/PageHome/PageHome";
import Header from "shared/Header/Header";
import Page404 from "containers/Page404/Page404";
import ListingStayPage from "containers/ListingStayPage/ListingStayPage";
import ListingStayMapPage from "containers/ListingStayPage/ListingStayMapPage";
import ListingExperiencesPage from "containers/ListingExperiencesPage/ListingExperiencesPage";
import ListingExperiencesMapPage from "containers/ListingExperiencesPage/ListingExperiencesMapPage";
import ListingStayDetailPage from "containers/ListingDetailPage/ListingStayDetailPage";
import ListingExperiencesDetailPage from "containers/ListingDetailPage/ListingExperiencesDetailPage";
import ListingCarPage from "containers/ListingCarPage/ListingCarPage";
import ListingCarMapPage from "containers/ListingCarPage/ListingCarMapPage";
import ListingCarDetailPage from "containers/ListingDetailPage/ListingCarDetailPage";
import CheckOutPage from "containers/CheckOutPage/CheckOutPage";
import PayPage from "containers/PayPage/PayPage";
import AuthorPage from "containers/AuthorPage/AuthorPage";
import AccountPage from "containers/AccountPage/AccountPage";
import AccountPass from "containers/AccountPage/AccountPass";
import AccountSavelists from "containers/AccountPage/AccountSavelists";
import AccountBilling from "containers/AccountPage/AccountBilling";
import PageContact from "containers/PageContact/PageContact";
import PageAbout from "containers/PageAbout/PageAbout";
import PageSignUp from "containers/PageSignUp/PageSignUp";
import PageLogin from "containers/PageLogin/PageLogin";
import PageSubcription from "containers/PageSubcription/PageSubcription";
import BlogPage from "containers/BlogPage/BlogPage";
import BlogSingle from "containers/BlogPage/BlogSingle";
import PageAddListing1 from "containers/PageAddListing1/PageAddListing1";
import PageAddListing2 from "containers/PageAddListing1/PageAddListing2";
import PageAddListing3 from "containers/PageAddListing1/PageAddListing3";
import PageAddListing4 from "containers/PageAddListing1/PageAddListing4";
import PageAddListing5 from "containers/PageAddListing1/PageAddListing5";
import PageAddListing6 from "containers/PageAddListing1/PageAddListing6";
import PageAddListing7 from "containers/PageAddListing1/PageAddListing7";
import PageAddListing8 from "containers/PageAddListing1/PageAddListing8";
import PageAddListing9 from "containers/PageAddListing1/PageAddListing9";
import PageAddListing10 from "containers/PageAddListing1/PageAddListing10";
import PageHome2 from "containers/PageHome/PageHome2";
import MultiStepForm from "../campsitesindia/listing/addlisting/MultiStepForm";
import LoginModal from "../campsitesindia/login/login-modal";
import Login from "../campsitesindia/login/login";
import {useAppDispatch, useAppSelector} from "../campsitesindia/config/store";
import {getSession} from "../shared/reducers/authentication";
import {hasAnyAuthority} from "../shared/auth/private-route";
import {AUTHORITIES} from "../campsitesindia/config/constants";
import Logout from "../campsitesindia/login/logout";
import Signup from "../campsitesindia/signup/Signup";
import ErrorBoundaryRoute from "../shared/error/error-boundary-route";
import Home from "../shared/home/home";
import PrivateRoute from '../shared/auth/private-route';
import Photos from "../campsitesindia/photos/redux/photos";
import OAuth2RedirectHandler from '../utils/OAuth2RedirectHandler';
import PhotosDetail from "../campsitesindia/photos/redux/photos-detail";
import PhotosUpdate from "../campsitesindia/photos/redux/photos-update";
import PhotoNew from "../campsitesindia/photos/redux/photos-new";
import SettingsPage from "../campsitesindia/account/settings/settings";
import UserPage from "../campsitesindia/listing/host/UserPage";
import BookingCheckOutPage from "../campsitesindia/booking/BookingCheckOutPage";
import PaymentDone from "../campsitesindia/booking/PaymentDone";

export const pages: Page[] = [
  { path: "/", exact: true, component: PageHome },
    { path: "/home2", exact: true, component: PageHome2 },


  { path: "/#", exact: true, component: PageHome },
  { path: "/listing-stay", component: ListingStayPage },
  { path: "/listing-stay-map", component: ListingStayMapPage },
  { path: "/listing-stay-detail/:id", component: ListingStayDetailPage },
  //
  {
    path: "/listing-experiences",
    component: ListingExperiencesPage,
  },
  {
    path: "/listing-experiences-map",
    component: ListingExperiencesMapPage,
  },
  {
    path: "/listing-experiences-detail",
    component: ListingExperiencesDetailPage,
  },
  //
  { path: "/listing-car", component: ListingCarPage },
  { path: "/listing-car-map", component: ListingCarMapPage },
  { path: "/listing-car-detail", component: ListingCarDetailPage },
  //
  { path: "/checkout", component: CheckOutPage },
    { path: "/booking/checkout", component: BookingCheckOutPage },
  { path: "/pay-done/:bookingId", component: PaymentDone },
  //
  { path: "/author", component: AuthorPage },
  { path: "/account", component: AccountPage },
  { path: "/account-password", component: AccountPass },
  { path: "/account-savelists", component: AccountSavelists },
  { path: "/account-billing", component: AccountBilling },
  //
  { path: "/blog", component: BlogPage },
  { path: "/blog-single", component: BlogSingle },
  //

    // { path: "/add-listing", component: MultiStepForm },
  { path: "/add-listing-2", component: PageAddListing2 },
  { path: "/add-listing-3", component: PageAddListing3 },
  { path: "/add-listing-4", component: PageAddListing4 },
  { path: "/add-listing-5", component: PageAddListing5 },
  { path: "/add-listing-6", component: PageAddListing6 },
  //{ path: "/add-listing-7", component: PageAddListing7 },
  { path: "/add-listing-8", component: PageAddListing8 },
  { path: "/add-listing-9", component: PageAddListing9 },
  { path: "/add-listing-10", component: PageAddListing10 },
    { path: "/photos/listing/:listingId", component: Photos },
    { path: "/photo-detail/:listingId/:id", component: PhotosDetail },
    { path: "/photo-update/:listingId/:id", component: PhotosUpdate },
    { path: "/addphoto/:listingId/:new", component: PhotoNew },
  //
  { path: "/contact", component: PageContact },
  { path: "/about", component: PageAbout },
  { path: "/signup", component: Signup },
  { path: "/login", component: Login },

  { path: "/subscription", component: PageSubcription },
    { path: "/logout",exact: true, component: Logout },
];

const Routes = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getSession());
        // dispatch(getProfile());
    }, []);
    const sessionHasBeenFetched = useAppSelector(state => state.authentication.sessionHasBeenFetched);

    //const isAuthorized = hasAnyAuthority(account.authorities, hasAnyAuthorities);

    const currentLocale = useAppSelector(state => state.locale.currentLocale);
    const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
    const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));

    return (
    <BrowserRouter>
      <ScrollToTop />
      <Header isAuthenticated={isAuthenticated} isAdmin={isAdmin} />

      <Switch>
        {pages.map(({ component, path, exact }) => {
          return (

            <Route
              key={path}
              component={component}
              exact={!!exact}
              path={path}
            />



          );
        })}
          <ErrorBoundaryRoute path="/add-listing-7/" component={Photos} />
          <PrivateRoute path="/add-listing" component={MultiStepForm} hasAnyAuthorities={[AUTHORITIES.USER]} />
          {/*<PrivateRoute path="/add-bookings/new" component={BookingsUpdate} hasAnyAuthorities={[AUTHORITIES.USER]} />*/}
          <PrivateRoute path="/settings" component={SettingsPage} hasAnyAuthorities={[AUTHORITIES.USER]} />
          <PrivateRoute path="/user-page" component={UserPage} hasAnyAuthorities={[AUTHORITIES.USER]} />
          <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
        <Route component={Page404} />

      </Switch>

      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
