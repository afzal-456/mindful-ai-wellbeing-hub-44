
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Check, Eye, MessageSquare, AlertCircle, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface DistressAlert {
  id: string;
  userId: string;
  username: string;
  alertType: "suicidal" | "severe_anxiety" | "depression" | "anger" | "distress";
  severity: "low" | "medium" | "high" | "critical";
  timestamp: string;
  sessionId: string;
  reviewed: boolean;
  context: string;
}

const alertTypeLabels = {
  suicidal: "Suicidal Thoughts",
  severe_anxiety: "Severe Anxiety",
  depression: "Depression",
  anger: "Anger Issues",
  distress: "Emotional Distress"
};

export default function AdminDistressAlerts() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [alerts, setAlerts] = useState<DistressAlert[]>(() => {
    const savedAlerts = localStorage.getItem("distressAlerts");
    return savedAlerts ? JSON.parse(savedAlerts) : [
      {
        id: "a1",
        userId: "u123",
        username: "john_doe",
        alertType: "severe_anxiety",
        severity: "high",
        timestamp: "2025-04-21T14:23:45",
        sessionId: "s789",
        reviewed: false,
        context: "User expressed overwhelming feelings of panic and inability to breathe during conversation about work pressures."
      },
      {
        id: "a2",
        userId: "u456",
        username: "sarah_smith",
        alertType: "depression",
        severity: "medium",
        timestamp: "2025-04-21T09:12:30",
        sessionId: "s790",
        reviewed: false,
        context: "User mentioned feeling hopeless and having no energy for several weeks. Sleep patterns are disrupted."
      },
      {
        id: "a3",
        userId: "u789",
        username: "michael_jones",
        alertType: "suicidal",
        severity: "critical",
        timestamp: "2025-04-20T23:45:12",
        sessionId: "s788",
        reviewed: true,
        context: "User expressed thoughts about not wanting to live anymore and feeling like a burden to family."
      },
      {
        id: "a4",
        userId: "u234",
        username: "emily_jackson",
        alertType: "anger",
        severity: "low",
        timestamp: "2025-04-20T16:33:20",
        sessionId: "s787",
        reviewed: false,
        context: "User described feeling increasingly irritable and having angry outbursts toward family members."
      }
    ];
  });

  const markAsReviewed = (id: string) => {
    const updatedAlerts = alerts.map(alert => 
      alert.id === id ? { ...alert, reviewed: true } : alert
    );
    setAlerts(updatedAlerts);
    localStorage.setItem("distressAlerts", JSON.stringify(updatedAlerts));
    toast.success("Alert marked as reviewed");
  };

  const getTimeDifference = (timestamp: string) => {
    const alertTime = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - alertTime.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHrs < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHrs < 24) {
      return `${diffHrs} hour${diffHrs !== 1 ? 's' : ''} ago`;
    } else {
      const diffDays = Math.floor(diffHrs / 24);
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    let matchesFilter = true;
    if (filter === "unreviewed") {
      matchesFilter = !alert.reviewed;
    } else if (filter === "critical") {
      matchesFilter = alert.severity === "critical";
    } else if (filter === "high") {
      matchesFilter = alert.severity === "high";
    }
    
    const searchMatch = 
      alert.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alertTypeLabels[alert.alertType].toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && searchMatch;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-500 bg-red-100 dark:bg-red-900/20";
      case "high": return "text-orange-500 bg-orange-100 dark:bg-orange-900/20";
      case "medium": return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20";
      case "low": return "text-blue-500 bg-blue-100 dark:bg-blue-900/20";
      default: return "text-gray-500 bg-gray-100 dark:bg-gray-900/20";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-wellness-primary" />
            Distress Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alerts..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter alerts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Alerts</SelectItem>
                <SelectItem value="unreviewed">Unreviewed</SelectItem>
                <SelectItem value="critical">Critical Only</SelectItem>
                <SelectItem value="high">High Severity</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Alert Type</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead className="hidden md:table-cell">Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlerts.length > 0 ? (
                  filteredAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell className="font-medium">{alert.username}</TableCell>
                      <TableCell>
                        {alert.alertType === "suicidal" ? (
                          <span className="flex items-center text-red-600">
                            <AlertCircle className="mr-1 h-4 w-4" />
                            {alertTypeLabels[alert.alertType]}
                          </span>
                        ) : (
                          alertTypeLabels[alert.alertType]
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{getTimeDifference(alert.timestamp)}</TableCell>
                      <TableCell>
                        {alert.reviewed ? (
                          <Badge variant="outline" className="text-green-600 bg-green-100 dark:bg-green-900/20">
                            <Check className="mr-1 h-3 w-3" />
                            Reviewed
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20">
                            Pending
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          {!alert.reviewed && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 flex items-center px-2 text-green-600"
                              onClick={() => markAsReviewed(alert.id)}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              <span className="hidden sm:inline">Review</span>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No alerts matching the current filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg">
            <h3 className="text-sm font-semibold flex items-center text-yellow-800 dark:text-yellow-400">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Alert Handling Protocol
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Critical alerts, especially those marked as suicidal, require immediate attention by a qualified therapist. 
              Review these first and follow the emergency protocol for severe cases.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
