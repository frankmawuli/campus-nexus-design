
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Book, CreditCard, User, Users, Calendar, FileText } from "lucide-react";
import StudentInfo from "@/components/StudentInfo";
import FeePayments from "@/components/FeePayments";
import CourseEnrollment from "@/components/CourseEnrollment";
import LecturerAssignment from "@/components/LecturerAssignment";
import TAAssignment from "@/components/TAAssignment";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const features = [
    {
      icon: User,
      title: "Student Information",
      description: "Manage personal details and academic records",
      color: "bg-blue-500"
    },
    {
      icon: CreditCard,
      title: "Fee Payments",
      description: "Track and manage tuition and fee payments",
      color: "bg-green-500"
    },
    {
      icon: Book,
      title: "Course Enrollment",
      description: "Browse and enroll in available courses",
      color: "bg-purple-500"
    },
    {
      icon: Users,
      title: "Lecturer Assignment",
      description: "Assign lecturers to courses",
      color: "bg-orange-500"
    },
    {
      icon: Calendar,
      title: "TA Assignment",
      description: "Manage teaching assistant assignments",
      color: "bg-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Book className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Campus Nexus</h1>
                <p className="text-sm text-gray-600">Student Management System</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-blue-600">
              Academic Year 2024-25
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 bg-white rounded-lg shadow-sm p-1">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="student-info" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Student Info
            </TabsTrigger>
            <TabsTrigger value="fees" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Fee Payments
            </TabsTrigger>
            <TabsTrigger value="courses" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Courses
            </TabsTrigger>
            <TabsTrigger value="lecturers" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Lecturers
            </TabsTrigger>
            <TabsTrigger value="tas" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              TAs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-gray-900">
                Welcome to Campus Nexus
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Your comprehensive student management system for seamless academic administration
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="outline" 
                      className="w-full hover:bg-blue-50 hover:border-blue-300"
                      onClick={() => {
                        if (feature.title === "Student Information") setActiveTab("student-info");
                        else if (feature.title === "Fee Payments") setActiveTab("fees");
                        else if (feature.title === "Course Enrollment") setActiveTab("courses");
                        else if (feature.title === "Lecturer Assignment") setActiveTab("lecturers");
                        else if (feature.title === "TA Assignment") setActiveTab("tas");
                      }}
                    >
                      Access {feature.title}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="text-center p-6 bg-blue-50 border-blue-200">
                <div className="text-3xl font-bold text-blue-600">1,247</div>
                <div className="text-sm text-gray-600">Total Students</div>
              </Card>
              <Card className="text-center p-6 bg-green-50 border-green-200">
                <div className="text-3xl font-bold text-green-600">89</div>
                <div className="text-sm text-gray-600">Active Courses</div>
              </Card>
              <Card className="text-center p-6 bg-purple-50 border-purple-200">
                <div className="text-3xl font-bold text-purple-600">156</div>
                <div className="text-sm text-gray-600">Faculty Members</div>
              </Card>
              <Card className="text-center p-6 bg-orange-50 border-orange-200">
                <div className="text-3xl font-bold text-orange-600">98%</div>
                <div className="text-sm text-gray-600">Payment Rate</div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="student-info">
            <StudentInfo />
          </TabsContent>

          <TabsContent value="fees">
            <FeePayments />
          </TabsContent>

          <TabsContent value="courses">
            <CourseEnrollment />
          </TabsContent>

          <TabsContent value="lecturers">
            <LecturerAssignment />
          </TabsContent>

          <TabsContent value="tas">
            <TAAssignment />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
