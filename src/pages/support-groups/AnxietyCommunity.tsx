
import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Users, MessageSquare, Image, Video, Heart, BookmarkIcon, Calendar } from "lucide-react";

// For demo purposes, hardcode the user's subscription status
// In a real app, this would come from authentication and user profile data
const isPremiumUser = false; // Set to false to test the premium requirement flow

// Mock posts data
const initialPosts = [
  {
    id: 1,
    author: "MindfulJourney",
    content: "I've been experiencing panic attacks at work lately. Has anyone found any quick techniques to manage these in a professional setting without drawing attention?",
    likes: 12,
    comments: 5,
    time: "2 hours ago",
    type: "text"
  },
  {
    id: 2,
    author: "AnxietyWarrior",
    content: "Today I used the 5-4-3-2-1 grounding technique during an anxiety attack and it really helped! 5 things you see, 4 things you touch, 3 things you hear, 2 things you smell, 1 thing you taste. Has anyone else tried this?",
    likes: 24,
    comments: 8,
    time: "5 hours ago",
    type: "text"
  },
  {
    id: 3,
    author: "HealingSteps",
    content: "Made a big accomplishment today - I drove on the highway for the first time in 2 years after developing driving anxiety. Small steps add up!",
    likes: 45,
    comments: 15,
    time: "1 day ago",
    type: "text"
  },
];

const AnxietyCommunity = () => {
  const [showPremiumDialog, setShowPremiumDialog] = useState(!isPremiumUser);
  const [newPostContent, setNewPostContent] = useState("");
  const [posts, setPosts] = useState(initialPosts);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) {
      toast.error("Please enter some content for your post");
      return;
    }

    const newPost = {
      id: posts.length + 1,
      author: "CurrentUser", // In a real app, this would be the logged-in user's name
      content: newPostContent,
      likes: 0,
      comments: 0,
      time: "Just now",
      type: "text"
    };

    setPosts([newPost, ...posts]);
    setNewPostContent("");
    toast.success("Your post has been submitted");
  };

  const handleLike = (postId: number) => {
    setPosts(
      posts.map(post => 
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  if (showPremiumDialog) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-16 px-6">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center text-wellness-dark">Premium Access Required</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4 text-gray-600">
                This community is available exclusively for premium users. Upgrade to our Premium Plan to join the discussion and connect with others.
              </p>
              <div className="flex justify-center mb-4">
                <Users className="h-16 w-16 text-wellness-primary" />
              </div>
              <p className="text-sm text-gray-500 mb-6">
                Premium access includes unlimited community access, personal therapy sessions, and exclusive resources.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button className="w-full bg-wellness-primary hover:bg-wellness-dark" asChild>
                <Link to="/pricing/premium">Upgrade to Premium</Link>
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setShowPremiumDialog(false)}>
                View Community Preview
              </Button>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8 px-4 md:px-10 lg:px-20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left sidebar */}
            <div className="w-full md:w-1/4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-wellness-dark flex items-center gap-2">
                    <Users className="h-5 w-5" /> 
                    Anxiety Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-wellness-primary" />
                      <span>15 members active</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-wellness-primary" />
                      <span>Next session: Monday</span>
                    </div>
                    {!isPremiumUser && (
                      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                        <p className="text-sm text-amber-800">
                          You're viewing the preview. Upgrade to premium for full access.
                        </p>
                        <Button 
                          size="sm" 
                          className="mt-2 w-full bg-wellness-primary hover:bg-wellness-dark"
                          asChild
                        >
                          <Link to="/pricing/premium">Upgrade Now</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-wellness-dark text-sm">Community Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2 text-gray-600">
                    <li>• Be respectful and supportive</li>
                    <li>• Maintain confidentiality</li>
                    <li>• No medical advice</li>
                    <li>• No self-promotion</li>
                    <li>• Report concerning content</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Main content area */}
            <div className="w-full md:w-2/4">
              {/* Create post section */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-wellness-dark text-lg">Share with the Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePostSubmit}>
                    <Textarea 
                      placeholder="What's on your mind? Share your experiences or ask questions..."
                      className="min-h-[100px]"
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                    />
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex space-x-2">
                        <Button type="button" size="sm" variant="outline" className="flex items-center">
                          <Image className="h-4 w-4 mr-1" />
                          Photo
                        </Button>
                        <Button type="button" size="sm" variant="outline" className="flex items-center">
                          <Video className="h-4 w-4 mr-1" />
                          Video
                        </Button>
                      </div>
                      <Button 
                        type="submit" 
                        className="bg-wellness-primary hover:bg-wellness-dark"
                      >
                        Post
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Posts section */}
              <div className="space-y-4">
                {posts.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-wellness-light flex items-center justify-center text-wellness-primary font-semibold mr-2">
                            {post.author[0]}
                          </div>
                          <div>
                            <p className="font-medium">{post.author}</p>
                            <p className="text-xs text-gray-500">{post.time}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <BookmarkIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <p className="text-gray-700">{post.content}</p>
                    </CardContent>
                    <CardFooter className="border-t pt-2 flex justify-between">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-600 hover:text-wellness-primary"
                        onClick={() => handleLike(post.id)}
                      >
                        <Heart className="h-4 w-4 mr-1" />
                        <span>{post.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-600">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span>{post.comments} Comments</span>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}

                {!isPremiumUser && posts.length > 0 && (
                  <Card className="bg-wellness-light border-2 border-wellness-primary p-6">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-2">Unlock Full Access</h3>
                      <p className="mb-4">Join our premium plan to view more posts and participate in discussions.</p>
                      <Button 
                        className="bg-wellness-primary hover:bg-wellness-dark"
                        asChild
                      >
                        <Link to="/pricing/premium">Upgrade to Premium</Link>
                      </Button>
                    </div>
                  </Card>
                )}
              </div>
            </div>

            {/* Right sidebar */}
            <div className="w-full md:w-1/4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-wellness-dark">Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li>
                      <Link to="/self-help-resources" className="text-wellness-primary hover:underline flex items-center">
                        <BookmarkIcon className="h-4 w-4 mr-2" />
                        Anxiety Management Tools
                      </Link>
                    </li>
                    <li>
                      <Link to="/relaxation-audio" className="text-wellness-primary hover:underline flex items-center">
                        <BookmarkIcon className="h-4 w-4 mr-2" />
                        Relaxation Audios
                      </Link>
                    </li>
                    <li>
                      <Link to="/therapy" className="text-wellness-primary hover:underline flex items-center">
                        <BookmarkIcon className="h-4 w-4 mr-2" />
                        Find a Therapist
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-wellness-dark">Upcoming Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="border-l-2 border-wellness-primary pl-3">
                      <p className="font-medium">Group Discussion</p>
                      <p className="text-sm text-gray-600">Monday, 7:00 PM</p>
                    </div>
                    <div className="border-l-2 border-wellness-primary pl-3">
                      <p className="font-medium">Coping Strategies Workshop</p>
                      <p className="text-sm text-gray-600">Wednesday, 6:00 PM</p>
                    </div>
                    <div className="border-l-2 border-wellness-primary pl-3">
                      <p className="font-medium">Mindfulness Session</p>
                      <p className="text-sm text-gray-600">Friday, 5:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AnxietyCommunity;
