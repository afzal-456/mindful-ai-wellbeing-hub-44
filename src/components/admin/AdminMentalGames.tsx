
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Gamepad2, Plus, Edit, Trash2, BarChart4 } from "lucide-react";
import { toast } from "sonner";

interface Game {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  gameUrl: string;
  category: string;
  difficulty: string;
  available: boolean;
  usageCount: number;
}

export default function AdminMentalGames() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [gameUrl, setGameUrl] = useState("");
  const [category, setCategory] = useState("focus");
  const [difficulty, setDifficulty] = useState("medium");
  const [isSaving, setIsSaving] = useState(false);
  
  const [games, setGames] = useState<Game[]>([
    {
      id: "1",
      title: "Focus Trainer",
      description: "Improve concentration by focusing on moving objects while ignoring distractions. Multiple difficulty levels available.",
      thumbnailUrl: "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      gameUrl: "/mental-games/focus-trainer",
      category: "focus",
      difficulty: "medium",
      available: true,
      usageCount: 245
    },
    {
      id: "2",
      title: "Memory Match",
      description: "Classic card matching game designed to improve short-term memory and cognitive function.",
      thumbnailUrl: "https://images.unsplash.com/photo-1605870445919-838d190e8e1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      gameUrl: "/mental-games/memory-game",
      category: "memory",
      difficulty: "easy",
      available: true,
      usageCount: 312
    },
    {
      id: "3",
      title: "Problem Solver",
      description: "Solving logical problems helps train analytical thinking and reduces rumination on personal issues.",
      thumbnailUrl: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      gameUrl: "/mental-games/problem-solver",
      category: "problem-solving",
      difficulty: "hard",
      available: true,
      usageCount: 189
    }
  ]);

  const handleAddGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !gameUrl) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      const newGame: Game = {
        id: Date.now().toString(),
        title,
        description,
        thumbnailUrl: thumbnailUrl || "https://images.unsplash.com/photo-1553481187-be93c21490a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
        gameUrl,
        category,
        difficulty,
        available: true,
        usageCount: 0
      };
      
      const updatedGames = [...games, newGame];
      setGames(updatedGames);
      
      // Reset form
      setTitle("");
      setDescription("");
      setThumbnailUrl("");
      setGameUrl("");
      setCategory("focus");
      setDifficulty("medium");
      setIsSaving(false);
      
      toast.success("Game added successfully");
    }, 1000);
  };

  const handleDeleteGame = (id: string) => {
    const updatedGames = games.filter(game => game.id !== id);
    setGames(updatedGames);
    toast.success("Game deleted successfully");
  };

  const handleToggleAvailability = (id: string) => {
    const updatedGames = games.map(game => 
      game.id === id ? {...game, available: !game.available} : game
    );
    setGames(updatedGames);
    
    const game = games.find(g => g.id === id);
    const statusMessage = game?.available ? "disabled" : "enabled";
    toast.success(`Game ${statusMessage} successfully`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-1/3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="mr-2 h-5 w-5 text-wellness-primary" />
              Add Mental Game
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddGame} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Game Title *</Label>
                <Input 
                  id="title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter game title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea 
                  id="description" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter game description"
                  rows={4}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gameUrl">Game URL *</Label>
                <Input 
                  id="gameUrl" 
                  value={gameUrl}
                  onChange={(e) => setGameUrl(e.target.value)}
                  placeholder="Enter URL or path to game"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
                <Input 
                  id="thumbnailUrl" 
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  placeholder="Enter thumbnail image URL"
                />
                <p className="text-xs text-muted-foreground">Leave blank to use default image</p>
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
                    <option value="focus">Focus</option>
                    <option value="memory">Memory</option>
                    <option value="problem-solving">Problem Solving</option>
                    <option value="relaxation">Relaxation</option>
                    <option value="mindfulness">Mindfulness</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <select
                    id="difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-wellness-primary hover:bg-wellness-dark"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Add Game"}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card className="w-full md:w-2/3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Gamepad2 className="mr-2 h-5 w-5 text-wellness-primary" />
              Mental Games Library
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="hidden md:table-cell">
                      <div className="flex items-center">
                        <BarChart4 className="h-4 w-4 mr-1" />
                        <span>Usage</span>
                      </div>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {games.map((game) => (
                    <TableRow key={game.id}>
                      <TableCell className="font-medium">{game.title}</TableCell>
                      <TableCell className="hidden md:table-cell max-w-[250px] truncate">
                        {game.description}
                      </TableCell>
                      <TableCell className="capitalize">
                        <Badge variant="outline">
                          {game.category.replace("-", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{game.usageCount}</TableCell>
                      <TableCell>
                        <Badge variant={game.available ? "default" : "secondary"}>
                          {game.available ? "Active" : "Disabled"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className={`text-xs ${game.available ? "text-orange-500" : "text-green-500"}`}
                            onClick={() => handleToggleAvailability(game.id)}
                          >
                            {game.available ? "Disable" : "Enable"}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteGame(game.id)}
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
