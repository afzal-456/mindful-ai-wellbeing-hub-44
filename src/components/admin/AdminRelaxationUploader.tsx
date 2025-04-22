
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Music, Upload, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface MusicTrack {
  id: string;
  title: string;
  frequency: string;
  description: string;
  uploadDate: string;
  fileName: string;
}

export default function AdminRelaxationUploader() {
  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [tracks, setTracks] = useState<MusicTrack[]>(() => {
    const savedTracks = localStorage.getItem("relaxationTracks");
    return savedTracks ? JSON.parse(savedTracks) : [
      {
        id: "1",
        title: "Deep Ocean Waves",
        frequency: "432 Hz",
        description: "Calming ocean waves for deep relaxation and sleep",
        uploadDate: "2025-04-15",
        fileName: "ocean_waves.mp3"
      },
      {
        id: "2",
        title: "Forest Rain Meditation",
        frequency: "528 Hz",
        description: "Gentle rain sounds in a forest setting for meditation",
        uploadDate: "2025-03-28",
        fileName: "forest_rain.mp3"
      }
    ];
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !frequency) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsUploading(true);
    
    // Simulate upload to a backend
    setTimeout(() => {
      const newTrack: MusicTrack = {
        id: Date.now().toString(),
        title,
        frequency,
        description,
        uploadDate: new Date().toISOString().split('T')[0],
        fileName: `${title.toLowerCase().replace(/\s+/g, '_')}.mp3`
      };
      
      const updatedTracks = [...tracks, newTrack];
      setTracks(updatedTracks);
      localStorage.setItem("relaxationTracks", JSON.stringify(updatedTracks));
      
      setTitle("");
      setFrequency("");
      setDescription("");
      setIsUploading(false);
      
      toast.success("Track uploaded successfully");
    }, 1500);
  };

  const handleDelete = (id: string) => {
    const updatedTracks = tracks.filter(track => track.id !== id);
    setTracks(updatedTracks);
    localStorage.setItem("relaxationTracks", JSON.stringify(updatedTracks));
    toast.success("Track deleted successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-1/3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="mr-2 h-5 w-5 text-wellness-primary" />
              Upload Relaxation Track
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Track Title *</Label>
                <Input 
                  id="title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter track title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency Tag *</Label>
                <Select value={frequency} onValueChange={setFrequency} required>
                  <SelectTrigger id="frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="432 Hz">432 Hz - Relaxation</SelectItem>
                    <SelectItem value="528 Hz">528 Hz - Healing</SelectItem>
                    <SelectItem value="639 Hz">639 Hz - Connection</SelectItem>
                    <SelectItem value="741 Hz">741 Hz - Expression</SelectItem>
                    <SelectItem value="852 Hz">852 Hz - Intuition</SelectItem>
                    <SelectItem value="963 Hz">963 Hz - Awakening</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter track description"
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="file">Audio File</Label>
                <Input 
                  id="file" 
                  type="file" 
                  accept="audio/*"
                />
                <p className="text-xs text-muted-foreground">Max file size: 10MB. Supported formats: MP3, WAV</p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-wellness-primary hover:bg-wellness-dark"
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Upload Track"}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card className="w-full md:w-2/3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Music className="mr-2 h-5 w-5 text-wellness-primary" />
              Relaxation Tracks Library
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead className="hidden md:table-cell">Upload Date</TableHead>
                  <TableHead className="hidden md:table-cell">File</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tracks.map((track) => (
                  <TableRow key={track.id}>
                    <TableCell className="font-medium">{track.title}</TableCell>
                    <TableCell>{track.frequency}</TableCell>
                    <TableCell className="hidden md:table-cell">{track.uploadDate}</TableCell>
                    <TableCell className="hidden md:table-cell">{track.fileName}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(track.id)}
                        >
                          <Trash2 className="h-4 w-4" />
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
  );
}
