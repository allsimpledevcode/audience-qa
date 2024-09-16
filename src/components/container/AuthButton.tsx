import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/utils'

interface User { email?: string | undefined, user_metadata?: { name?: string } }

function UserAvatar() {
    const [user, setUser] = useState<User>({
        email: '',
        user_metadata: {
            name: ''
        }
    })
    const [isSigningOut, setIsSigningOut] = useState(false)
    const router = useNavigate()

    const getUser = async () => {
        const { data: session } = await supabase.auth.getUser();

        if (session && session.user) {
            setUser(session?.user)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    const handleSignOut = async () => {
        setIsSigningOut(true)
        try {
            const { error } = await supabase.auth.signOut()
            if (error) {
                throw error
            }
            router('/app')
        } catch (error) {
            console.error('Error signing out:', error)
            alert('Failed to sign out. Please try again.')
        } finally {
            setIsSigningOut(false)
        }
    }

    let userInitials = null;

    if (user && user.email) {
        userInitials = user?.user_metadata?.name
            ? user?.user_metadata?.name.split(' ').map(n => n[0]).join('').toUpperCase()
            : user?.email.substring(0, 2).toUpperCase()
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-green-500 text-white">
                            {userInitials}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none text-green-700 dark:text-green-300">
                            {user?.user_metadata?.name || 'User'}
                        </p>
                        <p className="text-xs leading-none text-green-500 dark:text-green-400">
                            {user?.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="text-red-600 dark:text-red-400 focus:text-red-700 dark:focus:text-red-300"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{isSigningOut ? 'Signing out...' : 'Sign out'}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserAvatar;