import pyperclip

data = """LogSearcher.ts:26 findZones: 49.0419921875 ms
LogSearcher.ts:26 findZones: 52.2509765625 ms
LogSearcher.ts:26 findZones: 48.408935546875 ms
LogSearcher.ts:26 findZones: 66.0400390625 ms
LogSearcher.ts:26 findZones: 47.703125 ms
LogSearcher.ts:26 findZones: 53.2890625 ms
LogSearcher.ts:26 findZones: 50.833984375 ms
LogSearcher.ts:26 findZones: 49.114013671875 ms
LogSearcher.ts:26 findZones: 65.555908203125 ms
LogSearcher.ts:26 findZones: 53.649169921875 ms
LogSearcher.ts:26 findZones: 53.212158203125 ms
LogSearcher.ts:26 findZones: 57.968994140625 ms
LogSearcher.ts:26 findZones: 56.39599609375 ms
LogSearcher.ts:26 findZones: 47.22900390625 ms
LogSearcher.ts:26 findZones: 50.443115234375 ms
LogSearcher.ts:26 findZones: 50.156005859375 ms
LogSearcher.ts:26 findZones: 52.9580078125 ms
LogSearcher.ts:26 findZones: 56.614990234375 ms
LogSearcher.ts:26 findZones: 54.553955078125 ms
LogSearcher.ts:26 findZones: 52.781005859375 ms
LogSearcher.ts:26 findZones: 52.114990234375 ms
LogSearcher.ts:26 findZones: 59.929931640625 ms
LogSearcher.ts:26 findZones: 50.4189453125 ms
LogSearcher.ts:26 findZones: 59.618896484375 ms
LogSearcher.ts:26 findZones: 54.06103515625 ms"""

lines = data.split('\n')

table = "| Run Time (ms) |\n|---------------|\n"
total_runtime = 0
count = 0

for line in lines:
    parts = line.split(' ')
    runtime = float(parts[-2])
    total_runtime += runtime
    count += 1
    table += f"| {runtime} |\n"

average_runtime = total_runtime / count
table += f"\nAverage Run Time: {average_runtime} ms\n"

# Copy the table to clipboard
pyperclip.copy(table)

print("Table copied to clipboard:")
print(table)
