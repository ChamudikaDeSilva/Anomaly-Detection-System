<?php

namespace App\Http\Controllers;

use App\Models\Mark;
use App\Models\Student;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class StudentController extends Controller
{

   // Run the anomaly detection script
   public function runAnomalyDetection()
   {
       Artisan::call('detect:anomalies');
       return response()->json(['message' => 'Anomaly detection script ran successfully.']);
   }

   public function index()
   {
       // Read the JSON file
       $json = Storage::get('anomalous_students.json');
       $anomalous_students = json_decode($json, true);

       // Log the data to Laravel's default log file
       Log::info('Anomalous students data retrieved:', ['anomalous_students' => $anomalous_students]);

       // Initialize an array to store complete student data with all marks
       $students_data = [];

       foreach ($anomalous_students as $anomalous_student) {
           // Get student_id from anomalous student data
           $student_id = $anomalous_student['student_id'];

           // Retrieve all marks for the student from the database excluding the anomalous mark
           $student_marks = Mark::where('student_id', $student_id)
                                ->where('id', '!=', $anomalous_student['id'])
                                ->get();

           // Map the results to format the data as needed
           $all_marks = $student_marks->map(function ($mark) {
               return [
                   'id' => $mark->id,
                   'student_id' => $mark->student_id,
                   'subject_id' => $mark->subject_id,
                   'teacher_id' => $mark->teacher_id,
                   'marks' => $mark->marks,
                   'created_at' => $mark->created_at,
                   'updated_at' => $mark->updated_at,
               ];
           });

           // Prepare data to return including all marks and the anomalous mark separately
           $student_data = [
               'student_id' => $student_id,
               'anomalous_mark' => [
                   'marks_id' => $anomalous_student['id'],
                   'subject_id' => $anomalous_student['subject_id'],
                   'marks_original' => $anomalous_student['marks_original'],
                   'teacher_id' => $anomalous_student['teacher_id'],
                   // Add any other relevant fields from anomalous_student here
               ],
               'all_marks' => $all_marks->toArray(),
           ];

           // Push the student data to the array
           $students_data[] = $student_data;

           Log::info(' All students data retrieved:', ['students_data' => $students_data]);
       }

       return response()->json($students_data);
   }





}
