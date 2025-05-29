import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import {
  Users, MessageSquare, AlertTriangle, Music, FileText, BarChart4,
  BellRing, Upload, Calendar, Video, Gamepad2, Heart
} from "lucide-react";

import AdminMoodTrends from "@/components/admin/AdminMoodTrends";
import AdminRelaxationUploader from "@/components/admin/AdminRelaxationUploader";
import AdminContentManager from "@/components/admin/AdminContentManager";
import AdminDistressAlerts from "@/components/admin/AdminDistressAlerts";
import AdminTherapistNotes from "@/components/admin/AdminTherapistNotes";
import AdminAiTherapist from "@/components/admin/AdminAiTherapist";
import AdminLiveSessions from "@/components/admin/AdminLiveSessions";
import AdminSupportGroups from "@/components/admin/AdminSupportGroups";
import AdminMentalGames from "@/components/admin/AdminMentalGames";
import AdminUserManager from "@/components/admin/AdminUserManager";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const [dashboardStats, setDashboardStats] = useState({
    usersToday: 128,
    chatInteractions: 423,
    flaggedMoods: 17,
    contentUploads: 34,
  });

  useEffect(() => {
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
            <p className="text-muted-foreground mt-1">
              Manage platform content and monitor user interactions
            </p>
          </div>

          {/* Dashboard Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <Card>
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
            <Card>
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
            <Card>
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
            <Card>
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

          {/* Admin Tabs */}
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2">
              <TabsTrigger value="overview"><BarChart4 className="h-4 w-4" />Overview</TabsTrigger>
              <TabsTrigger value="ai-therapist"><MessageSquare className="h-4 w-4" />AI Therapist</TabsTrigger>
              <TabsTrigger value="live-sessions"><Calendar className="h-4 w-4" />Live Sessions</TabsTrigger>
              <TabsTrigger value="support-groups"><Heart className="h-4 w-4" />Support Groups</TabsTrigger>
              <TabsTrigger value="music"><Music className="h-4 w-4" />Music</TabsTrigger>
              <TabsTrigger value="games"><Gamepad2 className="h-4 w-4" />Games</TabsTrigger>
              <TabsTrigger value="content"><FileText className="h-4 w-4" />Content</TabsTrigger>
              <TabsTrigger value="moods"><BarChart4 className="h-4 w-4" />Moods</TabsTrigger>
              <TabsTrigger value="alerts"><BellRing className="h-4 w-4" />Alerts</TabsTrigger>
              <TabsTrigger value="notes"><FileText className="h-4 w-4" />Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <h2 className="text-xl font-semibold">Platform Overview</h2>
              <p className="text-muted-foreground mb-4">
                Welcome to the admin panel for MindfulAI. Use the tabs above to manage different aspects of the platform.
              </p>
              <AdminUserManager />
              {/* Overview Navigation Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {/* Cards omitted here for brevity */}
              </div>
            </TabsContent>

            <TabsContent value="ai-therapist"><AdminAiTherapist /></TabsContent>
            <TabsContent value="live-sessions"><AdminLiveSessions /></TabsContent>
            <TabsContent value="support-groups"><AdminSupportGroups /></TabsContent>
            <TabsContent value="music"><AdminRelaxationUploader /></TabsContent>
            <TabsContent value="games"><AdminMentalGames /></TabsContent>
            <TabsContent value="content"><AdminContentManager /></TabsContent>
            <TabsContent value="moods"><AdminMoodTrends /></TabsContent>
            <TabsContent value="alerts"><AdminDistressAlerts /></TabsContent>
            <TabsContent value="notes"><AdminTherapistNotes /></TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
}
