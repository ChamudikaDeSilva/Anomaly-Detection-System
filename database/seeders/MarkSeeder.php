<?php

namespace Database\Seeders;

use App\Models\Mark;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MarkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $students = Student::all();
        $subjects = Subject::all();
        $teachers = Teacher::all();

        foreach ($students as $student) {
            foreach ($subjects as $subject) {
                Mark::create([
                    'student_id' => $student->id,
                    'subject_id' => $subject->id,
                    'teacher_id' => $teachers->random()->id,
                    'marks' => rand(30, 100)
                ]);
            }
        }
    }
}
