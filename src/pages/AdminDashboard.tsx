
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TeamMemberManager from "@/components/admin/TeamMemberManager";
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
  Eye,
  Lock,
  Unlock,
  UserX,
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface User {
  id: number;
  name: string;
  email: string;
  plan: string;
  joinDate: string;
  status: "Active" | "Inactive" | "Suspended";
  lastLogin?: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  
  useEffect(() => {
    // Check if user is logged in as admin
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userType = localStorage.getItem("userType");
    
    if (!isLoggedIn || userType !== "admin") {
      toast.error("You need admin privileges to access this page");
      navigate("/login");
      return;
    }
    
    // Load users from localStorage or use sample data
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // Sample data
      const sampleUsers = [
        { id: 1, name: "John Doe", email: "john@example.com", plan: "Premium", joinDate: "2025-02-15", status: "Active" as const, lastLogin: "2025-04-20" },
        { id: 2, name: "Sarah Smith", email: "sarah@example.com", plan: "Basic", joinDate: "2025-03-05", status: "Active" as const, lastLogin: "2025-04-19" },
        { id: 3, name: "Michael Johnson", email: "michael@example.com", plan: "Premium", joinDate: "2025-03-12", status: "Inactive" as const, lastLogin: "2025-04-15" },
      ];
      setUsers(sampleUsers);
      localStorage.setItem("users", JSON.stringify(sampleUsers));
    }
    
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

  const handleUserStatusChange = (userId: number, newStatus: "Active" | "Inactive" | "Suspended") => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    toast.success(`User status updated to ${newStatus}`);
  };

  const handleDeleteUser = (userId: number) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    toast.success("User deleted successfully");
  };

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
                Admin Control Panel
              </h1>
              <p className="text-muted-foreground mt-1">Manage users, team members, and system settings</p>
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
                  Active: {users.filter(u => u.status === "Active").length}
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-wellness-primary flex items-center text-lg">
                  <UserCheck className="mr-2 h-5 w-5" /> 
                  Premium Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {users.filter(u => u.plan === "Premium").length}
                </p>
                <p className="text-muted-foreground text-sm">
                  {((users.filter(u => u.plan === "Premium").length / users.length) * 100).toFixed(1)}% of total
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-wellness-primary flex items-center text-lg">
                  <Calendar className="mr-2 h-5 w-5" /> 
                  New This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {users.filter(u => new Date(u.joinDate).getMonth() === new Date().getMonth()).length}
                </p>
                <p className="text-muted-foreground text-sm">
                  User growth
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-wellness-primary flex items-center text-lg">
                  <Lock className="mr-2 h-5 w-5" /> 
                  Account Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-red-500">
                  {users.filter(u => u.status === "Suspended").length}
                </p>
                <p className="text-muted-foreground text-sm">
                  Suspended accounts
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Team Member Management Section */}
          <TeamMemberManager />
          
          {/* User Management Section */}
          <Card className="mt-8">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-xl">User Management</CardTitle>
                <CardDescription>Manage platform users and their access</CardDescription>
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
                    <TableHead>User</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{user.plan}</TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell>{user.lastLogin || "Never"}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          user.status === "Active" 
                            ? "bg-green-100 text-green-800"
                            : user.status === "Inactive"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUserStatusChange(user.id, "Active")}
                            className="h-8 px-2"
                          >
                            <Unlock className="h-3.5 w-3.5" />
                            <span className="sr-only">Activate</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUserStatusChange(user.id, "Suspended")}
                            className="h-8 px-2"
                          >
                            <Lock className="h-3.5 w-3.5" />
                            <span className="sr-only">Suspend</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
                            className="h-8 px-2 text-red-500 hover:text-red-700"
                          >
                            <UserX className="h-3.5 w-3.5" />
                            <span className="sr-only">Delete</span>
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
