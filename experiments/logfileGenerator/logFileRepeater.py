from datetime import datetime, timedelta
import os
CURRENT_DIR = os.getcwd()
FILE_TO_COPY = CURRENT_DIR + "/experiments/logfiles/log1Col_1000000.txt"
OUTPUT_FILENAME = CURRENT_DIR + '/experiments/logfiles/log1Col_10000000.txt'

def update_timestamp(line, last_timestamp):
    timestamp_str, event = line.split(' ', 1)
    new_timestamp = last_timestamp + timedelta(seconds=1)
    # Truncate milliseconds and append 'Z' for UTC timezone
    return new_timestamp, f"{new_timestamp.replace(microsecond=0).replace(tzinfo=None).isoformat()}.666Z {event}"


def repeat_log_lines(lines, num_repeats):
    repeated_lines = lines.copy()
    repeated_lines[-1] += '\n'  # Ensure last line ends with a newline character
    last_timestamp_str, event = repeated_lines[-1].split(' ', 1)
    last_timestamp = datetime.fromisoformat(last_timestamp_str)
    for _ in range(num_repeats):
        for line in lines:
            if not line.endswith('\n'):
                line += '\n'
            last_timestamp, new_line = update_timestamp(line, last_timestamp)
            repeated_lines.append(new_line)
    return repeated_lines

def read_file_lines(filename):
    lines = []
    try:
        with open(filename, 'r') as file:
            lines = file.readlines()
    except FileNotFoundError:
        print(f"File '{filename}' not found.")
    return lines

def write_file_lines(filename, lines):
    try:
        with open(filename, 'w') as file:
            file.writelines(lines)
    except FileNotFoundError:
        print(f"File '{filename}' not found.")

if __name__ == '__main__':
    lines = read_file_lines(FILE_TO_COPY)
    repeated_lines = repeat_log_lines(lines, num_repeats=9)  # Change num_repeats as needed
    write_file_lines(OUTPUT_FILENAME, repeated_lines)
    print(f"Repeated lines written to {OUTPUT_FILENAME}.")
