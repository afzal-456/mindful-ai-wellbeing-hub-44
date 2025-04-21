import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { 
  Users,
  Calendar,
  BarChart4,
  Clock,
  Search,
  LogOut,
  Shield,
  User,
  UserCheck,
  UserPlus,
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TeamMemberManager from "@/components/admin/TeamMemberManager";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    // Check if user is logged in as admin
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userType = localStorage.getItem("userType");
    
    if (!isLoggedIn || userType !== "admin") {
      toast.error("You need admin privileges to access this page");
      navigate("/login");
      return;
    }
    
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    toast.success("Admin logged out successfully");
    navigate("/login");
  };

  // Sample data for the admin dashboard
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", plan: "Premium", joinDate: "2025-02-15", status: "Active" },
    { id: 2, name: "Sarah Smith", email: "sarah@example.com", plan: "Basic", joinDate: "2025-03-05", status: "Active" },
    { id: 3, name: "Michael Johnson", email: "michael@example.com", plan: "Premium", joinDate: "2025-03-12", status: "Inactive" },
    { id: 4, name: "Emma Wilson", email: "emma@example.com", plan: "Institutional", joinDate: "2025-03-20", status: "Active" },
    { id: 5, name: "James Brown", email: "james@example.com", plan: "Basic", joinDate: "2025-04-01", status: "Active" },
  ];
  
  const therapists = [
    { id: 1, name: "Dr. Emily Chen", specialty: "Cognitive Behavioral Therapy", patients: 24, rating: 4.8 },
    { id: 2, name: "Dr. Robert Miller", specialty: "Mindfulness Therapy", patients: 18, rating: 4.6 },
    { id: 3, name: "Dr. Lisa Rodriguez", specialty: "Anxiety & Depression", patients: 30, rating: 4.9 },
  ];
  
  const upcomingSessions = [
    { id: 1, date: "2025-04-24", time: "14:00", user: "John Doe", therapist: "Dr. Emily Chen", type: "Individual" },
    { id: 2, date: "2025-04-24", time: "16:30", user: "Sarah Smith", therapist: "Dr. Robert Miller", type: "Individual" },
    { id: 3, date: "2025-04-25", time: "10:00", user: "Group Session", therapist: "Dr. Lisa Rodriguez", type: "Group (8 participants)" },
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center">
                <Shield className="mr-2 h-8 w-8 text-wellness-primary" />
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">Welcome back, Administrator</p>
            </div>
            <Button variant="outline" className="flex items-center mt-4 md:mt-0" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-wellness-primary flex items-center text-lg">
                  <Users className="mr-2 h-5 w-5" /> 
                  Total Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{users.length}</p>
                <p className="text-muted-foreground text-sm">
                  <span className="text-green-600">+12%</span> this month
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-wellness-primary flex items-center text-lg">
                  <UserCheck className="mr-2 h-5 w-5" /> 
                  Active Therapists
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{therapists.length}</p>
                <p className="text-muted-foreground text-sm">
                  <span className="text-green-600">+2</span> new this month
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-wellness-primary flex items-center text-lg">
                  <Calendar className="mr-2 h-5 w-5" /> 
                  Sessions Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">12</p>
                <p className="text-muted-foreground text-sm">
                  <span className="text-amber-600">+3</span> from yesterday
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-wellness-primary flex items-center text-lg">
                  <BarChart4 className="mr-2 h-5 w-5" /> 
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">$12,450</p>
                <p className="text-muted-foreground text-sm">
                  <span className="text-green-600">+8%</span> this month
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2 hover:shadow-md transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-xl">User Management</CardTitle>
                  <CardDescription>Manage platform users</CardDescription>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.plan}</TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs ${
                            user.status === "Active" 
                              ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100" 
                              : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                          }`}>
                            {user.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button variant="outline" size="sm" className="h-8 px-2">
                              <User className="h-3.5 w-3.5" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 px-2">
                              <UserPlus className="h-3.5 w-3.5" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" className="text-wellness-primary mr-2">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add User
                  </Button>
                  <Button className="bg-wellness-primary hover:bg-wellness-dark text-white">
                    View All Users
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl">Upcoming Sessions</CardTitle>
                <CardDescription>Next scheduled therapy sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="border-b pb-3 last:border-0">
                      <div className="flex justify-between">
                        <p className="font-medium">{session.date}</p>
                        <span className="text-sm text-muted-foreground">{session.time}</span>
                      </div>
                      <p className="text-wellness-primary">{session.therapist}</p>
                      <div className="flex justify-between mt-1">
                        <p className="text-sm">{session.user}</p>
                        <span className="text-xs bg-wellness-light px-2 py-0.5 rounded-full">
                          {session.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" className="text-wellness-primary">
                    <Calendar className="mr-2 h-4 w-4" />
                    View Calendar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl">Active Therapists</CardTitle>
              <CardDescription>Our professional team members</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead>Active Patients</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {therapists.map((therapist) => (
                    <TableRow key={therapist.id}>
                      <TableCell className="font-medium">{therapist.name}</TableCell>
                      <TableCell>{therapist.specialty}</TableCell>
                      <TableCell>{therapist.patients}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="mr-2">{therapist.rating}</span>
                          <div className="relative">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg 
                                  key={star}
                                  className={`w-4 h-4 ${star <= Math.floor(therapist.rating) ? "text-amber-400" : "text-gray-300"}`} 
                                  fill="currentColor" 
                                  viewBox="0 0 20 20" 
                                  xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="outline" size="sm" className="h-8 px-2">
                            <User className="h-3.5 w-3.5" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 px-2">
                            <Calendar className="h-3.5 w-3.5" />
                            <span className="sr-only">Schedule</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
