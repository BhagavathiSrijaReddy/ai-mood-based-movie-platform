"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import SignupModal from "@/components/SignupModal";
import { Sparkles, Users, Mic, TrendingUp, Play, Heart } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onLoginClick={() => setLoginOpen(true)} onSignupClick={() => setSignupOpen(true)} />
      
      {/* Hero Section */}
      <section className="relative flex-1 overflow-hidden bg-gradient-to-b from-background via-background to-card">
        <div className="absolute inset-0 geometric-bg" />
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 text-accent text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              AI-Powered Movie Discovery
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
              Discover Movies That
              <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Match Your Mood
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of entertainment with AI-powered recommendations, 
              voice interactions, and social features that bring friends together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 shadow-lg shadow-primary/20"
                onClick={() => setSignupOpen(true)}>
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-accent/50 hover:bg-accent/10 hover:border-accent"
                asChild>
                <Link href="/dashboard">
                  <Play className="mr-2 h-4 w-4" />
                  Explore Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Powerful Features</h2>
            <p className="text-muted-foreground text-lg">
              Everything you need for the perfect viewing experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-xl hover:shadow-primary/10 transition-all border-border/50 hover:border-primary/50 bg-card">
              <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Mood-Based Discovery</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your mood and viewing patterns to recommend perfect matches
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl hover:shadow-primary/10 transition-all border-border/50 hover:border-primary/50 bg-card">
              <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Trending Content</h3>
              <p className="text-muted-foreground">
                Stay updated with top-rated movies and shows, prioritized by IMDb ratings
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl hover:shadow-primary/10 transition-all border-border/50 hover:border-primary/50 bg-card">
              <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                <Mic className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Voice AI Assistant</h3>
              <p className="text-muted-foreground">
                Get movie summaries, ratings, and details through voice commands
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl hover:shadow-primary/10 transition-all border-border/50 hover:border-primary/50 bg-card">
              <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Watch Together</h3>
              <p className="text-muted-foreground">
                Enjoy movies with friends through our FaceTime-style watch-together mode
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl hover:shadow-primary/10 transition-all border-border/50 hover:border-primary/50 bg-card">
              <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Friend Blending</h3>
              <p className="text-muted-foreground">
                Discover content based on shared tastes with your friend circle
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl hover:shadow-primary/10 transition-all border-border/50 hover:border-primary/50 bg-card">
              <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                <Play className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Instant Preview</h3>
              <p className="text-muted-foreground">
                Quick-access panels for trending content and trailers for instant discovery
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-card/50 to-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Ready to Transform Your Viewing?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already enjoying personalized movie recommendations
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 shadow-lg shadow-primary/20"
            onClick={() => setSignupOpen(true)}>
            Start Watching Now
          </Button>
        </div>
      </section>

      <Footer />

      {/* Modals */}
      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSwitchToSignup={() => {
          setLoginOpen(false);
          setSignupOpen(true);
        }} />

      <SignupModal
        isOpen={signupOpen}
        onClose={() => setSignupOpen(false)}
        onSwitchToLogin={() => {
          setSignupOpen(false);
          setLoginOpen(true);
        }} />
    </div>
  );
}