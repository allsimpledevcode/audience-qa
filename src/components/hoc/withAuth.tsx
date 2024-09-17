'use client'

import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/utils'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../AppContext'

// Define the props that will be passed to the wrapped component
interface WithAuthProps {
  user: User
}

export function withAuth<P extends WithAuthProps>(
  WrappedComponent: React.ComponentType<P>
) {
  // Create a new component that will handle the auth logic
  const AuthWrapper: React.FC<Omit<P, keyof WithAuthProps>> = (props) => {
    const [user, setUser] = useState<User | null>(null)
    // const [loading, setLoading] = useState(true)
    const router = useNavigate()

    useEffect(() => {
      const checkUser = async () => {
        try {
          const { data: { user }, error } = await supabase.auth.getUser()
          if (error) {
            throw error
          }
          if (user) {
            setUser(user)
          } else {
            router('/app')
          }
        } catch (error) {
          console.error('Error checking auth status:', error)
          router('/app')
        } finally {
          // setLoading(false)
        }
      }

      checkUser()

      // Set up a listener for auth state changes
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === 'SIGNED_IN') {
            setUser(session?.user ?? null)
          } else if (event === 'SIGNED_OUT') {
            setUser(null)
            router('/app')
          }
        }
      )

      // Clean up the listener when the component unmounts
      return () => {
        authListener.subscription.unsubscribe()
      }
    }, [router, supabase])

    // // Show a loading state while checking auth
    // if (loading) {
    //   return <div>Loading...</div>
    // }

    // If we have a user, render the wrapped component with the user prop
    // if (user) {
      return <AppContext.Provider value={{ user: user }}><WrappedComponent {...(props as P)} user={user} /></AppContext.Provider>
    // }

    // If we don't have a user, this will never be reached because we redirect in useEffect
    return null
  }

  // Set the display name for the HOC
  AuthWrapper.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`

  return AuthWrapper
}