<?php

namespace Database\Seeders;

use App\Models\Subject;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $subjects = ['Math', 'Science', 'History', 'Geography', 'English'];
        foreach ($subjects as $subject) {
            Subject::create(['name' => $subject]);
        }
    }
}
