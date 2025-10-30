"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/lib/auth-client"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Star, Play, Search, Smile, Frown, Meh, Heart, TrendingUp, Clock, Zap, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock movie data
const trendingMovies = [
  { id: 1, title: "The Shawshank Redemption", rating: 9.3, genre: "Drama", year: 1994, image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop" },
  { id: 2, title: "The Godfather", rating: 9.2, genre: "Crime", year: 1972, image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop" },
  { id: 3, title: "The Dark Knight", rating: 9.0, genre: "Action", year: 2008, image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop" },
  { id: 4, title: "Inception", rating: 8.8, genre: "Sci-Fi", year: 2010, image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop" },
  { id: 5, title: "Interstellar", rating: 8.7, genre: "Sci-Fi", year: 2014, image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=600&fit=crop" },
  { id: 6, title: "Pulp Fiction", rating: 8.9, genre: "Crime", year: 1994, image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop" },
]

// Mood-based movie collections
const moodMovies = {
  Happy: [
    { id: 11, title: "The Grand Budapest Hotel", rating: 8.1, genre: "Comedy", year: 2014, image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&h=600&fit=crop" },
    { id: 12, title: "Amélie", rating: 8.3, genre: "Romance", year: 2001, image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&h=600&fit=crop" },
    { id: 13, title: "Up", rating: 8.3, genre: "Animation", year: 2009, image: "https://images.unsplash.com/photo-1574267432644-f610fd56e5c4?w=400&h=600&fit=crop" },
    { id: 14, title: "La La Land", rating: 8.0, genre: "Romance", year: 2016, image: "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=400&h=600&fit=crop" },
    { id: 15, title: "Toy Story", rating: 8.3, genre: "Animation", year: 1995, image: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=400&h=600&fit=crop" },
    { id: 16, title: "Crazy Rich Asians", rating: 6.9, genre: "Comedy", year: 2018, image: "https://images.unsplash.com/photo-1542204625-ca6c2d746cca?w=400&h=600&fit=crop" },
  ],
  Sad: [
    { id: 17, title: "Schindler's List", rating: 9.0, genre: "Drama", year: 1993, image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop" },
    { id: 18, title: "Manchester by the Sea", rating: 7.8, genre: "Drama", year: 2016, image: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400&h=600&fit=crop" },
    { id: 19, title: "The Green Mile", rating: 8.6, genre: "Drama", year: 1999, image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop" },
    { id: 20, title: "A Beautiful Mind", rating: 8.2, genre: "Drama", year: 2001, image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=400&h=600&fit=crop" },
    { id: 21, title: "The Pianist", rating: 8.5, genre: "Drama", year: 2002, image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop" },
    { id: 22, title: "Eternal Sunshine", rating: 8.3, genre: "Romance", year: 2004, image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop" },
  ],
  Neutral: [
    { id: 23, title: "Se7en", rating: 8.6, genre: "Thriller", year: 1995, image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop" },
    { id: 24, title: "Gone Girl", rating: 8.1, genre: "Mystery", year: 2014, image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop" },
    { id: 25, title: "The Usual Suspects", rating: 8.5, genre: "Crime", year: 1995, image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop" },
    { id: 26, title: "Prisoners", rating: 8.1, genre: "Thriller", year: 2013, image: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=400&h=600&fit=crop" },
    { id: 27, title: "Shutter Island", rating: 8.2, genre: "Mystery", year: 2010, image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=600&fit=crop" },
    { id: 28, title: "Zodiac", rating: 7.7, genre: "Crime", year: 2007, image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&h=600&fit=crop" },
  ],
  Excited: [
    { id: 29, title: "Mad Max: Fury Road", rating: 8.1, genre: "Action", year: 2015, image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop" },
    { id: 30, title: "Avengers: Endgame", rating: 8.4, genre: "Action", year: 2019, image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop" },
    { id: 31, title: "Blade Runner 2049", rating: 8.0, genre: "Sci-Fi", year: 2017, image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop" },
    { id: 32, title: "The Lord of the Rings", rating: 8.9, genre: "Adventure", year: 2001, image: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=400&h=600&fit=crop" },
    { id: 33, title: "Dune", rating: 8.0, genre: "Sci-Fi", year: 2021, image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=600&fit=crop" },
    { id: 34, title: "John Wick", rating: 7.4, genre: "Action", year: 2014, image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop" },
  ],
}

const recommendedMovies = [
  { id: 7, title: "The Matrix", rating: 8.7, genre: "Sci-Fi", year: 1999, image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop" },
  { id: 8, title: "Forrest Gump", rating: 8.8, genre: "Drama", year: 1994, image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop" },
  { id: 9, title: "Fight Club", rating: 8.8, genre: "Drama", year: 1999, image: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400&h=600&fit=crop" },
  { id: 10, title: "The Lord of the Rings", rating: 8.9, genre: "Fantasy", year: 2001, image: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=400&h=600&fit=crop" },
]

const moods = [
  { name: "Happy", icon: Smile, color: "text-yellow-500", bgColor: "bg-yellow-500/10", borderColor: "border-yellow-500", movies: ["Comedy", "Romance", "Animation"] },
  { name: "Sad", icon: Frown, color: "text-blue-500", bgColor: "bg-blue-500/10", borderColor: "border-blue-500", movies: ["Drama", "Romance", "Documentary"] },
  { name: "Neutral", icon: Meh, color: "text-gray-500", bgColor: "bg-gray-500/10", borderColor: "border-gray-500", movies: ["Mystery", "Thriller", "Crime"] },
  { name: "Excited", icon: Zap, color: "text-red-500", bgColor: "bg-red-500/10", borderColor: "border-red-500", movies: ["Action", "Adventure", "Sci-Fi"] },
]

export default function Dashboard() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [loginOpen, setLoginOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)
  const { data: session, isPending } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/")
    }
  }, [session, isPending, router])

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!session?.user) return null

  // Get movies based on selected mood
  const getMoodBasedMovies = () => {
    if (!selectedMood) return []
    return moodMovies[selectedMood as keyof typeof moodMovies] || []
  }

  const currentMoodMovies = getMoodBasedMovies()
  const currentMoodData = moods.find(m => m.name === selectedMood)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onLoginClick={() => setLoginOpen(true)} onSignupClick={() => setSignupOpen(true)} />
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-12">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search movies, TV shows, or genres..."
              className="pl-10 h-12 text-lg bg-card border-border text-foreground"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Mood Selection */}
        <section>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-foreground">
            <Smile className="h-8 w-8 text-accent" />
            How are you feeling today?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {moods.map((mood) => {
              const Icon = mood.icon
              return (
                <Card
                  key={mood.name}
                  className={`p-6 cursor-pointer transition-all hover:shadow-xl hover:shadow-primary/10 bg-card border-border/50 ${
                    selectedMood === mood.name ? `${mood.borderColor} border-2 ${mood.bgColor}` : ""
                  }`}
                  onClick={() => setSelectedMood(mood.name)}
                >
                  <div className="text-center space-y-3">
                    <Icon className={`h-12 w-12 mx-auto ${mood.color}`} />
                    <h3 className="font-semibold text-lg text-foreground">{mood.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {mood.movies.join(", ")}
                    </p>
                  </div>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Mood-Based Recommendations */}
        {selectedMood && currentMoodMovies.length > 0 && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold flex items-center gap-2 text-foreground">
                {currentMoodData && <currentMoodData.icon className={`h-8 w-8 ${currentMoodData.color}`} />}
                Perfect for Your {selectedMood} Mood
              </h2>
              <Badge variant="secondary" className={`${currentMoodData?.bgColor} border-border`}>
                {currentMoodMovies.length} Movies
              </Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {currentMoodMovies.map((movie) => (
                <Link href={`/movie/${movie.id}`} key={movie.id}>
                  <Card className="group overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all cursor-pointer border-border/50 bg-card">
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <Image
                        src={movie.image}
                        alt={movie.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <Button size="sm" className="w-full bg-primary hover:bg-primary/90" variant="secondary">
                            <Play className="mr-2 h-4 w-4" />
                            Watch Now
                          </Button>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        <span className="text-xs font-semibold text-white">{movie.rating}</span>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-sm line-clamp-1 text-foreground">{movie.title}</h3>
                      <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
                        <span>{movie.genre}</span>
                        <span>{movie.year}</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Trending Movies */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold flex items-center gap-2 text-foreground">
              <TrendingUp className="h-8 w-8 text-accent" />
              Trending Now
            </h2>
            <Badge variant="secondary" className="bg-accent/20 text-accent border-border">
              Sorted by IMDb Rating
            </Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {trendingMovies.map((movie) => (
              <Link href={`/movie/${movie.id}`} key={movie.id}>
                <Card className="group overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all cursor-pointer border-border/50 bg-card">
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <Image
                      src={movie.image}
                      alt={movie.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <Button size="sm" className="w-full bg-primary hover:bg-primary/90" variant="secondary">
                          <Play className="mr-2 h-4 w-4" />
                          Watch Now
                        </Button>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      <span className="text-xs font-semibold text-white">{movie.rating}</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm line-clamp-1 text-foreground">{movie.title}</h3>
                    <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
                      <span>{movie.genre}</span>
                      <span>{movie.year}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Recommended for You */}
        <section>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-foreground">
            <Heart className="h-8 w-8 text-accent fill-accent/20" />
            Recommended for You
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {recommendedMovies.map((movie) => (
              <Link href={`/movie/${movie.id}`} key={movie.id}>
                <Card className="group overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all cursor-pointer border-border/50 bg-card">
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <Image
                      src={movie.image}
                      alt={movie.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <Button size="sm" className="w-full bg-primary hover:bg-primary/90" variant="secondary">
                          <Play className="mr-2 h-4 w-4" />
                          Watch Now
                        </Button>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      <span className="text-xs font-semibold text-white">{movie.rating}</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm line-clamp-1 text-foreground">{movie.title}</h3>
                    <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
                      <span>{movie.genre}</span>
                      <span>{movie.year}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Continue Watching */}
        <section>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-foreground">
            <Clock className="h-8 w-8 text-accent" />
            Continue Watching
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingMovies.slice(0, 3).map((movie) => (
              <Link href={`/movie/${movie.id}`} key={movie.id}>
                <Card className="group overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all cursor-pointer border-border/50 bg-card">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={movie.image}
                      alt={movie.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full bg-accent/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="h-8 w-8 text-white fill-white ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 text-foreground">{movie.title}</h3>
                    <div className="w-full bg-muted rounded-full h-1.5 mb-2">
                      <div className="bg-accent h-1.5 rounded-full" style={{ width: "45%" }} />
                    </div>
                    <p className="text-xs text-muted-foreground">45% complete</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}