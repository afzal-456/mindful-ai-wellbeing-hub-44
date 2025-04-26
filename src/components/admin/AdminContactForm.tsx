
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

export default function AdminContactForm() {
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem("contactMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  const handleDelete = (id: string) => {
    const updatedMessages = messages.filter(msg => msg.id !== id);
    setMessages(updatedMessages);
    localStorage.setItem("contactMessages", JSON.stringify(updatedMessages));
    toast.success("Message deleted successfully");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="mr-2 h-5 w-5 text-wellness-primary" />
            Contact Messages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="hidden md:table-cell">Subject</TableHead>
                  <TableHead className="hidden md:table-cell">Message</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((msg) => (
                  <TableRow key={msg.id}>
                    <TableCell>{msg.date}</TableCell>
                    <TableCell>{msg.name}</TableCell>
                    <TableCell>{msg.email}</TableCell>
                    <TableCell className="hidden md:table-cell">{msg.subject}</TableCell>
                    <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                      {msg.message}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDelete(msg.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {messages.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No messages received yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
