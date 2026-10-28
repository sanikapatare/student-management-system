
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Student {
  id: number;
  name: string;
  marks: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  studentName = '';
  studentMarks: number | null = null;
  searchText = '';

  editingId: number | null = null;

  students: Student[] = [
    { id: 1, name: 'Rahul', marks: 78 },
    { id: 2, name: 'Priya', marks: 92 },
    { id: 3, name: 'Aman', marks: 67 },
    { id: 4, name: 'Neha', marks: 82 },
    { id: 5, name: 'Tanuja', marks: 15 }
  ];

  nextId = 6;

  get totalStudents(): number {
    return this.students.length;
  }

  get classAverage(): string {
    if (this.students.length === 0) {
      return '0.00';
    }

    const total = this.students.reduce(
      (sum, student) => sum + student.marks,
      0
    );

    return (total / this.students.length).toFixed(2);
  }

  get filteredStudents(): Student[] {
    const search = this.searchText.trim().toLowerCase();

    return this.students.filter(student =>
      student.name.toLowerCase().includes(search)
    );
  }

  getResult(marks: number): string {
    return marks >= 35 ? 'Pass' : 'Fail';
  }

  getGrade(marks: number): string {
    if (marks >= 90) return 'A+';
    if (marks >= 85) return 'A';
    if (marks >= 80) return 'A-';
    if (marks >= 70) return 'B+';
    if (marks >= 60) return 'B';
    if (marks >= 50) return 'C';
    if (marks >= 35) return 'D';
    return 'F';
  }

  addStudent(): void {
    const name = this.studentName.trim();
    const marks = this.studentMarks;

    if (!name) {
      alert('Please enter student name.');
      return;
    }

    if (
      marks === null ||
      !Number.isFinite(marks) ||
      marks < 0 ||
      marks > 100
    ) {
      alert('Please enter marks between 0 and 100.');
      return;
    }

    if (this.editingId !== null) {
      this.students = this.students.map(student =>
        student.id === this.editingId
          ? { ...student, name, marks }
          : student
      );

      this.cancelEdit();
      return;
    }

    this.students.push({
      id: this.nextId++,
      name,
      marks
    });

    this.studentName = '';
    this.studentMarks = null;
  }

  editStudent(student: Student): void {
    this.editingId = student.id;
    this.studentName = student.name;
    this.studentMarks = student.marks;
  }

  cancelEdit(): void {
    this.editingId = null;
    this.studentName = '';
    this.studentMarks = null;
  }

  deleteStudent(id: number): void {
    this.students = this.students.filter(
      student => student.id !== id
    );

    if (this.editingId === id) {
      this.cancelEdit();
    }
  }
}
