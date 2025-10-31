"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Film, Menu, X, LogOut } from "lucide-react"
import { useState } from "react"
import { useSession, authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

interface HeaderProps {
  onLoginClick?: () => void
  onSignupClick?: () => void
}

export default function Header({ onLoginClick, onSignupClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session, isPending, refetch } = useSession()
  const router = useRouter()

  const handleSignOut = async () => {
    const token = localStorage.getItem("bearer_token")
    const { error } = await authClient.signOut({
      fetchOptions: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    })
    if (!error) {
      localStorage.removeItem("bearer_token")
      refetch()
      router.push("/")
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <Film className="h-8 w-8 text-primary group-hover:text-accent transition-colors" />
            <div className="absolute inset-0 bg-accent/20 blur-xl group-hover:bg-accent/40 transition-all" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            WatchAura
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/dashboard" className="text-sm font-medium hover:text-accent transition-colors">
            Dashboard
          </Link>
          <Link href="/social" className="text-sm font-medium hover:text-accent transition-colors">
            Social
          </Link>
          <Link href="/#features" className="text-sm font-medium hover:text-accent transition-colors">
            Features
          </Link>
          
          {!isPending && session?.user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                {session.user.name || session.user.email}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-destructive/50 hover:bg-destructive/10"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="hover:text-accent"
                onClick={onLoginClick}
              >
                Sign In
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-accent/50 hover:bg-accent/10"
                onClick={onSignupClick}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link
              href="/dashboard"
              className="block text-sm font-medium hover:text-accent transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/social"
              className="block text-sm font-medium hover:text-accent transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Social
            </Link>
            <Link
              href="/#features"
              className="block text-sm font-medium hover:text-accent transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            
            {!isPending && session?.user ? (
              <>
                <div className="py-2 text-sm text-muted-foreground">
                  {session.user.name || session.user.email}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-destructive/50 hover:bg-destructive/10"
                  onClick={() => {
                    handleSignOut()
                    setMobileMenuOpen(false)
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    onLoginClick?.()
                    setMobileMenuOpen(false)
                  }}
                >
                  Sign In
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-accent/50 hover:bg-accent/10"
                  onClick={() => {
                    onSignupClick?.()
                    setMobileMenuOpen(false)
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}