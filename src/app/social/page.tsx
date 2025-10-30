"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/lib/auth-client"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Video, UserPlus, Search, Heart, MessageCircle, Film, Loader2 } from "lucide-react"

// Mock friends data
const friends = [
  { id: 1, name: "Sarah Johnson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop", status: "Watching Inception", online: true },
  { id: 2, name: "Mike Chen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop", status: "Just finished The Matrix", online: true },
  { id: 3, name: "Emily Davis", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop", status: "Offline", online: false },
  { id: 4, name: "Alex Turner", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop", status: "Online", online: true },
]

const watchPartySessions = [
  { id: 1, host: "Sarah Johnson", movie: "Inception", participants: 4, time: "Tonight at 8 PM", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=225&fit=crop" },
  { id: 2, host: "Mike Chen", movie: "The Matrix", participants: 2, time: "Tomorrow at 7 PM", image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=225&fit=crop" },
]

const blendedRecommendations = [
  { id: 1, title: "Interstellar", match: 95, friends: ["Sarah", "Mike"], image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=600&fit=crop" },
  { id: 2, title: "The Dark Knight", match: 92, friends: ["Emily", "Alex"], image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop" },
  { id: 3, title: "Pulp Fiction", match: 88, friends: ["Sarah", "Alex"], image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop" },
]

export default function Social() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("friends")
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onLoginClick={() => setLoginOpen(true)} onSignupClick={() => setSignupOpen(true)} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3 text-foreground">
            <Users className="h-10 w-10 text-accent" />
            Social Hub
          </h1>
          <p className="text-muted-foreground text-lg">
            Connect with friends and enjoy movies together
          </p>
        </div>

        <Tabs defaultValue="friends" className="space-y-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-2xl grid-cols-3 bg-card border-border">
            <TabsTrigger value="friends">
              <Users className="h-4 w-4 mr-2" />
              Friends
            </TabsTrigger>
            <TabsTrigger value="watch-party">
              <Video className="h-4 w-4 mr-2" />
              Watch Party
            </TabsTrigger>
            <TabsTrigger value="blend">
              <Heart className="h-4 w-4 mr-2" />
              Friend Blend
            </TabsTrigger>
          </TabsList>

          {/* Friends Tab */}
          <TabsContent value="friends" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search friends..."
                  className="pl-10 bg-card border-border text-foreground"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="bg-accent hover:bg-accent/90">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Friends
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {friends.map((friend) => (
                <Card key={friend.id} className="p-6 hover:shadow-xl hover:shadow-primary/10 transition-shadow bg-card border-border/50">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={friend.avatar} alt={friend.name} />
                        <AvatarFallback className="bg-accent/20 text-foreground">{friend.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {friend.online && (
                        <div className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 rounded-full border-2 border-background" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-foreground">{friend.name}</h3>
                      <p className="text-sm text-muted-foreground">{friend.status}</p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" className="border-border hover:bg-accent/10">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline" className="border-border hover:bg-accent/10">
                          <Video className="mr-2 h-4 w-4" />
                          Watch Together
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Watch Party Tab */}
          <TabsContent value="watch-party" className="space-y-6">
            <Card className="p-6 bg-accent/10 border-accent/30">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Video className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 text-foreground">Start a Watch Party</h3>
                  <p className="text-muted-foreground mb-4">
                    Create a virtual room and watch movies together with friends in real-time with video chat
                  </p>
                  <Button className="bg-accent hover:bg-accent/90">
                    <Video className="mr-2 h-4 w-4" />
                    Create Watch Party
                  </Button>
                </div>
              </div>
            </Card>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Upcoming Sessions</h2>
              <div className="space-y-4">
                {watchPartySessions.map((session) => (
                  <Card key={session.id} className="p-4 hover:shadow-xl hover:shadow-primary/10 transition-shadow bg-card border-border/50">
                    <div className="flex gap-4">
                      <div className="relative w-32 aspect-video flex-shrink-0 overflow-hidden rounded-md">
                        <img
                          src={session.image}
                          alt={session.movie}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg text-foreground">{session.movie}</h3>
                            <p className="text-sm text-muted-foreground">Hosted by {session.host}</p>
                          </div>
                          <Badge variant="secondary" className="bg-accent/20 text-accent border-border">
                            {session.participants} participants
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{session.time}</p>
                        <Button size="sm" className="mt-3 bg-primary hover:bg-primary/90">Join Party</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Video Call Interface Preview */}
            <Card className="p-6 bg-card border-border/50">
              <h3 className="font-semibold text-lg mb-4 text-foreground">Watch Together Interface</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {friends.slice(0, 4).map((friend) => (
                  <div key={friend.id} className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                      <p className="text-white text-xs font-medium">{friend.name}</p>
                    </div>
                    {friend.online && (
                      <div className="absolute top-2 right-2 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center gap-2">
                <Button size="sm" variant="outline" className="border-border">Mute</Button>
                <Button size="sm" variant="outline" className="border-border">Camera Off</Button>
                <Button size="sm" variant="destructive">Leave</Button>
              </div>
            </Card>
          </TabsContent>

          {/* Friend Blend Tab */}
          <TabsContent value="blend" className="space-y-6">
            <Card className="p-6 bg-gradient-to-r from-accent/10 to-primary/10 border-accent/30">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Heart className="h-6 w-6 text-accent fill-accent/50" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 text-foreground">Friend Taste Blending</h3>
                  <p className="text-muted-foreground">
                    Our AI analyzes your friends' favorite movies and viewing habits to recommend content you'll all love
                  </p>
                </div>
              </div>
            </Card>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Blended Recommendations</h2>
              <p className="text-muted-foreground mb-6">
                Movies that match your taste and your friends' preferences
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {blendedRecommendations.map((movie) => (
                  <Card key={movie.id} className="overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-shadow bg-card border-border/50">
                    <div className="relative aspect-[2/3]">
                      <img
                        src={movie.image}
                        alt={movie.title}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 right-2 bg-accent/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                        <Heart className="h-4 w-4 fill-white text-white" />
                        <span className="text-xs font-semibold text-white">{movie.match}% Match</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 text-foreground">{movie.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>Loved by {movie.friends.join(", ")}</span>
                      </div>
                      <Button size="sm" className="w-full mt-3 bg-primary hover:bg-primary/90">
                        <Film className="mr-2 h-4 w-4" />
                        Watch Now
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="p-6 bg-card border-border/50">
              <h3 className="font-semibold text-lg mb-4 text-foreground">Blend Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block text-foreground">Selected Friends for Blending</label>
                  <div className="flex flex-wrap gap-2">
                    {friends.map((friend) => (
                      <Badge key={friend.id} variant="secondary" className="py-2 px-3 bg-accent/20 text-foreground border-border">
                        {friend.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button variant="outline" className="border-border hover:bg-accent/10">Customize Blend</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}