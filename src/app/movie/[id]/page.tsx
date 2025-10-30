"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Play, Plus, Share2, Mic, Volume2, Clock, Calendar, Users } from "lucide-react"
import Image from "next/image"

// Mock movie details
const movieDetails = {
  id: 1,
  title: "The Shawshank Redemption",
  tagline: "Fear can hold you prisoner. Hope can set you free.",
  rating: 9.3,
  votes: "2.5M",
  runtime: "142 min",
  releaseDate: "September 23, 1994",
  genres: ["Drama", "Crime"],
  director: "Frank Darabont",
  cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton", "William Sadler"],
  description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency. The story follows Andy Dufresne, a banker who is sentenced to life in Shawshank State Penitentiary for the murder of his wife and her lover, despite his claims of innocence.",
  image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=1200&fit=crop",
  backdrop: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop",
  trailer: "https://www.youtube.com/embed/6hB3S9bIaco",
  episodes: [
    { season: 1, episode: 1, title: "Pilot", duration: "45 min", thumbnail: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=225&fit=crop" },
    { season: 1, episode: 2, title: "The Beginning", duration: "42 min", thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=225&fit=crop" },
    { season: 1, episode: 3, title: "New Horizons", duration: "44 min", thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=225&fit=crop" },
  ]
}

export default function MovieDetail() {
  const params = useParams()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  const handleVoiceSummary = () => {
    setIsSpeaking(!isSpeaking)
    if (!isSpeaking) {
      // Simulate AI voice summary
      const summary = `${movieDetails.title}. ${movieDetails.tagline}. Rated ${movieDetails.rating} out of 10. ${movieDetails.description}`
      
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(summary)
        utterance.rate = 0.9
        window.speechSynthesis.speak(utterance)
        utterance.onend = () => setIsSpeaking(false)
      }
    } else {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Backdrop Section */}
        <div className="relative h-[60vh] overflow-hidden">
          <Image
            src={movieDetails.backdrop}
            alt={movieDetails.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-8">
            <div className="flex flex-col md:flex-row gap-8 items-end">
              {/* Poster */}
              <Card className="relative w-48 h-72 flex-shrink-0 overflow-hidden">
                <Image
                  src={movieDetails.image}
                  alt={movieDetails.title}
                  fill
                  className="object-cover"
                />
              </Card>

              {/* Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-2">{movieDetails.title}</h1>
                  <p className="text-lg text-muted-foreground italic">{movieDetails.tagline}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {movieDetails.genres.map((genre) => (
                    <Badge key={genre} variant="secondary" className="bg-accent/10 text-accent">
                      {genre}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    <span className="font-bold text-lg">{movieDetails.rating}</span>
                    <span className="text-muted-foreground">({movieDetails.votes} votes)</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {movieDetails.runtime}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {movieDetails.releaseDate}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="bg-accent hover:bg-accent/90">
                    <Play className="mr-2 h-5 w-5" />
                    Watch Now
                  </Button>
                  <Button size="lg" variant="outline">
                    <Plus className="mr-2 h-5 w-5" />
                    My List
                  </Button>
                  <Button size="lg" variant="outline">
                    <Share2 className="mr-2 h-5 w-5" />
                    Share
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className={isSpeaking ? "bg-accent/10 border-accent" : ""}
                    onClick={handleVoiceSummary}
                  >
                    {isSpeaking ? (
                      <>
                        <Volume2 className="mr-2 h-5 w-5 animate-pulse" />
                        Speaking...
                      </>
                    ) : (
                      <>
                        <Mic className="mr-2 h-5 w-5" />
                        AI Voice Summary
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="trailer">Trailer</TabsTrigger>
              <TabsTrigger value="episodes">Episodes</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {movieDetails.description}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">Cast</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {movieDetails.cast.map((actor) => (
                        <Card key={actor} className="p-4 text-center">
                          <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-accent/10 flex items-center justify-center">
                            <Users className="h-8 w-8 text-accent" />
                          </div>
                          <p className="text-sm font-medium">{actor}</p>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className="p-6">
                    <h3 className="font-semibold mb-4">Movie Info</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Director</p>
                        <p className="font-medium">{movieDetails.director}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Release Date</p>
                        <p className="font-medium">{movieDetails.releaseDate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Runtime</p>
                        <p className="font-medium">{movieDetails.runtime}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Genres</p>
                        <p className="font-medium">{movieDetails.genres.join(", ")}</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-accent/5 border-accent/20">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Mic className="h-5 w-5 text-accent" />
                      AI Features
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Use voice commands to get movie information, summaries, and recommendations.
                    </p>
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={handleVoiceSummary}
                    >
                      Try Voice Assistant
                    </Button>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="trailer">
              <Card className="overflow-hidden">
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={movieDetails.trailer}
                    title="Movie Trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="episodes">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Season 1</h2>
                  <Badge variant="secondary">{movieDetails.episodes.length} Episodes</Badge>
                </div>
                <div className="grid gap-4">
                  {movieDetails.episodes.map((episode) => (
                    <Card key={episode.episode} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="flex gap-4">
                        <div className="relative w-40 aspect-video flex-shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={episode.thumbnail}
                            alt={episode.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-colors">
                            <Play className="h-10 w-10 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold">
                                Episode {episode.episode}: {episode.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">{episode.duration}</p>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Join the adventure in this thrilling episode as the story unfolds with unexpected twists and turns.
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
