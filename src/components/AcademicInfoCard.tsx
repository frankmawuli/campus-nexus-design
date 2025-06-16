
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, User, Calendar } from "lucide-react";

interface AcademicInfoCardProps {
  studentData: {
    studentId: string;
    program: string;
    year: string;
    gpa: string;
  };
}

const AcademicInfoCard = ({ studentData }: AcademicInfoCardProps) => {
  const academicInfo = [
    { label: "Student ID", value: studentData.studentId, icon: User },
    { label: "Program", value: studentData.program, icon: BookOpen },
    { label: "Academic Year", value: studentData.year, icon: Calendar },
    { label: "Current GPA", value: studentData.gpa, icon: BookOpen }
  ];

  return (
    <Card className="shadow-md border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-600" />
          Academic Info
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {academicInfo.map((info, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <info.icon className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">{info.label}</span>
            </div>
            <Badge variant="secondary" className="font-mono">
              {info.value}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AcademicInfoCard;
