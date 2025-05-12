import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import {BrowserRouter,Route,Routes}from 'react-router-dom';
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Login  from "./Pages/login";
import Signup from "./Pages/Signup";
import Google from "./Pages/google";
import Manual from "./Pages/Signup/manual";
import Gigs from "./Pages/gigs";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import AIArtistsMarketplace from "./Pages/gigs";


import Gig from "./Pages/gig";
import Orders from "./Pages/orders";
import Add from "./Pages/add";
import Inbox from "./Pages/inbox";
import Scrollnav from "./Components/scrollnav/scrollnav.jsx";
import Update from "./Pages/update/index.jsx";
import Otpverification from "./Pages/otpverification"
import Regerror from "./Pages/registrationerror"




const queryClient = new QueryClient();




function App() {
//   const Layout = () => {
//     return (
//       <div className="app">
//         <QueryClientProvider client={queryClient}>

//           <AIArtistsMarketplace/>
//           {/* Removed Navbar, Outlet, and Footer as they are not defined */}
//           <div>Main Content</div> {/* Placeholder for main content */}
//         </QueryClientProvider>
//       </div>
//     );
//   };
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Header />
      <Scrollnav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/google" element={<Google />} />
        <Route path="/manual" element={<Manual />} />
        <Route path="/gigs" element={<Gigs />} />
        <Route path="/gig" element={<Gig />} />
        <Route path="/gig/:id" element={<Gig />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/add" element={<Add />} />
        <Route path="/inbox"element={<Inbox/>}/>
        <Route path="/update/:email" element={<Update />}/>
        
        <Route path="/otpverification/:email" element={<Otpverification />}/>
        <Route path="/regerror" element={<Regerror />}/>
      


        
        
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  );
}



export default App;
