
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Book, Mail, Phone, Users, Calendar, Plus, Edit, GraduationCap, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const TAAssignment = () => {
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedTA, setSelectedTA] = useState('');

  const teachingAssistants = [
    {
      id: "TA001",
      name: "Alex Thompson",
      email: "alex.thompson@student.university.edu",
      phone: "+1 (555) 111-2222",
      year: "PhD - 2nd Year",
      department: "Computer Science",
      gpa: "3.9",
      experience: "2 semesters",
      skills: ["Python", "Java", "Data Structures"],
      status: "Available",
      courses: ["CS301"],
      maxCourses: 2,
      hoursPerWeek: 15
    },
    {
      id: "TA002",
      name: "Maria Garcia",
      email: "maria.garcia@student.university.edu",
      phone: "+1 (555) 222-3333",
      year: "Masters - 1st Year",
      department: "Computer Science",
      gpa: "3.8",
      experience: "1 semester",
      skills: ["Database Systems", "SQL", "Web Development"],
      status: "Available",
      courses: [],
      maxCourses: 1,
      hoursPerWeek: 10
    },
    {
      id: "TA003",
      name: "David Kim",
      email: "david.kim@student.university.edu",
      phone: "+1 (555) 333-4444",
      year: "PhD - 3rd Year",
      department: "Mathematics",
      gpa: "4.0",
      experience: "4 semesters",
      skills: ["Linear Algebra", "Discrete Math", "Statistics"],
      status: "Available",
      courses: ["MATH201", "MATH301"],
      maxCourses: 2,
      hoursPerWeek: 20
    },
    {
      id: "TA004",
      name: "Sarah Wilson",
      email: "sarah.wilson@student.university.edu",
      phone: "+1 (555) 444-5555",
      year: "Masters - 2nd Year",
      department: "Computer Science",
      gpa: "3.85",
      experience: "3 semesters",
      skills: ["Machine Learning", "Python", "Research Methods"],
      status: "Busy",
      courses: ["CS401", "CS402"],
      maxCourses: 2,
      hoursPerWeek: 20
    }
  ];

  const coursesNeedingTAs = [
    {
      id: "CS301",
      name: "Data Structures and Algorithms",
      lecturer: "Dr. Sarah Johnson",
      students: 45,
      currentTAs: 1,
      requiredTAs: 2,
      schedule: "MWF 10:00-11:00 AM",
      labHours: "TTh 2:00-4:00 PM",
      status: "Needs TA"
    },
    {
      id: "CS302",
      name: "Database Systems",
      lecturer: "Prof. Michael Chen",
      students: 38,
      currentTAs: 0,
      requiredTAs: 1,
      schedule: "TTh 2:00-3:30 PM",
      labHours: "MWF 3:00-5:00 PM",
      status: "Urgent"
    },
    {
      id: "CS401",
      name: "Machine Learning",
      lecturer: "Dr. Alex Kumar",
      students: 30,
      currentTAs: 1,
      requiredTAs: 1,
      schedule: "MWF 9:00-10:00 AM",
      labHours: "TTh 10:00-12:00 PM",
      status: "Fully Staffed"
    },
    {
      id: "MATH301",
      name: "Linear Algebra",
      lecturer: "Dr. Jennifer Taylor",
      students: 35,
      currentTAs: 1,
      requiredTAs: 1,
      schedule: "TTh 9:00-10:30 AM",
      labHours: "MWF 1:00-3:00 PM",
      status: "Fully Staffed"
    }
  ];

  const handleAssignTA = () => {
    if (!selectedCourse || !selectedTA) {
      toast({
        title: "Assignment Failed",
        description: "Please select both a course and a teaching assistant.",
        variant: "destructive",
      });
      return;
    }

    const course = coursesNeedingTAs.find(c => c.id === selectedCourse);
    const ta = teachingAssistants.find(t => t.id === selectedTA);

    toast({
      title: "TA Assignment Successful",
      description: `${ta.name} has been assigned as TA for ${course.name} (${course.id}).`,
    });

    setIsAssignDialogOpen(false);
    setSelectedCourse('');
    setSelectedTA('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-green-500';
      case 'Busy':
        return 'bg-red-500';
      case 'Fully Staffed':
        return 'bg-blue-500';
      case 'Needs TA':
        return 'bg-yellow-500';
      case 'Urgent':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getWorkloadColor = (current, max) => {
    const ratio = current / max;
    if (ratio >= 1) return 'text-red-600';
    if (ratio >= 0.8) return 'text-yellow-600';
    return 'text-green-600';
  };

  const availableTAs = teachingAssistants.filter(ta => ta.courses.length < ta.maxCourses);
  const coursesNeedingStaff = coursesNeedingTAs.filter(course => course.currentTAs < course.requiredTAs);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Teaching Assistant Assignment</h2>
          <p className="text-gray-600">Manage TA assignments and course support</p>
        </div>
        <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Assign TA
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Assign Teaching Assistant</DialogTitle>
              <DialogDescription>
                Select a course and teaching assistant to create a new assignment.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {coursesNeedingStaff.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.id} - {course.name} (Needs {course.requiredTAs - course.currentTAs} TA{course.requiredTAs - course.currentTAs > 1 ? 's' : ''})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ta">Teaching Assistant</Label>
                <Select value={selectedTA} onValueChange={setSelectedTA}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a TA" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTAs.map((ta) => (
                      <SelectItem key={ta.id} value={ta.id}>
                        {ta.name} ({ta.year}) - {ta.maxCourses - ta.courses.length} slots available
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAssignTA} className="bg-blue-600 hover:bg-blue-700">
                Assign TA
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-md border-0 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total TAs</p>
                <p className="text-2xl font-bold text-blue-900">{teachingAssistants.length}</p>
              </div>
              <GraduationCap className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-0 bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Available TAs</p>
                <p className="text-2xl font-bold text-green-900">{availableTAs.length}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-0 bg-yellow-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Courses Needing TAs</p>
                <p className="text-2xl font-bold text-yellow-900">{coursesNeedingStaff.length}</p>
              </div>
              <Book className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-0 bg-purple-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Total Hours/Week</p>
                <p className="text-2xl font-bold text-purple-900">
                  {teachingAssistants.reduce((sum, ta) => sum + ta.hoursPerWeek, 0)}
                </p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Teaching Assistants */}
        <Card className="shadow-md border-0">
          <CardHeader>
            <CardTitle>Teaching Assistants</CardTitle>
            <CardDescription>Overview of all TAs and their current assignments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {teachingAssistants.map((ta) => (
              <div key={ta.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900">{ta.name}</h4>
                    <p className="text-sm text-gray-600">{ta.year} • {ta.department}</p>
                  </div>
                  <Badge className={getStatusColor(ta.status)}>
                    {ta.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="h-3 w-3" />
                    <span className="truncate">{ta.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-3 w-3" />
                    <span>{ta.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <GraduationCap className="h-3 w-3" />
                    <span>GPA: {ta.gpa}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-3 w-3" />
                    <span>{ta.experience}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Course Load</span>
                    <span className={`text-sm font-bold ${getWorkloadColor(ta.courses.length, ta.maxCourses)}`}>
                      {ta.courses.length}/{ta.maxCourses}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(ta.courses.length / ta.maxCourses) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Hours/Week: {ta.hoursPerWeek}</span>
                  <span className="text-gray-600">Experience: {ta.experience}</span>
                </div>

                {ta.courses.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Assigned Courses:</p>
                    <div className="flex flex-wrap gap-1">
                      {ta.courses.map((courseId) => (
                        <Badge key={courseId} variant="outline" className="text-xs">
                          {courseId}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {ta.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Courses */}
        <Card className="shadow-md border-0">
          <CardHeader>
            <CardTitle>Course TA Requirements</CardTitle>
            <CardDescription>Current TA assignments and staffing needs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {coursesNeedingTAs.map((course) => (
              <div key={course.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900">{course.name}</h4>
                    <p className="text-sm text-gray-600 font-mono">{course.id}</p>
                  </div>
                  <Badge className={getStatusColor(course.status)}>
                    {course.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="h-3 w-3" />
                    <span>Lecturer: {course.lecturer}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="h-3 w-3" />
                    <span>{course.students} Students</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-3 w-3" />
                    <span>{course.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-3 w-3" />
                    <span>Lab: {course.labHours}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">TA Staffing</span>
                    <span className={`text-sm font-bold ${course.currentTAs >= course.requiredTAs ? 'text-green-600' : 'text-red-600'}`}>
                      {course.currentTAs}/{course.requiredTAs}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        course.currentTAs >= course.requiredTAs ? 'bg-green-600' : 'bg-red-600'
                      }`}
                      style={{ width: `${(course.currentTAs / course.requiredTAs) * 100}%` }}
                    />
                  </div>
                </div>

                {course.currentTAs < course.requiredTAs && (
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedCourse(course.id);
                      setIsAssignDialogOpen(true);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Assign TA ({course.requiredTAs - course.currentTAs} needed)
                  </Button>
                )}

                {course.currentTAs >= course.requiredTAs && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Manage TAs
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TAAssignment;
