export interface CoursePayload {
  courseErrors: string[];
  course: Course[];
}

export interface Course {
  id: number;
  semesterNumber: number;
  name: string;
  proffessorName: string;
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  progress: string;
  grade: number;
  difficulty: string;
  semesterColor: string;
  userId: number;
}

export interface CourseFile {
  id: number;
  name: string;
  fileUrl: string;
  userId: number;
}

export interface TodoPayload {
  todoErrors: string[];
  todo: Todo[];
}

export interface Todo {
  id: number;
  name: string;
  dueDate: string;
  progress: string;
  priority: string;
  remarks: string;
  courseId: number;
  userId: number;
}

export interface ContactPayload {
  contactErrors: string[];
  contacts: Contact[];
}

export interface Contact {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  birthDate: string;
  userId: number;
}
