"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToLogin: () => void
}

export default function SignupModal({ isOpen, onClose, onSwitchToLogin }: SignupModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      setIsLoading(false)
      return
    }

    const { error: authError } = await authClient.signUp.email({
      email,
      name,
      password
    })

    if (authError?.code) {
      const errorMap: Record<string, string> = {
        USER_ALREADY_EXISTS: "Email already registered. Please sign in instead."
      }
      setError(errorMap[authError.code] || "Registration failed. Please try again.")
      setIsLoading(false)
      return
    }

    // Success - redirect to login
    setIsLoading(false)
    onClose()
    router.push("/login?registered=true")
    // Switch to login modal
    onSwitchToLogin()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">Create account</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Join watchAura and discover your perfect movies
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-background border-border text-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-email" className="text-foreground">Email</Label>
            <Input
              id="signup-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background border-border text-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-password" className="text-foreground">Password</Label>
            <Input
              id="signup-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="off"
              className="bg-background border-border text-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-foreground">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="off"
              className="bg-background border-border text-foreground"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <button
            onClick={onSwitchToLogin}
            className="text-accent hover:underline font-medium"
          >
            Sign in
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}