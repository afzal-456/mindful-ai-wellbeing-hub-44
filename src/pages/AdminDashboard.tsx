
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { 
  Users, 
  MessageSquare, 
  AlertTriangle,
  Music,
  FileText,
  BarChart4,
  BellRing,
  Upload
} from "lucide-react";
import AdminMoodTrends from "@/components/admin/AdminMoodTrends";
import AdminRelaxationUploader from "@/components/admin/AdminRelaxationUploader";
import AdminContentManager from "@/components/admin/AdminContentManager";
import AdminDistressAlerts from "@/components/admin/AdminDistressAlerts";
import AdminTherapistNotes from "@/components/admin/AdminTherapistNotes";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Simulated admin dashboard data
  const [dashboardStats, setDashboardStats] = useState({
    usersToday: 128,
    chatInteractions: 423,
    flaggedMoods: 17,
    contentUploads: 34
  });
  
  useEffect(() => {
    // In a real implementation, this would fetch data from your Django backend
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-wellness-primary">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-background min-h-screen pb-12">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center">
              MindfulAI Admin Panel
            </h1>
            <p className="text-muted-foreground mt-1">Manage platform content and monitor user interactions</p>
          </div>
          
          {/* Dashboard Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-wellness-primary flex items-center text-lg">
                  <Users className="mr-2 h-5 w-5" /> 
                  Users Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{dashboardStats.usersToday}</p>
                <p className="text-muted-foreground text-sm">Active platform users</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-wellness-primary flex items-center text-lg">
                  <MessageSquare className="mr-2 h-5 w-5" /> 
                  Chatbot Interactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{dashboardStats.chatInteractions}</p>
                <p className="text-muted-foreground text-sm">Today's conversations</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-wellness-primary flex items-center text-lg">
                  <AlertTriangle className="mr-2 h-5 w-5" /> 
                  Flagged Moods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{dashboardStats.flaggedMoods}</p>
                <p className="text-muted-foreground text-sm">Requiring attention</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-wellness-primary flex items-center text-lg">
                  <Upload className="mr-2 h-5 w-5" /> 
                  Content Uploads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{dashboardStats.contentUploads}</p>
                <p className="text-muted-foreground text-sm">This month</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Admin Features Tabs */}
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart4 className="h-4 w-4" />
                <span className="hidden md:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="music" className="flex items-center gap-2">
                <Music className="h-4 w-4" />
                <span className="hidden md:inline">Music</span>
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden md:inline">Content</span>
              </TabsTrigger>
              <TabsTrigger value="moods" className="flex items-center gap-2">
                <BarChart4 className="h-4 w-4" />
                <span className="hidden md:inline">Moods</span>
              </TabsTrigger>
              <TabsTrigger value="alerts" className="flex items-center gap-2">
                <BellRing className="h-4 w-4" />
                <span className="hidden md:inline">Alerts</span>
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden md:inline">Notes</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <h2 className="text-xl font-semibold">Platform Overview</h2>
              <p className="text-muted-foreground">Welcome to the admin panel for MindfulAI. Use the tabs above to manage different aspects of the platform.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="hover:bg-accent/50 transition-colors cursor-pointer" onClick={() => setActiveTab("music")}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Music className="mr-2 h-5 w-5 text-wellness-primary" />
                      Relaxation Music
                    </CardTitle>
                    <CardDescription>Upload and manage relaxation tracks</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="hover:bg-accent/50 transition-colors cursor-pointer" onClick={() => setActiveTab("content")}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-wellness-primary" />
                      Self-help Content
                    </CardTitle>
                    <CardDescription>Manage articles and exercises</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="hover:bg-accent/50 transition-colors cursor-pointer" onClick={() => setActiveTab("moods")}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart4 className="mr-2 h-5 w-5 text-wellness-primary" />
                      Mood Trends
                    </CardTitle>
                    <CardDescription>Analyze user mood patterns</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="hover:bg-accent/50 transition-colors cursor-pointer" onClick={() => setActiveTab("alerts")}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertTriangle className="mr-2 h-5 w-5 text-wellness-primary" />
                      Distress Alerts
                    </CardTitle>
                    <CardDescription>View triggered emotional alerts</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="hover:bg-accent/50 transition-colors cursor-pointer" onClick={() => setActiveTab("notes")}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-wellness-primary" />
                      Therapist Notes
                    </CardTitle>
                    <CardDescription>Add professional insights</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="music">
              <AdminRelaxationUploader />
            </TabsContent>
            
            <TabsContent value="content">
              <AdminContentManager />
            </TabsContent>
            
            <TabsContent value="moods">
              <AdminMoodTrends />
            </TabsContent>
            
            <TabsContent value="alerts">
              <AdminDistressAlerts />
            </TabsContent>
            
            <TabsContent value="notes">
              <AdminTherapistNotes />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
}
