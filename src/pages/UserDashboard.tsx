
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { 
  LayoutDashboard, 
  CalendarDays, 
  LineChart, 
  MessageSquare, 
  Clock, 
  Bookmark, 
  LogOut,
  User
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userType = localStorage.getItem("userType");
    
    if (!isLoggedIn || userType !== "user") {
      toast.error("Please login to access the dashboard");
      navigate("/login");
      return;
    }
    
    // Get user data from localStorage
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");
    
    if (storedName) setUserName(storedName);
    if (storedEmail) setUserEmail(storedEmail);
    
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const upcomingSessions = [
    { date: "2025-04-24", time: "14:00", title: "Cognitive Behavioral Therapy", therapist: "Dr. Sarah Johnson" },
    { date: "2025-04-27", time: "10:30", title: "Meditation Session", therapist: "Mark Williams" },
    { date: "2025-05-02", time: "16:00", title: "Stress Management", therapist: "Dr. Emily Chen" },
  ];
  
  const moodHistory = [
    { date: "2025-04-19", mood: "Happy", notes: "Had a productive day" },
    { date: "2025-04-18", mood: "Anxious", notes: "Worried about presentation" },
    { date: "2025-04-17", mood: "Calm", notes: "Meditation helped" },
    { date: "2025-04-16", mood: "Tired", notes: "Didn't sleep well" },
    { date: "2025-04-15", mood: "Motivated", notes: "Started new project" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-wellness-primary">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-background min-h-screen pb-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center">
                <LayoutDashboard className="mr-2 h-8 w-8 text-wellness-primary" />
                Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">Welcome back, {userName}</p>
            </div>
            <div className="flex items-center mt-4 md:mt-0 space-x-2">
              <Button variant="outline" className="flex items-center" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
              <Button variant="outline" className="flex items-center" onClick={() => navigate("/profile")}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-wellness-primary flex items-center text-lg">
                  <CalendarDays className="mr-2 h-5 w-5" /> 
                  Upcoming Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{upcomingSessions.length}</p>
                <p className="text-muted-foreground text-sm">Next: {upcomingSessions[0]?.date}</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-wellness-primary flex items-center text-lg">
                  <LineChart className="mr-2 h-5 w-5" /> 
                  Mood Entries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{moodHistory.length}</p>
                <p className="text-muted-foreground text-sm">Last mood: {moodHistory[0]?.mood}</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-wellness-primary flex items-center text-lg">
                  <MessageSquare className="mr-2 h-5 w-5" /> 
                  Therapy Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">12</p>
                <p className="text-muted-foreground text-sm">Total completed</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-wellness-primary flex items-center text-lg">
                  <Clock className="mr-2 h-5 w-5" /> 
                  Meditation Minutes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">240</p>
                <p className="text-muted-foreground text-sm">This month</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl">Upcoming Sessions</CardTitle>
                <CardDescription>Your scheduled therapy and meditation sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Session</TableHead>
                      <TableHead>Therapist</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingSessions.map((session, index) => (
                      <TableRow key={index}>
                        <TableCell>{session.date}</TableCell>
                        <TableCell>{session.time}</TableCell>
                        <TableCell>{session.title}</TableCell>
                        <TableCell>{session.therapist}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 text-center">
                  <Button variant="outline" className="text-wellness-primary">
                    View All Sessions
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl">Recent Mood</CardTitle>
                <CardDescription>Your mood tracking history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {moodHistory.slice(0, 3).map((entry, index) => (
                    <div key={index} className="flex items-start border-b pb-3 last:border-0">
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium">{entry.date}</p>
                          <span className="text-wellness-primary">{entry.mood}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{entry.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" className="text-wellness-primary">
                    Track Mood
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl">Recommended Resources</CardTitle>
                <CardDescription>Personalized resources for your wellness journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center p-3 rounded-lg bg-wellness-light/30 hover:bg-wellness-light transition-colors">
                    <Bookmark className="h-5 w-5 text-wellness-primary mr-3" />
                    <div>
                      <p className="font-medium">Managing Anxiety During Uncertain Times</p>
                      <p className="text-sm text-muted-foreground">Article • 8 min read</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 rounded-lg bg-wellness-light/30 hover:bg-wellness-light transition-colors">
                    <Bookmark className="h-5 w-5 text-wellness-primary mr-3" />
                    <div>
                      <p className="font-medium">Deep Breathing Exercises for Stress Relief</p>
                      <p className="text-sm text-muted-foreground">Audio • 12 min</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 rounded-lg bg-wellness-light/30 hover:bg-wellness-light transition-colors">
                    <Bookmark className="h-5 w-5 text-wellness-primary mr-3" />
                    <div>
                      <p className="font-medium">Mindfulness Meditation for Beginners</p>
                      <p className="text-sm text-muted-foreground">Video • 15 min</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl">Your Progress</CardTitle>
                <CardDescription>Track your mental wellness journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Anxiety Level</span>
                      <span className="text-sm text-muted-foreground">65% improvement</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-wellness-primary h-2 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Sleep Quality</span>
                      <span className="text-sm text-muted-foreground">40% improvement</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-wellness-primary h-2 rounded-full" style={{ width: "40%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Mindfulness Practice</span>
                      <span className="text-sm text-muted-foreground">80% achievement</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-wellness-primary h-2 rounded-full" style={{ width: "80%" }}></div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <Button variant="outline" className="text-wellness-primary">
                    View Detailed Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
