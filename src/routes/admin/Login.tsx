import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Zap, ArrowRight } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"
import { useState } from "react"
import { supabase } from "@/utils"
import { withAuth } from "@/components/hoc/withAuth"

function SignInPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const validateForm = () => {
        if (!email) {
            setError('Email is required')
            return false
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Invalid email format')
            return false
        }
        if (!password) {
            setError('Password is required')
            return false
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long')
            return false
        }
        return true
    }

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (!validateForm()) {
            return
        }

        setIsLoading(true)

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                setError(error.message)
            } else if (data.user) {
                if (rememberMe) {
                    // Set a longer session expiration
                    await supabase.auth.updateUser({ data: { rememberMe: true } })
                }
                navigate('/app/dashboard')
            }
        } catch (error) {
            setError('An unexpected error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-green-50 dark:bg-green-900 flex flex-col">
            <header className="bg-green-100 dark:bg-green-800">
                <div className="px-4 lg:px-6 h-20 flex items-center container m-auto">
                    <NavLink to="/" className="flex items-center justify-center">
                        <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
                        <span className="ml-2 text-xl font-bold text-green-800 dark:text-green-100">Audience Engage</span>
                    </NavLink>
                    <nav className="ml-auto flex gap-4 sm:gap-6">
                        <NavLink to="/signup" className="text-sm font-medium text-green-800 hover:text-green-600 dark:text-green-100 dark:hover:text-green-300">
                            Sign Up
                        </NavLink>
                    </nav>
                </div>
            </header>
            <main className="flex-1 flex items-center justify-center p-4 md:p-8">
                <div className="max-w-md w-full mx-auto">
                    <Card className="bg-white dark:bg-green-800">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-green-800 dark:text-green-100">Welcome back</CardTitle>
                            <CardDescription className="text-green-600 dark:text-green-300">
                                Sign in to your Audience Engage account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSignIn}>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            placeholder="Enter your email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            placeholder="Enter your password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="remember"
                                                checked={rememberMe}
                                                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                                            />
                                            <label
                                                htmlFor="remember"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-green-700 dark:text-green-300"
                                            >
                                                Remember me
                                            </label>
                                        </div>
                                        {/* <Link href="/forgot-password" className="text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
                                            Forgot password?
                                        </Link> */}
                                    </div>
                                    {error && (
                                        <p className="text-red-500 text-sm">{error}</p>
                                    )}
                                    <Button
                                        type="submit"
                                        className="w-full bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Signing In...' : 'Sign In'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                    <div className="mt-8 space-y-4">
                        <h2 className="text-xl font-semibold text-green-800 dark:text-green-100">
                            Why use Audience Engage?
                        </h2>
                        <ul className="space-y-2">
                            {[
                                "Boost audience participation in real-time",
                                "Gain valuable insights through interactive polls",
                                "Seamlessly manage Q&A sessions",
                                "Enhance engagement with gamification features",
                                "Access comprehensive analytics for data-driven decisions",
                            ].map((feature, index) => (
                                <li key={index} className="flex items-center space-x-2 text-green-700 dark:text-green-200">
                                    <ArrowRight className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </main>
            <footer className="py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-green-200 dark:border-green-700 bg-green-100 dark:bg-green-800">
                <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-green-700 dark:text-green-300">
                        © 2023 Audience Engage. All rights reserved.
                    </p>
                    <nav className="flex gap-4 sm:gap-6">
                        <a className="text-xs text-green-700 hover:text-green-600 dark:text-green-300 dark:hover:text-green-200" href="#">
                            Terms of Service
                        </a>
                        <a className="text-xs text-green-700 hover:text-green-600 dark:text-green-300 dark:hover:text-green-200" href="#">
                            Privacy Policy
                        </a>
                        <a className="text-xs text-green-700 hover:text-green-600 dark:text-green-300 dark:hover:text-green-200" href="#">
                            Contact Us
                        </a>
                    </nav>
                </div>
            </footer>
        </div>
    )
}

export default withAuth(SignInPage)