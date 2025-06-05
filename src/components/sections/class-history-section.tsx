"use client";

import { useState } from "react";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle 
} from "@/components/ui/dialog";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

interface Student {
  id: string;
  name: string;
  timeSpent: string;
  questionsAnswered: number;
  score: number;
  details: {
    correctAnswers: number;
    wrongAnswers: number;
    topicPerformance: { topic: string; score: number }[];
  };
}

interface ClassData {
  id: string;
  name: string;
  date: string;
  averageScore: number;
  participants: number;
  totalTime: string;
  students: Student[];
}

// Placeholder data (replace with actual data from your backend later)
const mockClasses: ClassData[] = [
  {
    id: "1",
    name: "Financial Basics 101",
    date: "2024-03-15",
    averageScore: 85,
    participants: 25,
    totalTime: "1h 30m",
    students: [
      {
        id: "s1",
        name: "John Doe",
        timeSpent: "1h 15m",
        questionsAnswered: 20,
        score: 90,
        details: {
          correctAnswers: 18,
          wrongAnswers: 2,
          topicPerformance: [
            { topic: "Budgeting", score: 95 },
            { topic: "Savings", score: 85 },
            { topic: "Investment", score: 90 },
          ],
        },
      },
      {
        id: "s2",
        name: "Emma van der Berg",
        timeSpent: "1h 20m",
        questionsAnswered: 20,
        score: 95,
        details: {
          correctAnswers: 19,
          wrongAnswers: 1,
          topicPerformance: [
            { topic: "Budgeting", score: 100 },
            { topic: "Savings", score: 90 },
            { topic: "Investment", score: 95 },
          ],
        },
      },
      {
        id: "s3",
        name: "Lucas de Vries",
        timeSpent: "1h 05m",
        questionsAnswered: 18,
        score: 78,
        details: {
          correctAnswers: 14,
          wrongAnswers: 4,
          topicPerformance: [
            { topic: "Budgeting", score: 80 },
            { topic: "Savings", score: 75 },
            { topic: "Investment", score: 79 },
          ],
        },
      },
      {
        id: "s4",
        name: "Sophie Jansen",
        timeSpent: "1h 25m",
        questionsAnswered: 20,
        score: 85,
        details: {
          correctAnswers: 17,
          wrongAnswers: 3,
          topicPerformance: [
            { topic: "Budgeting", score: 90 },
            { topic: "Savings", score: 80 },
            { topic: "Investment", score: 85 },
          ],
        },
      },
      {
        id: "s5",
        name: "Milan Bakker",
        timeSpent: "1h 10m",
        questionsAnswered: 19,
        score: 82,
        details: {
          correctAnswers: 16,
          wrongAnswers: 3,
          topicPerformance: [
            { topic: "Budgeting", score: 85 },
            { topic: "Savings", score: 80 },
            { topic: "Investment", score: 81 },
          ],
        },
      },
    ],
  },
  {
    id: "2",
    name: "Personal Finance Workshop",
    date: "2024-03-10",
    averageScore: 79,
    participants: 20,
    totalTime: "2h 00m",
    students: [
      {
        id: "s6",
        name: "Liam van Dijk",
        timeSpent: "1h 45m",
        questionsAnswered: 25,
        score: 88,
        details: {
          correctAnswers: 22,
          wrongAnswers: 3,
          topicPerformance: [
            { topic: "Budgeting", score: 90 },
            { topic: "Savings", score: 85 },
            { topic: "Investment", score: 89 },
          ],
        },
      },
      {
        id: "s7",
        name: "Eva Smit",
        timeSpent: "1h 55m",
        questionsAnswered: 25,
        score: 92,
        details: {
          correctAnswers: 23,
          wrongAnswers: 2,
          topicPerformance: [
            { topic: "Budgeting", score: 95 },
            { topic: "Savings", score: 90 },
            { topic: "Investment", score: 91 },
          ],
        },
      },
      {
        id: "s8",
        name: "Thomas Visser",
        timeSpent: "1h 30m",
        questionsAnswered: 22,
        score: 77,
        details: {
          correctAnswers: 17,
          wrongAnswers: 5,
          topicPerformance: [
            { topic: "Budgeting", score: 75 },
            { topic: "Savings", score: 80 },
            { topic: "Investment", score: 76 },
          ],
        },
      },
      {
        id: "s9",
        name: "Julia de Jong",
        timeSpent: "2h 00m",
        questionsAnswered: 25,
        score: 96,
        details: {
          correctAnswers: 24,
          wrongAnswers: 1,
          topicPerformance: [
            { topic: "Budgeting", score: 100 },
            { topic: "Savings", score: 95 },
            { topic: "Investment", score: 93 },
          ],
        },
      },
      {
        id: "s10",
        name: "Sem Peters",
        timeSpent: "1h 40m",
        questionsAnswered: 23,
        score: 83,
        details: {
          correctAnswers: 19,
          wrongAnswers: 4,
          topicPerformance: [
            { topic: "Budgeting", score: 85 },
            { topic: "Savings", score: 80 },
            { topic: "Investment", score: 84 },
          ],
        },
      },
    ],
  },
  {
    id: "3",
    name: "Money Management Basics",
    date: "2024-03-05",
    averageScore: 82,
    participants: 18,
    totalTime: "1h 45m",
    students: [
      {
        id: "s11",
        name: "Noah van der Meer",
        timeSpent: "1h 35m",
        questionsAnswered: 22,
        score: 86,
        details: {
          correctAnswers: 19,
          wrongAnswers: 3,
          topicPerformance: [
            { topic: "Budgeting", score: 85 },
            { topic: "Savings", score: 88 },
            { topic: "Investment", score: 85 },
          ],
        },
      },
      {
        id: "s12",
        name: "Isa Vermeulen",
        timeSpent: "1h 40m",
        questionsAnswered: 22,
        score: 91,
        details: {
          correctAnswers: 20,
          wrongAnswers: 2,
          topicPerformance: [
            { topic: "Budgeting", score: 90 },
            { topic: "Savings", score: 95 },
            { topic: "Investment", score: 88 },
          ],
        },
      },
      {
        id: "s13",
        name: "Daan Hendriks",
        timeSpent: "1h 25m",
        questionsAnswered: 20,
        score: 75,
        details: {
          correctAnswers: 15,
          wrongAnswers: 5,
          topicPerformance: [
            { topic: "Budgeting", score: 70 },
            { topic: "Savings", score: 80 },
            { topic: "Investment", score: 75 },
          ],
        },
      },
      {
        id: "s14",
        name: "Mila de Boer",
        timeSpent: "1h 45m",
        questionsAnswered: 22,
        score: 89,
        details: {
          correctAnswers: 20,
          wrongAnswers: 2,
          topicPerformance: [
            { topic: "Budgeting", score: 90 },
            { topic: "Savings", score: 85 },
            { topic: "Investment", score: 92 },
          ],
        },
      },
      {
        id: "s15",
        name: "Finn Mulder",
        timeSpent: "1h 30m",
        questionsAnswered: 21,
        score: 81,
        details: {
          correctAnswers: 17,
          wrongAnswers: 4,
          topicPerformance: [
            { topic: "Budgeting", score: 80 },
            { topic: "Savings", score: 85 },
            { topic: "Investment", score: 78 },
          ],
        },
      },
    ],
  },
];

export default function ClassHistory() {
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Graph data transformation
  const getGraphData = (classData: ClassData) => {
    return classData.students.map((student) => ({
      name: student.name,
      score: student.score,
      questionsAnswered: student.questionsAnswered,
    }));
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Klassengeschiedenis</h1>
        <p className="text-gray-600">
          Bekijk de resultaten van afgeronde klassen en studentenprestaties.
        </p>
      </div>

      {!selectedClass ? (
        <>
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Totaal Klassen</CardTitle>
                <CardDescription>Afgeronde sessies</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{mockClasses.length}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Totaal Studenten</CardTitle>
                <CardDescription>Alle sessies</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {mockClasses.reduce((sum, c) => sum + c.participants, 0)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gemiddelde Score</CardTitle>
                <CardDescription>Alle sessies</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {Math.round(
                    mockClasses.reduce((sum, c) => sum + c.averageScore, 0) /
                      mockClasses.length
                  )}
                  %
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Classes List */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Afgeronde Klassen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockClasses.map((classItem) => (
                <Card
                  key={classItem.id}
                  className="hover:bg-accent/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedClass(classItem)}
                >
                  <CardHeader>
                    <CardTitle>{classItem.name}</CardTitle>
                    <CardDescription>Datum: {classItem.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p>Gemiddelde score: {classItem.averageScore}%</p>
                      <p>{classItem.participants} studenten</p>
                      <p>Duur: {classItem.totalTime}</p>
                      <Button className="w-full">Details Bekijken</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-6">
          <Button
            variant="outline"
            onClick={() => setSelectedClass(null)}
            className="mb-2"
          >
            Terug naar overzicht
          </Button>

          <div className="grid grid-cols-4 lg:grid-cols-2 gap-6">
            {/* Left side - Student List */}
            <Card>
              <CardHeader>
                <CardTitle>Studenten</CardTitle>
                <CardDescription>
                  {selectedClass.participants} deelnemers | Gemiddelde score:{" "}
                  {selectedClass.averageScore}%
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-2">
                    {selectedClass.students.map((student) => (
                      <Button
                        key={student.id}
                        variant="outline"
                        className="w-full justify-start p-6"
                        onClick={() => setSelectedStudent(student)}
                      >
                        <div className="text-left w-full">
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Score: {student.score}% | Tijd: {student.timeSpent}
                          </p>
                        </div>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Right side - Graph */}
            <Card>
              <CardHeader>
                <CardTitle>Klasprestatieoverzicht</CardTitle>
                <CardDescription>
                  Score en beantwoorde vragen per student
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[600px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={getGraphData(selectedClass)}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="var(--chart-1)"
                        name="Score"
                      />
                      <Line
                        type="monotone"
                        dataKey="questionsAnswered"
                        stroke="var(--chart-2)"
                        name="Vragen beantwoord"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Student Details Modal */}
      <Dialog
        open={!!selectedStudent}
        onOpenChange={() => setSelectedStudent(null)}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Bestede tijd</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">
                      {selectedStudent.timeSpent}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Vragen beantwoord</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">
                      {selectedStudent.questionsAnswered}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">
                      {selectedStudent.score}%
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Correcte antwoorden
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">
                      {selectedStudent.details.correctAnswers}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Prestaties per onderwerp</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedStudent.details.topicPerformance.map((topic) => (
                      <div
                        key={topic.topic}
                        className="flex justify-between items-center"
                      >
                        <span className="text-muted-foreground">
                          {topic.topic}
                        </span>
                        <span className="font-medium">{topic.score}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}