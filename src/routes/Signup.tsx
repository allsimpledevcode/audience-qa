import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Zap, Check } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"
import { supabase } from "@/utils"
import { useState } from "react"

export default function SignUpPage() {
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

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

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (!validateForm()) {
            return
        }

        setIsLoading(true)

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name: name,
                    }
                }
            })

            if (error) {
                setError(error.message)
            } else if (data.user) {
                return navigate('/app/dashboard')
            }
        } catch (error) {
            setError('An unexpected error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-green-50 dark:bg-green-900 flex flex-col">
            <header className=" bg-green-100 dark:bg-green-800">
                <div className="px-4 lg:px-6 h-20 flex items-center container m-auto">
                    <NavLink className="flex items-center justify-center" to="/">
                        <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
                        <span className="ml-2 text-xl font-bold text-green-800 dark:text-green-100">Audience Engage</span>
                    </NavLink>
                    <nav className="ml-auto flex gap-4 sm:gap-6">
                        <NavLink to="/app" className="text-sm font-medium text-green-800 hover:text-green-600 dark:text-green-100 dark:hover:text-green-300">
                            Sign In
                        </NavLink>
                    </nav>
                </div>
            </header>
            <main className="flex-1 flex items-center justify-center p-4 md:p-8">
                <div className="max-w-6xl w-full mx-auto flex flex-col lg:flex-row gap-8">
                    <Card className="w-full lg:w-1/2 bg-white dark:bg-green-800">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-green-800 dark:text-green-100">Create your account</CardTitle>
                            <CardDescription className="text-green-600 dark:text-green-300">
                                Join thousands of organizers enhancing their audience engagement
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSignUp}>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="Enter your name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
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
                                            placeholder="Create a password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="terms" required />
                                        <label
                                            htmlFor="terms"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-green-700 dark:text-green-300"
                                        >
                                            I agree to the terms and conditions
                                        </label>
                                    </div>
                                </div>
                                {error && (
                                    <p className="text-red-500 text-sm mt-2">{error}</p>
                                )}
                                <Button
                                    className="w-full mt-4 bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Signing Up...' : 'Sign Up'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold text-green-800 dark:text-green-100 mb-6">
                            Why choose Audience Engage?
                        </h2>
                        <ul className="space-y-4">
                            {[
                                "Real-time audience interaction",
                                "Comprehensive analytics dashboard",
                                "Customizable polls and surveys",
                                "Live Q&A session management",
                                "Gamification features for increased engagement",
                            ].map((feature, index) => (
                                <li key={index} className="flex items-center space-x-2">
                                    <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                                    <span className="text-green-700 dark:text-green-200">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-6 text-green-700 dark:text-green-200">
                            Join today and transform your events into interactive, engaging experiences!
                        </p>
                    </div>
                </div>
            </main>
            <footer className="py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-green-200 dark:border-green-700 bg-green-100 dark:bg-green-800">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
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