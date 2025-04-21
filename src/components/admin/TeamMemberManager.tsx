
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { User, UserCog, Shield } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  image: string;
}

const TeamMemberManager = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [newMember, setNewMember] = useState<TeamMember>({
    name: "",
    role: "",
    avatar: "",
    image: ""
  });

  useEffect(() => {
    const savedMembers = localStorage.getItem("teamMembers");
    if (savedMembers) {
      setTeamMembers(JSON.parse(savedMembers));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMember(prev => ({ ...prev, [name]: value }));
  };

  const handleAddMember = () => {
    if (!newMember.name || !newMember.role) {
      toast.error("Please fill in all required fields");
      return;
    }

    const updatedMembers = [...teamMembers, newMember];
    setTeamMembers(updatedMembers);
    localStorage.setItem("teamMembers", JSON.stringify(updatedMembers));
    
    setNewMember({
      name: "",
      role: "",
      avatar: "",
      image: ""
    });
    
    toast.success("Team member added successfully");
  };

  const handleDeleteMember = (index: number) => {
    const updatedMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updatedMembers);
    localStorage.setItem("teamMembers", JSON.stringify(updatedMembers));
    toast.success("Team member removed successfully");
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Shield className="mr-2 h-6 w-6" />
          Manage Team Members
        </h2>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                placeholder="Name"
                name="name"
                value={newMember.name}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Role"
                name="role"
                value={newMember.role}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Avatar Initials"
                name="avatar"
                value={newMember.avatar}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={newMember.image}
                onChange={handleInputChange}
              />
            </div>
            <Button onClick={handleAddMember} className="w-full md:w-auto">
              Add Team Member
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index} className="relative group">
              <CardContent className="p-4">
                <div className="absolute top-2 right-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteMember(index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Delete
                  </Button>
                </div>
                <div className="text-center">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{member.avatar}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamMemberManager;
