
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from "recharts";
import { BarChart4 } from "lucide-react";

interface MoodData {
  date: string;
  happy: number;
  calm: number;
  sad: number;
  anxious: number;
  angry: number;
  total: number;
}

export default function AdminMoodTrends() {
  const [timeRange, setTimeRange] = useState("week");
  const [chartData, setChartData] = useState<MoodData[]>([]);
  
  // Generate sample data
  useEffect(() => {
    let data: MoodData[] = [];
    const today = new Date();
    
    if (timeRange === "week") {
      // Generate data for past 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        const happy = Math.floor(Math.random() * 30) + 10;
        const calm = Math.floor(Math.random() * 25) + 15;
        const sad = Math.floor(Math.random() * 20) + 5;
        const anxious = Math.floor(Math.random() * 25) + 5;
        const angry = Math.floor(Math.random() * 15) + 2;
        
        data.push({
          date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
          happy,
          calm,
          sad,
          anxious,
          angry,
          total: happy + calm + sad + anxious + angry
        });
      }
    } else if (timeRange === "month") {
      // Generate data for past 4 weeks
      for (let i = 3; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - (i * 7));
        
        const happy = Math.floor(Math.random() * 120) + 80;
        const calm = Math.floor(Math.random() * 100) + 100;
        const sad = Math.floor(Math.random() * 70) + 30;
        const anxious = Math.floor(Math.random() * 90) + 50;
        const angry = Math.floor(Math.random() * 50) + 20;
        
        data.push({
          date: `Week ${4-i}: ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
          happy,
          calm,
          sad,
          anxious,
          angry,
          total: happy + calm + sad + anxious + angry
        });
      }
    } else if (timeRange === "year") {
      // Generate data for past 12 months
      for (let i = 11; i >= 0; i--) {
        const date = new Date(today);
        date.setMonth(date.getMonth() - i);
        
        const happy = Math.floor(Math.random() * 500) + 300;
        const calm = Math.floor(Math.random() * 400) + 400;
        const sad = Math.floor(Math.random() * 300) + 200;
        const anxious = Math.floor(Math.random() * 350) + 250;
        const angry = Math.floor(Math.random() * 200) + 100;
        
        data.push({
          date: date.toLocaleDateString('en-US', { month: 'short' }),
          happy,
          calm,
          sad,
          anxious,
          angry,
          total: happy + calm + sad + anxious + angry
        });
      }
    }
    
    setChartData(data);
  }, [timeRange]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center">
          <BarChart4 className="mr-2 h-5 w-5 text-wellness-primary" />
          Mood Trends Analysis
        </h2>
        
        <div className="w-40">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger id="time-range">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Past Week</SelectItem>
              <SelectItem value="month">Past Month</SelectItem>
              <SelectItem value="year">Past Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mood Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="happy" stackId="a" fill="#4ade80" name="Happy" />
                  <Bar dataKey="calm" stackId="a" fill="#60a5fa" name="Calm" />
                  <Bar dataKey="sad" stackId="a" fill="#a78bfa" name="Sad" />
                  <Bar dataKey="anxious" stackId="a" fill="#fbbf24" name="Anxious" />
                  <Bar dataKey="angry" stackId="a" fill="#f87171" name="Angry" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Mood Trends Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="happy" stroke="#4ade80" name="Happy" />
                  <Line type="monotone" dataKey="calm" stroke="#60a5fa" name="Calm" />
                  <Line type="monotone" dataKey="sad" stroke="#a78bfa" name="Sad" />
                  <Line type="monotone" dataKey="anxious" stroke="#fbbf24" name="Anxious" />
                  <Line type="monotone" dataKey="angry" stroke="#f87171" name="Angry" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Mood Pattern Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">The mood data represents patterns detected by the AI chatbot during user interactions. Higher numbers indicate more instances where the mood was detected.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-green-600 dark:text-green-400">Positive Moods</h3>
                <p className="text-sm text-muted-foreground">Happy and calm emotions have shown a {Math.random() > 0.5 ? "positive" : "negative"} trend over the selected period.</p>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-600 dark:text-yellow-400">Concerning Moods</h3>
                <p className="text-sm text-muted-foreground">Anxious emotions have {Math.random() > 0.5 ? "increased" : "decreased"} by approximately {Math.floor(Math.random() * 20) + 5}% compared to the previous period.</p>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-red-600 dark:text-red-400">Distress Moods</h3>
                <p className="text-sm text-muted-foreground">Sad and angry emotions have triggered {Math.floor(Math.random() * 10) + 5} alerts requiring therapist review.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
