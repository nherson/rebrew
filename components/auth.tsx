

// import { useAuth } from "use-auth0-hooks";
// //import Router from "next/router";

// // This component is meant to be a global redirect in the event
// // that a user reaches the site and is not authenticated.
// // In this case, the user will be redirected to the login page.

// export interface Auth0RedirectOptions {
//     children: JSX.Element;
//     redirectUri: string;
// }
// export default function Auth0Redirect(
//     { children, 
//       redirectUri,
//     }: Auth0RedirectOptions): JSX.Element
// {
//     const { isAuthenticated, isLoading, user } = useAuth()
//     if (!isAuthenticated) {
//         window.location.href = redirectUri
//     } else {
//         return children
//     }
// }


import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import _ from 'lodash'
import fetch from '../lib/fetch'
const AuthContext = createContext(null)

function AuthProvider({ children }) {
  const { pathname, events } = useRouter()
  const [user, setUser] = useState()

  async function getUser() {
    try {
      const response = await fetch(
        '/api/auth/me',
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
        },
      )
      const profile = await response.json()
      if (!_.isNil(profile.error)) {
        console.log("NOT LOGGED IN")
        setUser(null)
      } else {
        console.log("LOGGED IN")
        setUser(profile)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getUser()
  }, [pathname])

  useEffect(() => {
      console.log("CHECKING")
    // Check that a new route is OK
    const handleRouteChange = url => {
      if (_.isNil(user)) {
        console.log("SHOULD REDIRECT")
        window.location.href = '/api/auth/login'
      }
    }

    // Check that initial route is OK
    if (_.isNil(user)) {
        console.log("SHOULD REDIRECT INITIAL")
      window.location.href = '/api/auth/login'
    }

    // Monitor routes
    events.on('routeChangeStart', handleRouteChange)
    return () => {
      events.off('routeChangeStart', handleRouteChange)
    }
  }, [user])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
