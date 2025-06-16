
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Clock, User, Users, Search, Filter, CheckCircle, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const CourseEnrollment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');

  const enrolledCourses = [
    {
      id: "CS301",
      name: "Data Structures and Algorithms",
      instructor: "Dr. Sarah Johnson",
      credits: 4,
      schedule: "MWF 10:00-11:00 AM",
      room: "CS Building 201",
      progress: 75,
      grade: "A-"
    },
    {
      id: "CS302",
      name: "Database Systems",
      instructor: "Prof. Michael Chen",
      credits: 3,
      schedule: "TTh 2:00-3:30 PM",
      room: "CS Building 305",
      progress: 60,
      grade: "B+"
    },
    {
      id: "MATH201",
      name: "Discrete Mathematics",
      instructor: "Dr. Emily Rodriguez",
      credits: 3,
      schedule: "MWF 1:00-2:00 PM",
      room: "Math Building 101",
      progress: 85,
      grade: "A"
    }
  ];

  const availableCourses = [
    {
      id: "CS401",
      name: "Machine Learning",
      instructor: "Dr. Alex Kumar",
      credits: 4,
      schedule: "MWF 9:00-10:00 AM",
      room: "CS Building 401",
      enrolled: 45,
      capacity: 50,
      department: "Computer Science",
      semester: "Fall 2024",
      prerequisites: ["CS301", "MATH201"],
      description: "Introduction to machine learning algorithms and applications."
    },
    {
      id: "CS402",
      name: "Software Engineering",
      instructor: "Prof. Lisa Wang",
      credits: 3,
      schedule: "TTh 11:00-12:30 PM",
      room: "CS Building 302",
      enrolled: 38,
      capacity: 40,
      department: "Computer Science",
      semester: "Fall 2024",
      prerequisites: ["CS301"],
      description: "Principles and practices of software development."
    },
    {
      id: "CS403",
      name: "Computer Networks",
      instructor: "Dr. Robert Brown",
      credits: 3,
      schedule: "MWF 2:00-3:00 PM",
      room: "CS Building 203",
      enrolled: 25,
      capacity: 35,
      department: "Computer Science",
      semester: "Fall 2024",
      prerequisites: ["CS201"],
      description: "Fundamentals of computer networking and protocols."
    },
    {
      id: "MATH301",
      name: "Linear Algebra",
      instructor: "Dr. Jennifer Taylor",
      credits: 3,
      schedule: "TTh 9:00-10:30 AM",
      room: "Math Building 205",
      enrolled: 30,
      capacity: 45,
      department: "Mathematics",
      semester: "Fall 2024",
      prerequisites: ["MATH201"],
      description: "Vector spaces, matrices, and linear transformations."
    }
  ];

  const filteredCourses = availableCourses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || course.department === selectedDepartment;
    const matchesSemester = selectedSemester === 'all' || course.semester === selectedSemester;
    
    return matchesSearch && matchesDepartment && matchesSemester;
  });

  const handleEnroll = (courseId, courseName) => {
    toast({
      title: "Enrollment Successful",
      description: `You have successfully enrolled in ${courseName} (${courseId}).`,
    });
  };

  const handleDrop = (courseId, courseName) => {
    toast({
      title: "Course Dropped",
      description: `You have dropped ${courseName} (${courseId}).`,
      variant: "destructive",
    });
  };

  const getAvailabilityColor = (enrolled, capacity) => {
    const ratio = enrolled / capacity;
    if (ratio >= 0.9) return 'bg-red-500';
    if (ratio >= 0.7) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Course Enrollment</h2>
          <p className="text-gray-600">Browse available courses and manage your enrollment</p>
        </div>
        <Badge variant="secondary" className="text-blue-600">
          Fall 2024 Registration Open
        </Badge>
      </div>

      <Tabs defaultValue="available" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-white rounded-lg shadow-sm">
          <TabsTrigger value="available" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Available Courses
          </TabsTrigger>
          <TabsTrigger value="enrolled" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            My Courses
          </TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-6">
          {/* Search and Filters */}
          <Card className="shadow-md border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-blue-600" />
                Search & Filter Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search Courses</label>
                  <Input
                    placeholder="Search by course name, ID, or instructor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Department</label>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Semester</label>
                  <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Semesters</SelectItem>
                      <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                      <SelectItem value="Spring 2025">Spring 2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Courses */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="shadow-md border-0 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{course.name}</CardTitle>
                      <CardDescription className="font-mono text-blue-600">
                        {course.id} • {course.credits} Credits
                      </CardDescription>
                    </div>
                    <Badge className={getAvailabilityColor(course.enrolled, course.capacity)}>
                      {course.enrolled}/{course.capacity}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="h-4 w-4" />
                      {course.instructor}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {course.schedule}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Book className="h-4 w-4" />
                      {course.room}
                    </div>
                  </div>

                  <p className="text-sm text-gray-700">{course.description}</p>

                  {course.prerequisites.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Prerequisites:</p>
                      <div className="flex flex-wrap gap-1">
                        {course.prerequisites.map((prereq) => (
                          <Badge key={prereq} variant="outline" className="text-xs">
                            {prereq}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleEnroll(course.id, course.name)}
                    disabled={course.enrolled >= course.capacity}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {course.enrolled >= course.capacity ? 'Course Full' : 'Enroll Now'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="enrolled" className="space-y-6">
          <Card className="shadow-md border-0">
            <CardHeader>
              <CardTitle>Enrolled Courses - Fall 2024</CardTitle>
              <CardDescription>
                You are currently enrolled in {enrolledCourses.length} courses ({enrolledCourses.reduce((sum, course) => sum + course.credits, 0)} total credits)
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {enrolledCourses.map((course) => (
              <Card key={course.id} className="shadow-md border-0">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{course.name}</CardTitle>
                      <CardDescription className="font-mono text-blue-600">
                        {course.id} • {course.credits} Credits
                      </CardDescription>
                    </div>
                    <Badge className="bg-green-500">
                      Enrolled
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="h-4 w-4" />
                      {course.instructor}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {course.schedule}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Book className="h-4 w-4" />
                      {course.room}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Course Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Current Grade:</span>
                      <Badge variant="outline" className="font-bold">
                        {course.grade}
                      </Badge>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDrop(course.id, course.name)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Drop Course
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseEnrollment;
