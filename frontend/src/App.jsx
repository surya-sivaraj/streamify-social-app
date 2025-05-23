import {Routes,Route, Navigate} from "react-router"
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import NotificationPage from './pages/NotificationPage'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'
import OnboardingPage from './pages/OnboardingPage'
import {Toaster} from "react-hot-toast"


import PageLoader from "./components/PageLoader.jsx"

import useAuthUser from "./hooks/useAuthUser.js"
import Layout from "./components/Layout.jsx"
import { useThemeStore } from "./store/useThemeStore.js"
import { useEffect } from "react"

const App = () => {

// axios 
// react query tanstack query
const { isLoading, authUser} = useAuthUser()
  const { theme } = useThemeStore();
useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme);
}, [theme]);

const isAuthenticated = Boolean(authUser);
const isOnboarded = authUser?.isOnboarded

if (isLoading) return <PageLoader/>;



// zustand
  return (
    <div className=" h-screen  w-full" >
     
        
    <Routes>
      <Route path="/" element= {  isAuthenticated && isOnboarded ? (<Layout showSidebar={true}>
        <HomePage/>
      </Layout>)  : (<Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>)}/>
      <Route path="/signup" element={ !isAuthenticated ? <SignupPage/> : <Navigate to={isOnboarded ? "/" : "/onboarding"}/>}/>
      <Route path="/login" element={ !isAuthenticated  ? <LoginPage/>  : <Navigate to={isOnboarded ? "/" : "/onboarding"}/>}/>
      <Route path="/notification" element={ isAuthenticated && isOnboarded ? (
        <Layout showSidebar={true}>
          <NotificationPage/>
        </Layout>
      ) :(
        <Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>
      )}/>
      <Route path="/call/:id" element={ isAuthenticated && isOnboarded ? ( <CallPage/> ):(
        <Navigate to={!isAuthenticated ? '/login' : "/onboarding"}/>
      )}/>
     <Route path="/chat/:id" element={ isAuthenticated && isOnboarded ? (
        <Layout showSidebar={false} >
          <ChatPage/>
        </Layout>
      ) :(
        <Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>
      )}/>
      <Route path="/onboarding" element={ isAuthenticated  ? (!isOnboarded ? (<OnboardingPage/>):(<Navigate to='/'/>))
        :
        (<Navigate to="/login"/>)
      }/>
      </Routes>   


      <Toaster/>
    </div>
  )
}

export default App
