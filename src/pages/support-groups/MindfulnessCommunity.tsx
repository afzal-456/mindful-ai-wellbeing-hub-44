
import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Users, MessageSquare, Image, Video, Heart, BookmarkIcon, Calendar, ArrowLeft } from "lucide-react";

// Setting all users as premium
const isPremiumUser = true;

// Mock posts data
const initialPosts = [
  {
    id: 1,
    author: "ZenJourney",
    content: "I've been practicing mindful eating for a week. Taking time to truly experience my food has been transformative. Anyone else tried this practice?",
    likes: 21,
    comments: 8,
    time: "4 hours ago",
    type: "text"
  },
  {
    id: 2,
    author: "PresentMoment",
    content: "Looking for recommendations on mindfulness meditation apps that offer guided sessions around 10-15 minutes. Which ones have worked for you?",
    likes: 15,
    comments: 12,
    time: "7 hours ago",
    type: "text"
  },
  {
    id: 3,
    author: "MindfulBreather",
    content: "Today I practiced the 4-7-8 breathing technique during a stressful meeting and it helped me stay centered. Breathe in for 4 counts, hold for 7, exhale for 8.",
    likes: 32,
    comments: 9,
    time: "1 day ago",
    type: "text"
  },
];

const MindfulnessCommunity = () => {
  const [newPostContent, setNewPostContent] = useState("");
  const [posts, setPosts] = useState(initialPosts);
  const navigate = useNavigate();

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) {
      toast.error("Please enter some content for your post");
      return;
    }

    const newPost = {
      id: posts.length + 1,
      author: "CurrentUser",
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8 px-4 md:px-10 lg:px-20">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => navigate("/support-groups/mindfulness")}
            >
              <ArrowLeft className="h-4 w-4" /> Back to Mindfulness Practice
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left sidebar */}
            <div className="w-full md:w-1/4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-wellness-dark flex items-center gap-2">
                    <Users className="h-5 w-5" /> 
                    Mindfulness Practice
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-wellness-primary" />
                      <span>20 members active</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-wellness-primary" />
                      <span>Next session: Friday</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-wellness-dark text-sm">Community Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2 text-gray-600">
                    <li>• Respect each other's journey</li>
                    <li>• Share only personal experiences</li>
                    <li>• No judgmental comments</li>
                    <li>• Maintain a calm atmosphere</li>
                    <li>• Focus on present-moment awareness</li>
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
                      placeholder="Share your mindfulness practice, insights, or questions..."
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
                        className="bg-wellness-primary hover:bg-wellness-dark text-white"
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
                        Meditation Guides
                      </Link>
                    </li>
                    <li>
                      <Link to="/relaxation-audio" className="text-wellness-primary hover:underline flex items-center">
                        <BookmarkIcon className="h-4 w-4 mr-2" />
                        Mindfulness Audio Sessions
                      </Link>
                    </li>
                    <li>
                      <Link to="/mental-games" className="text-wellness-primary hover:underline flex items-center">
                        <BookmarkIcon className="h-4 w-4 mr-2" />
                        Focus Training Exercises
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
                      <p className="font-medium">Mindful Breathing</p>
                      <p className="text-sm text-gray-600">Friday, 5:00 PM</p>
                    </div>
                    <div className="border-l-2 border-wellness-primary pl-3">
                      <p className="font-medium">Body Scan Meditation</p>
                      <p className="text-sm text-gray-600">Saturday, 10:00 AM</p>
                    </div>
                    <div className="border-l-2 border-wellness-primary pl-3">
                      <p className="font-medium">Walking Meditation</p>
                      <p className="text-sm text-gray-600">Sunday, 9:00 AM</p>
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

export default MindfulnessCommunity;
