
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Heart, Plus, Edit, Trash2, MessageSquare, Calendar, Users } from "lucide-react";
import { toast } from "sonner";

interface SupportGroup {
  id: string;
  name: string;
  description: string;
  schedule: string;
  time: string;
  maxMembers: number;
  currentMembers: number;
  moderator: string;
  active: boolean;
}

interface GroupComment {
  id: string;
  groupId: string;
  author: string;
  content: string;
  timestamp: string;
  reported: boolean;
}

export default function AdminSupportGroups() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [schedule, setSchedule] = useState("Every Monday");
  const [time, setTime] = useState("19:00");
  const [maxMembers, setMaxMembers] = useState("20");
  const [moderator, setModerator] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  
  const [selectedGroup, setSelectedGroup] = useState("");
  
  const [groups, setGroups] = useState<SupportGroup[]>([
    {
      id: "1",
      name: "Anxiety Support",
      description: "A group focused on sharing strategies and mutual support for managing anxiety and panic disorders.",
      schedule: "Every Monday",
      time: "19:00",
      maxMembers: 15,
      currentMembers: 12,
      moderator: "Dr. Emma Wilson",
      active: true
    },
    {
      id: "2",
      name: "Depression Recovery",
      description: "Supportive community for those dealing with depression, focusing on coping mechanisms and sharing experiences.",
      schedule: "Every Wednesday",
      time: "18:00",
      maxMembers: 15,
      currentMembers: 8,
      moderator: "Dr. James Peterson",
      active: true
    },
    {
      id: "3",
      name: "Mindfulness Practice",
      description: "Learn and practice mindfulness techniques together in a supportive environment.",
      schedule: "Every Friday",
      time: "17:00",
      maxMembers: 20,
      currentMembers: 16,
      moderator: "Lisa Chen, LMFT",
      active: true
    }
  ]);
  
  const [comments, setComments] = useState<GroupComment[]>([
    {
      id: "1",
      groupId: "1",
      author: "AnonymousUser123",
      content: "Today's session was really helpful. I learned a new breathing technique that I'll definitely try when I feel anxious.",
      timestamp: "2025-04-21T20:15:30",
      reported: false
    },
    {
      id: "2",
      groupId: "1",
      author: "HealingJourney",
      content: "Can someone recommend resources for social anxiety specifically? I'm really struggling with work meetings.",
      timestamp: "2025-04-21T20:25:45",
      reported: false
    },
    {
      id: "3",
      groupId: "2",
      author: "NewBeginnings",
      content: "I've been feeling really low lately and can't seem to get motivated. Any suggestions?",
      timestamp: "2025-04-19T18:45:20",
      reported: false
    },
    {
      id: "4",
      groupId: "3",
      author: "MindfulPath",
      content: "The body scan meditation we did last week has been life-changing for my sleep issues!",
      timestamp: "2025-04-20T17:30:10",
      reported: false
    },
    {
      id: "5",
      groupId: "1",
      author: "AngryUser99",
      content: "[inappropriate content removed]",
      timestamp: "2025-04-22T08:12:45",
      reported: true
    }
  ]);

  const handleAddGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !schedule || !time || !moderator) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      const newGroup: SupportGroup = {
        id: Date.now().toString(),
        name,
        description,
        schedule,
        time,
        maxMembers: parseInt(maxMembers),
        currentMembers: 0,
        moderator,
        active: true
      };
      
      const updatedGroups = [...groups, newGroup];
      setGroups(updatedGroups);
      
      // Reset form
      setName("");
      setDescription("");
      setSchedule("Every Monday");
      setTime("19:00");
      setMaxMembers("20");
      setModerator("");
      setIsSaving(false);
      
      toast.success("Support group added successfully");
    }, 1000);
  };

  const handleDeleteGroup = (id: string) => {
    const updatedGroups = groups.filter(group => group.id !== id);
    setGroups(updatedGroups);
    
    // Also remove associated comments
    const updatedComments = comments.filter(comment => comment.groupId !== id);
    setComments(updatedComments);
    
    toast.success("Support group deleted successfully");
  };

  const handleRemoveComment = (id: string) => {
    const updatedComments = comments.filter(comment => comment.id !== id);
    setComments(updatedComments);
    toast.success("Comment removed successfully");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredComments = selectedGroup 
    ? comments.filter(comment => comment.groupId === selectedGroup)
    : comments;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="mr-2 h-5 w-5 text-wellness-primary" />
              Create Support Group
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddGroup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Group Name *</Label>
                <Input 
                  id="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter group name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea 
                  id="description" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter group description"
                  rows={4}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="schedule">Schedule *</Label>
                  <select
                    id="schedule"
                    value={schedule}
                    onChange={(e) => setSchedule(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    required
                  >
                    <option value="Every Monday">Every Monday</option>
                    <option value="Every Tuesday">Every Tuesday</option>
                    <option value="Every Wednesday">Every Wednesday</option>
                    <option value="Every Thursday">Every Thursday</option>
                    <option value="Every Friday">Every Friday</option>
                    <option value="Every Saturday">Every Saturday</option>
                    <option value="Every Sunday">Every Sunday</option>
                    <option value="Bi-weekly">Bi-weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time">Time *</Label>
                  <Input 
                    id="time" 
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxMembers">Max Members</Label>
                  <Input 
                    id="maxMembers" 
                    type="number"
                    value={maxMembers}
                    onChange={(e) => setMaxMembers(e.target.value)}
                    min="5"
                    max="50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="moderator">Moderator *</Label>
                  <Input 
                    id="moderator" 
                    value={moderator}
                    onChange={(e) => setModerator(e.target.value)}
                    placeholder="Enter moderator name"
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-wellness-primary hover:bg-wellness-dark"
                disabled={isSaving}
              >
                {isSaving ? "Creating..." : "Create Group"}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-wellness-primary" />
              Group Comments & Discussions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Label htmlFor="filterGroup">Filter by Group</Label>
              <select
                id="filterGroup"
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background mt-2"
              >
                <option value="">All Groups</option>
                {groups.map(group => (
                  <option key={group.id} value={group.id}>{group.name}</option>
                ))}
              </select>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Author</TableHead>
                    <TableHead>Comment</TableHead>
                    <TableHead className="hidden md:table-cell">Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredComments.map((comment) => (
                    <TableRow key={comment.id}>
                      <TableCell className="font-medium">{comment.author}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {comment.content}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {formatDate(comment.timestamp)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={comment.reported ? "destructive" : "outline"}>
                          {comment.reported ? "Reported" : "Normal"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                          onClick={() => handleRemoveComment(comment.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="mr-2 h-5 w-5 text-wellness-primary" />
            Support Groups
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Description</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Moderator</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groups.map((group) => (
                  <TableRow key={group.id}>
                    <TableCell className="font-medium">{group.name}</TableCell>
                    <TableCell className="hidden md:table-cell max-w-[250px] truncate">
                      {group.description}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{group.schedule}</span>
                        <span className="text-xs text-muted-foreground">{group.time}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{`${group.currentMembers}/${group.maxMembers}`}</span>
                      </div>
                    </TableCell>
                    <TableCell>{group.moderator}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteGroup(group.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
