
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, UserPlus, Edit, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";

interface Therapist {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  imageUrl: string;
  videoLink: string;
  available: boolean;
}

interface ScheduleSlot {
  id: string;
  therapistId: string;
  therapistName: string;
  date: string;
  startTime: string;
  endTime: string;
  booked: boolean;
}

export default function AdminLiveSessions() {
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [bio, setBio] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  
  // Schedule state
  const [selectedTherapist, setSelectedTherapist] = useState("");
  const [sessionDate, setSessionDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  
  const [therapists, setTherapists] = useState<Therapist[]>([
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialty: "Anxiety & Depression",
      bio: "Licensed clinical psychologist with 15 years of experience in treating anxiety and depression. Specializes in cognitive-behavioral therapy and mindfulness-based approaches.",
      imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      videoLink: "https://meet.google.com/abc-defg-hij",
      available: true
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialty: "Trauma Recovery",
      bio: "Trauma specialist with training in EMDR and somatic experiencing. Works with adults recovering from childhood trauma, PTSD, and complex trauma.",
      imageUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      videoLink: "https://zoom.us/j/12345678901",
      available: true
    }
  ]);
  
  const [scheduleSlots, setScheduleSlots] = useState<ScheduleSlot[]>([
    {
      id: "1",
      therapistId: "1",
      therapistName: "Dr. Sarah Johnson",
      date: "2025-04-23",
      startTime: "09:00",
      endTime: "10:00",
      booked: true
    },
    {
      id: "2",
      therapistId: "1",
      therapistName: "Dr. Sarah Johnson",
      date: "2025-04-23",
      startTime: "10:30",
      endTime: "11:30",
      booked: false
    },
    {
      id: "3",
      therapistId: "2",
      therapistName: "Dr. Michael Chen",
      date: "2025-04-24",
      startTime: "13:00",
      endTime: "14:00",
      booked: false
    }
  ]);

  const handleAddTherapist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !specialty || !bio) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      const newTherapist: Therapist = {
        id: Date.now().toString(),
        name,
        specialty,
        bio,
        imageUrl: imageUrl || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
        videoLink,
        available: true
      };
      
      const updatedTherapists = [...therapists, newTherapist];
      setTherapists(updatedTherapists);
      
      // Reset form
      setName("");
      setSpecialty("");
      setBio("");
      setVideoLink("");
      setImageUrl("");
      setIsSaving(false);
      
      toast.success("Therapist added successfully");
    }, 1000);
  };

  const handleAddSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTherapist || !sessionDate || !startTime || !endTime) {
      toast.error("Please fill all required fields");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const therapist = therapists.find(t => t.id === selectedTherapist);
      
      if (!therapist) {
        toast.error("Therapist not found");
        return;
      }
      
      const newSlot: ScheduleSlot = {
        id: Date.now().toString(),
        therapistId: selectedTherapist,
        therapistName: therapist.name,
        date: sessionDate,
        startTime,
        endTime,
        booked: false
      };
      
      const updatedSlots = [...scheduleSlots, newSlot];
      setScheduleSlots(updatedSlots);
      
      // Reset form
      setSelectedTherapist("");
      setSessionDate("");
      setStartTime("");
      setEndTime("");
      
      toast.success("Schedule slot added successfully");
    }, 500);
  };

  const handleDeleteTherapist = (id: string) => {
    const updatedTherapists = therapists.filter(therapist => therapist.id !== id);
    setTherapists(updatedTherapists);
    
    // Also remove their schedule slots
    const updatedSlots = scheduleSlots.filter(slot => slot.therapistId !== id);
    setScheduleSlots(updatedSlots);
    
    toast.success("Therapist deleted successfully");
  };

  const handleDeleteSlot = (id: string) => {
    const updatedSlots = scheduleSlots.filter(slot => slot.id !== id);
    setScheduleSlots(updatedSlots);
    toast.success("Schedule slot deleted successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserPlus className="mr-2 h-5 w-5 text-wellness-primary" />
              Add Therapist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddTherapist} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Therapist Name *</Label>
                <Input 
                  id="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter therapist name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty *</Label>
                <Input 
                  id="specialty" 
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  placeholder="E.g., Anxiety & Depression, Trauma Recovery"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio *</Label>
                <Textarea 
                  id="bio" 
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Enter therapist bio"
                  rows={4}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="videoLink">Video Session Link</Label>
                <Input 
                  id="videoLink" 
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                  placeholder="E.g., https://meet.google.com/abc-defg-hij"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Profile Image URL</Label>
                <Input 
                  id="imageUrl" 
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Enter image URL"
                />
                <p className="text-xs text-muted-foreground">Leave blank to use default image</p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-wellness-primary hover:bg-wellness-dark"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Add Therapist"}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-wellness-primary" />
              Add Availability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddSchedule} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="therapist">Select Therapist *</Label>
                <select
                  id="therapist"
                  value={selectedTherapist}
                  onChange={(e) => setSelectedTherapist(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  required
                >
                  <option value="">Select a therapist</option>
                  {therapists.map(therapist => (
                    <option key={therapist.id} value={therapist.id}>{therapist.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Session Date *</Label>
                <Input 
                  id="date" 
                  type="date"
                  value={sessionDate}
                  onChange={(e) => setSessionDate(e.target.value)}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time *</Label>
                  <Input 
                    id="startTime" 
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time *</Label>
                  <Input 
                    id="endTime" 
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-wellness-primary hover:bg-wellness-dark"
              >
                Add Schedule Slot
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserPlus className="mr-2 h-5 w-5 text-wellness-primary" />
              Therapist Directory
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead className="hidden md:table-cell">Bio</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {therapists.map((therapist) => (
                    <TableRow key={therapist.id}>
                      <TableCell className="font-medium">{therapist.name}</TableCell>
                      <TableCell>{therapist.specialty}</TableCell>
                      <TableCell className="hidden md:table-cell max-w-[300px] truncate">
                        {therapist.bio}
                      </TableCell>
                      <TableCell>
                        <Badge variant={therapist.available ? "default" : "outline"}>
                          {therapist.available ? "Available" : "Unavailable"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteTherapist(therapist.id)}
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
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-wellness-primary" />
              Session Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Therapist</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduleSlots.map((slot) => (
                    <TableRow key={slot.id}>
                      <TableCell className="font-medium">{slot.therapistName}</TableCell>
                      <TableCell>{slot.date}</TableCell>
                      <TableCell>{`${slot.startTime} - ${slot.endTime}`}</TableCell>
                      <TableCell>
                        <Badge variant={slot.booked ? "secondary" : "outline"}>
                          {slot.booked ? "Booked" : "Available"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteSlot(slot.id)}
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
    </div>
  );
}
