
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Plus, Edit, Trash2, Eye, Search } from "lucide-react";
import { toast } from "sonner";

interface TherapistNote {
  id: string;
  title: string;
  category: string;
  content: string;
  authorName: string;
  createdAt: string;
  tags: string[];
}

export default function AdminTherapistNotes() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [tags, setTags] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  
  const [notes, setNotes] = useState<TherapistNote[]>(() => {
    const savedNotes = localStorage.getItem("therapistNotes");
    return savedNotes ? JSON.parse(savedNotes) : [
      {
        id: "1",
        title: "Anxiety Management Techniques",
        category: "anxiety",
        content: "When working with clients experiencing generalized anxiety, I've found these techniques particularly helpful:\n\n1. Progressive Muscle Relaxation: Guide the client through tensing and relaxing different muscle groups systematically.\n\n2. 4-7-8 Breathing: Inhale for 4 counts, hold for 7, exhale for 8. This activates the parasympathetic nervous system.\n\n3. Cognitive Restructuring: Help clients identify and challenge catastrophic thinking patterns.\n\n4. Mindfulness Grounding: The 5-4-3-2-1 technique (identify 5 things you see, 4 things you feel, etc.) works well for acute anxiety.",
        authorName: "Dr. Rebecca Chen",
        createdAt: "2025-04-18T14:23:00",
        tags: ["anxiety", "techniques", "breathing", "cognitive", "mindfulness"]
      },
      {
        id: "2",
        title: "Supporting Clients with Depression",
        category: "depression",
        content: "Clinical observations for working with depressed clients:\n\n- Behavioral activation should start small. Begin with 5-minute activities rather than overwhelming tasks.\n\n- Morning routine suggestions: Light therapy, brief stretching, and hydration before checking devices.\n\n- Social connection interventions work best when tailored to the client's comfort level and existing relationships.\n\n- Sleep hygiene is foundational - consider this before more complex interventions.\n\n- Nutrition focus: Adding nutrient-dense foods rather than restricting has shown better adherence.",
        authorName: "Dr. Michael Santos",
        createdAt: "2025-04-15T09:45:00",
        tags: ["depression", "behavioral", "activation", "sleep", "nutrition"]
      }
    ];
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !content || !authorName) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSaving(true);
    
    // Simulate saving to a backend
    setTimeout(() => {
      const newNote: TherapistNote = {
        id: Date.now().toString(),
        title,
        category,
        content,
        authorName,
        createdAt: new Date().toISOString(),
        tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0)
      };
      
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      localStorage.setItem("therapistNotes", JSON.stringify(updatedNotes));
      
      setTitle("");
      setCategory("");
      setContent("");
      setAuthorName("");
      setTags("");
      setIsSaving(false);
      
      toast.success("Note saved successfully");
    }, 1000);
  };

  const handleDelete = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem("therapistNotes", JSON.stringify(updatedNotes));
    toast.success("Note deleted successfully");
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    note.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-1/3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="mr-2 h-5 w-5 text-wellness-primary" />
              Add Therapist Note
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input 
                  id="title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter note title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="anxiety">Anxiety</SelectItem>
                    <SelectItem value="depression">Depression</SelectItem>
                    <SelectItem value="trauma">Trauma</SelectItem>
                    <SelectItem value="addiction">Addiction</SelectItem>
                    <SelectItem value="general">General Techniques</SelectItem>
                    <SelectItem value="research">Research Insights</SelectItem>
                    <SelectItem value="case_study">Case Study</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea 
                  id="content" 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter note content"
                  rows={6}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="author">Author Name *</Label>
                <Input 
                  id="author" 
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Enter author name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input 
                  id="tags" 
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g., anxiety, breathing, techniques"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-wellness-primary hover:bg-wellness-dark"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Note"}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card className="w-full md:w-2/3">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-wellness-primary" />
              Therapist Notes Library
            </CardTitle>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notes..."
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
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Author</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNotes.length > 0 ? (
                  filteredNotes.map((note) => (
                    <TableRow key={note.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{note.title}</p>
                          <p className="text-xs text-muted-foreground capitalize">{note.category.replace('_', ' ')}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{note.authorName}</TableCell>
                      <TableCell className="hidden md:table-cell">{formatDate(note.createdAt)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(note.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">
                      No notes found matching your search
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
