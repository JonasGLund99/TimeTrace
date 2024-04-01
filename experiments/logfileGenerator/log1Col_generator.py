import random
from datetime import datetime, timedelta

# Function to generate a random event
def generate_random_event():
    events = ['login', 'logout', 'delete', 'edited', 'updated']
    return random.choice(events)

# Function to generate a random time interval between events
def generate_random_interval():
    # Randomly generate milliseconds between 1 and 1000 (1 second)
    return random.randint(1, 1000)

# Function to generate log examples and write to a text file
def generate_log_examples(num_examples):
    log_content = ''
    timestamp = datetime(2024, 2, 26, 8, 22, 34, 645)  # Starting timestamp

    for _ in range(num_examples):
        event = generate_random_event()
        log_content += f"{timestamp.isoformat()}Z {event}\n"

        # Generate a random time interval and add it to the timestamp
        interval = timedelta(milliseconds=generate_random_interval())
        timestamp += interval

    with open('log1Col_20000.txt', 'w') as file:
        file.write(log_content)
    print("Log examples generated and written to log")

# Generate 10 log examples with random events and timestamps
generate_log_examples(1000000)
