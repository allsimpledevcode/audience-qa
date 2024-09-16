import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Users, Zap, MessageSquare } from "lucide-react"
import { NavLink } from "react-router-dom"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-green-50 dark:bg-green-900">
      <header className="bg-green-100 dark:bg-green-800">
        <div className="container m-auto px-4 lg:px-6 h-20 flex items-center">
          <a className="flex items-center justify-center" href="#">
            <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
            <span className="ml-2 text-xl font-bold text-green-800 dark:text-green-100">Audience Engage</span>
          </a>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <NavLink to="/signup" className="text-sm font-medium text-green-800 hover:text-green-600 dark:text-green-100 dark:hover:text-green-300">
              Sign Up
            </NavLink>
            <NavLink to="/app" className="text-sm font-medium text-green-800 hover:text-green-600 dark:text-green-100 dark:hover:text-green-300">
              Sign In
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container m-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-green-800 dark:text-green-100">
                  Engage Your Audience Like Never Before
                </h1>
                <p className="mx-auto max-w-[700px] text-green-700 md:text-xl dark:text-green-200">
                  Boost interaction, gather insights, and create memorable experiences with our powerful audience engagement platform.
                </p>
              </div>
              <div className="space-x-4">
                <NavLink to="/signup" className="bg-green-600 border border-green-600 h-9 px-4 py-2 text-sm rounded text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">Get Started</NavLink>
                <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-100 dark:text-green-400 dark:border-green-400 dark:hover:bg-green-800">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-100 dark:bg-green-800">
          <div className="container m-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-green-800 dark:text-green-100">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white dark:bg-green-700">
                <CardHeader>
                  <BarChart className="h-8 w-8 mb-2 text-green-600 dark:text-green-300" />
                  <CardTitle className="text-green-800 dark:text-green-100">Real-time Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-700 dark:text-green-200">
                    Get instant insights into your audience's engagement levels, preferences, and behavior patterns.
                    Our advanced analytics dashboard provides actionable data to help you make informed decisions
                    and optimize your content strategy in real-time.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-green-700">
                <CardHeader>
                  <Users className="h-8 w-8 mb-2 text-green-600 dark:text-green-300" />
                  <CardTitle className="text-green-800 dark:text-green-100">Interactive Polls & Surveys</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-700 dark:text-green-200">
                    Create engaging polls and surveys to gather valuable feedback from your audience.
                    With customizable templates and real-time results, you can quickly gauge audience opinions,
                    preferences, and satisfaction levels, enabling you to tailor your content and offerings accordingly.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-green-700">
                <CardHeader>
                  <MessageSquare className="h-8 w-8 mb-2 text-green-600 dark:text-green-300" />
                  <CardTitle className="text-green-800 dark:text-green-100">Live Q&A Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-700 dark:text-green-200">
                    Foster direct communication with live question and answer sessions. Our platform allows
                    for moderated, real-time interactions between speakers and audience members, enhancing
                    engagement and providing valuable insights. Easily manage and prioritize questions for a
                    smooth Q&A experience.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container m-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-green-800 dark:text-green-100">Ready to Engage?</h2>
                <p className="mx-auto max-w-[600px] text-green-700 md:text-xl dark:text-green-200">
                  Join thousands of organizations already transforming their audience interactions.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1 bg-white dark:bg-green-700 text-green-800 dark:text-green-100" placeholder="Enter your email" type="email" />
                  <Button type="submit" className="bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">Subscribe</Button>
                </form>
                <p className="text-xs text-green-700 dark:text-green-300">
                  By subscribing, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="px-4 md:px-6 border-t border-green-200 dark:border-green-700 bg-green-100 dark:bg-green-800">
        <div className="container m-auto flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center ">
          <p className="text-xs text-green-700 dark:text-green-300">
            © 2023 Audience Engage. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <a className="text-xs text-green-700 hover:text-green-600 dark:text-green-300 dark:hover:text-green-200">
              Terms of Service
            </a>
            <a className="text-xs text-green-700 hover:text-green-600 dark:text-green-300 dark:hover:text-green-200">
              Privacy
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}