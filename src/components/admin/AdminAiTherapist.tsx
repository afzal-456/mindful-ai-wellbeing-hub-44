
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MessageSquare, Plus, Edit, Trash2, Search } from "lucide-react";
import { toast } from "sonner";

interface ChatSummary {
  id: string;
  userQuery: string;
  botResponse: string;
  timestamp: string;
  mood: string;
  flagged: boolean;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  priority: number;
}

export default function AdminAiTherapist() {
  const [searchTerm, setSearchTerm] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("general");
  const [priority, setPriority] = useState("5");
  const [isSaving, setIsSaving] = useState(false);
  
  // Simulated data that would come from the backend
  const [chatSummaries, setChatSummaries] = useState<ChatSummary[]>([
    {
      id: "1",
      userQuery: "I've been feeling really anxious lately and can't focus on work",
      botResponse: "I understand that anxiety can make it difficult to concentrate. Have you tried any breathing exercises or mindfulness techniques?",
      timestamp: "2025-04-22T10:23:45",
      mood: "anxious",
      flagged: true
    },
    {
      id: "2",
      userQuery: "How can I improve my sleep quality?",
      botResponse: "Consistent sleep schedules, limiting screen time before bed, and creating a relaxing bedtime routine can help improve sleep quality. Would you like me to suggest some specific techniques?",
      timestamp: "2025-04-22T09:15:30",
      mood: "tired",
      flagged: false
    },
    {
      id: "3",
      userQuery: "I'm having thoughts about self-harm",
      botResponse: "I'm concerned about what you're sharing. These thoughts are serious and I want to make sure you get the support you need. Would it be possible for you to reach out to a crisis helpline or a trusted person right now?",
      timestamp: "2025-04-21T22:05:12",
      mood: "depressed",
      flagged: true
    }
  ]);
  
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: "1",
      question: "How does the AI therapist work?",
      answer: "Our AI therapist uses natural language processing to understand your concerns and provide supportive responses based on evidence-based therapeutic approaches. While it's not a replacement for a human therapist, it can offer immediate guidance and support.",
      category: "general",
      priority: 10
    },
    {
      id: "2",
      question: "Is my conversation with the AI therapist confidential?",
      answer: "Yes, your conversations are confidential. However, if our system detects signs of potential harm to yourself or others, it may alert a human reviewer to provide appropriate resources and support.",
      category: "privacy",
      priority: 9
    },
    {
      id: "3",
      question: "What should I do in a mental health emergency?",
      answer: "If you're experiencing a mental health emergency or having thoughts of harming yourself, please contact emergency services immediately by calling 911 or your local emergency number, or text a crisis line such as 988 in the US.",
      category: "crisis",
      priority: 10
    }
  ]);
  
  const handleAddFAQ = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || !answer) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      const newFAQ: FAQ = {
        id: Date.now().toString(),
        question,
        answer,
        category,
        priority: parseInt(priority)
      };
      
      const updatedFAQs = [...faqs, newFAQ];
      setFaqs(updatedFAQs);
      
      setQuestion("");
      setAnswer("");
      setCategory("general");
      setPriority("5");
      setIsSaving(false);
      
      toast.success("FAQ added successfully");
    }, 1000);
  };

  const handleDeleteFAQ = (id: string) => {
    const updatedFAQs = faqs.filter(faq => faq.id !== id);
    setFaqs(updatedFAQs);
    toast.success("FAQ deleted successfully");
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

  const filteredSummaries = chatSummaries.filter(summary => 
    summary.userQuery.toLowerCase().includes(searchTerm.toLowerCase()) || 
    summary.botResponse.toLowerCase().includes(searchTerm.toLowerCase()) ||
    summary.mood.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-wellness-primary" />
              Recent AI Therapist Conversations
            </CardTitle>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User Query</TableHead>
                    <TableHead className="hidden md:table-cell">AI Response</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSummaries.map((summary) => (
                    <TableRow key={summary.id}>
                      <TableCell className="font-medium max-w-[200px] truncate">
                        {summary.userQuery}
                      </TableCell>
                      <TableCell className="hidden md:table-cell max-w-[300px] truncate">
                        {summary.botResponse}
                      </TableCell>
                      <TableCell>{formatDate(summary.timestamp)}</TableCell>
                      <TableCell>
                        <Badge variant={summary.flagged ? "destructive" : "secondary"}>
                          {summary.flagged ? "Flagged" : summary.mood}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-1/3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="mr-2 h-5 w-5 text-wellness-primary" />
              Add FAQ / Training
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddFAQ} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question">Question *</Label>
                <Input 
                  id="question" 
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Enter FAQ question"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="answer">Answer *</Label>
                <Textarea 
                  id="answer" 
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter FAQ answer"
                  rows={6}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  >
                    <option value="general">General</option>
                    <option value="privacy">Privacy</option>
                    <option value="crisis">Crisis</option>
                    <option value="therapy">Therapy</option>
                    <option value="technical">Technical</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority (1-10)</Label>
                  <Input 
                    id="priority" 
                    type="number"
                    min="1"
                    max="10"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-wellness-primary hover:bg-wellness-dark"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Add FAQ"}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card className="w-full md:w-2/3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-wellness-primary" />
              Managed FAQs & Training Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Question</TableHead>
                    <TableHead className="hidden md:table-cell">Answer</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {faqs.map((faq) => (
                    <TableRow key={faq.id}>
                      <TableCell className="font-medium max-w-[200px] truncate">
                        {faq.question}
                      </TableCell>
                      <TableCell className="hidden md:table-cell max-w-[300px] truncate">
                        {faq.answer}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {faq.category}
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
                            onClick={() => handleDeleteFAQ(faq.id)}
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
