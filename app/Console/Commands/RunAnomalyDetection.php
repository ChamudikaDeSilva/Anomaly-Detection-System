<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;
use Illuminate\Support\Facades\Storage;

class RunAnomalyDetection extends Command
{
    protected $signature = 'detect:anomalies';
    protected $description = 'Run the Python anomaly detection script';

    public function handle()
    {
        // Path to the virtual environment activate script
        $activateScript = base_path('venv/Scripts/activate'); // Adjust for Windows

        // Path to the Python interpreter inside the virtual environment
        $python = base_path('venv/Scripts/python.exe'); // Adjust for Windows

        // Path to the anomaly detection Python script
        $scriptPath = base_path('anomaly_detection.py');

        // Create a new Symfony process to activate venv and run the Python script
        $process = Process::fromShellCommandline("cmd /c \"{$activateScript} && {$python} {$scriptPath}\"");

        try {
            // Run the process
            $process->mustRun();

            // Get output from the Python script
            $output = $process->getOutput();

            // Log Python script output
            $this->info('Python script output:');
            $this->line($output); // Print output line by line

            // Handle JSON output from the Python script
            $anomalous_students = json_decode($output, true);

            if ($anomalous_students === null) {
                $this->error('Failed to decode JSON output.');
                return 1;
            }

            // Save anomalies to a JSON file for further use
            Storage::put('anomalous_students.json', json_encode($anomalous_students));

            $this->info('Anomaly detection script ran successfully.');
            return 0;

        } catch (ProcessFailedException $exception) {
            $this->error('An error occurred while running the script.');
            $this->error($exception->getMessage());
            return 1;
        }
    }
}
