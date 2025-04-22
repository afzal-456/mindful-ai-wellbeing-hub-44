
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Plus, Edit, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";

interface ContentItem {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  publishDate: string;
}

export default function AdminContentManager() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [contentItems, setContentItems] = useState<ContentItem[]>(() => {
    const savedContent = localStorage.getItem("selfHelpContent");
    return savedContent ? JSON.parse(savedContent) : [
      {
        id: "1",
        title: "Managing Anxiety Through Mindfulness",
        category: "anxiety",
        excerpt: "Learn practical mindfulness techniques to reduce anxiety symptoms",
        content: "Mindfulness is the practice of being present and engaged in the moment, without judgment. Research has shown that regular mindfulness practice can significantly reduce anxiety symptoms by helping individuals focus on the present rather than worrying about the future.\n\nTry this simple 5-minute breathing exercise: Sit comfortably with your back straight. Close your eyes and take a deep breath in through your nose, counting to four. Hold for a moment, then exhale slowly through your mouth, counting to six. Repeat for 5 minutes.",
        publishDate: "2025-03-10"
      },
      {
        id: "2",
        title: "Building Healthy Sleep Habits",
        category: "sleep",
        excerpt: "Improve your sleep quality with these evidence-based techniques",
        content: "Quality sleep is essential for mental health and emotional regulation. Poor sleep can worsen symptoms of anxiety, depression, and other mental health conditions.\n\nTo improve your sleep:\n- Maintain a consistent sleep schedule\n- Create a relaxing bedtime routine\n- Limit screen time before bed\n- Keep your bedroom cool, dark, and quiet\n- Avoid caffeine and alcohol close to bedtime\n- Use your bed only for sleep and intimacy",
        publishDate: "2025-02-22"
      }
    ];
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !content) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSaving(true);
    
    // Simulate saving to a backend
    setTimeout(() => {
      const newItem: ContentItem = {
        id: Date.now().toString(),
        title,
        category,
        excerpt,
        content,
        publishDate: new Date().toISOString().split('T')[0]
      };
      
      const updatedItems = [...contentItems, newItem];
      setContentItems(updatedItems);
      localStorage.setItem("selfHelpContent", JSON.stringify(updatedItems));
      
      setTitle("");
      setCategory("");
      setExcerpt("");
      setContent("");
      setIsSaving(false);
      
      toast.success("Content saved successfully");
    }, 1000);
  };

  const handleDelete = (id: string) => {
    const updatedItems = contentItems.filter(item => item.id !== id);
    setContentItems(updatedItems);
    localStorage.setItem("selfHelpContent", JSON.stringify(updatedItems));
    toast.success("Content deleted successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-1/3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="mr-2 h-5 w-5 text-wellness-primary" />
              Add Self-help Content
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
                  placeholder="Enter content title"
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
                    <SelectItem value="stress">Stress Management</SelectItem>
                    <SelectItem value="sleep">Sleep</SelectItem>
                    <SelectItem value="mindfulness">Mindfulness</SelectItem>
                    <SelectItem value="self-care">Self-Care</SelectItem>
                    <SelectItem value="relationship">Relationships</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="excerpt">Short Excerpt</Label>
                <Input 
                  id="excerpt" 
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief description (1-2 sentences)"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea 
                  id="content" 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter full content here"
                  rows={8}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-wellness-primary hover:bg-wellness-dark"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Content"}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card className="w-full md:w-2/3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-wellness-primary" />
              Self-help Content Library
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="hidden md:table-cell">Published</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contentItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell className="capitalize">{item.category}</TableCell>
                    <TableCell className="hidden md:table-cell">{item.publishDate}</TableCell>
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
                          onClick={() => handleDelete(item.id)}
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
