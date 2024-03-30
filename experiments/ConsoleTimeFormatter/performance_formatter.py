import pyperclip

data = """LogSearcher.ts:33 findZones: 7.367919921875 ms
14:24:52.940 LogSearcher.ts:33 findZones: 6.8291015625 ms
14:24:53.243 LogSearcher.ts:33 findZones: 6.880859375 ms
14:24:53.475 LogSearcher.ts:33 findZones: 6.157958984375 ms
14:24:53.710 LogSearcher.ts:33 findZones: 8.06689453125 ms
14:24:53.980 LogSearcher.ts:33 findZones: 6.14794921875 ms
14:24:54.183 LogSearcher.ts:33 findZones: 6.091064453125 ms
14:24:54.418 LogSearcher.ts:33 findZones: 6.205810546875 ms
14:24:54.648 LogSearcher.ts:33 findZones: 6.443115234375 ms
14:24:54.906 LogSearcher.ts:33 findZones: 6.302001953125 ms
14:24:55.223 LogSearcher.ts:33 findZones: 7.56591796875 ms
14:24:55.511 LogSearcher.ts:33 findZones: 6.35205078125 ms
14:24:55.811 LogSearcher.ts:33 findZones: 7.14794921875 ms
14:24:56.115 LogSearcher.ts:33 findZones: 6.8349609375 ms
14:24:56.386 LogSearcher.ts:33 findZones: 6.575927734375 ms
14:24:56.640 LogSearcher.ts:33 findZones: 6.013916015625 ms
14:24:56.826 LogSearcher.ts:33 findZones: 7.9169921875 ms
14:24:57.008 LogSearcher.ts:33 findZones: 6.589111328125 ms
14:24:57.202 LogSearcher.ts:33 findZones: 7.76416015625 ms
14:24:57.393 LogSearcher.ts:33 findZones: 5.944091796875 ms
14:24:57.623 LogSearcher.ts:33 findZones: 6.39892578125 ms
14:24:57.795 LogSearcher.ts:33 findZones: 6.882080078125 ms
14:24:57.933 LogSearcher.ts:33 findZones: 7.30908203125 ms
14:24:58.111 LogSearcher.ts:33 findZones: 6.196044921875 ms
14:24:58.310 LogSearcher.ts:33 findZones: 6.0498046875 ms
14:24:58.505 LogSearcher.ts:33 findZones: 6.122802734375 ms
14:24:58.698 LogSearcher.ts:33 findZones: 6.59716796875 ms
14:24:58.915 LogSearcher.ts:33 findZones: 6.168212890625 ms
14:24:59.070 LogSearcher.ts:33 findZones: 6.283203125 ms
14:24:59.275 LogSearcher.ts:33 findZones: 6.22607421875 ms
14:24:59.501 LogSearcher.ts:33 findZones: 5.767822265625 ms
14:24:59.712 LogSearcher.ts:33 findZones: 6.080078125 ms
14:24:59.902 LogSearcher.ts:33 findZones: 6.3759765625 ms
14:25:00.090 LogSearcher.ts:33 findZones: 9.52294921875 ms
14:25:00.287 LogSearcher.ts:33 findZones: 7.421142578125 ms
14:25:00.491 LogSearcher.ts:33 findZones: 7.280029296875 ms
14:25:00.661 LogSearcher.ts:33 findZones: 6.767822265625 ms
14:25:00.847 LogSearcher.ts:33 findZones: 6.737060546875 ms
14:25:01.006 LogSearcher.ts:33 findZones: 7.554931640625 ms
14:25:01.210 LogSearcher.ts:33 findZones: 6.14599609375 ms
14:25:01.331 LogSearcher.ts:33 findZones: 6.02978515625 ms
14:25:01.526 LogSearcher.ts:33 findZones: 10.028076171875 ms
14:25:01.674 LogSearcher.ts:33 findZones: 6.14501953125 ms
14:25:01.837 LogSearcher.ts:33 findZones: 6.326904296875 ms
14:25:03.261 LogSearcher.ts:33 findZones: 6.966064453125 ms
14:25:03.389 LogSearcher.ts:33 findZones: 7.6669921875 ms
14:25:03.598 LogSearcher.ts:33 findZones: 6.880859375 ms
14:25:03.791 LogSearcher.ts:33 findZones: 6.947998046875 ms
14:25:03.991 LogSearcher.ts:33 findZones: 7.1240234375 ms
14:25:04.167 LogSearcher.ts:33 findZones: 6.881103515625 ms
14:25:04.306 LogSearcher.ts:33 findZones: 7.458984375 ms
14:25:04.485 LogSearcher.ts:33 findZones: 7.68017578125 ms
14:25:04.631 LogSearcher.ts:33 findZones: 7.2060546875 ms
14:25:04.805 LogSearcher.ts:33 findZones: 6.158203125 ms
14:25:04.999 LogSearcher.ts:33 findZones: 8.10791015625 ms
14:25:05.174 LogSearcher.ts:33 findZones: 7.009765625 ms
14:25:05.394 LogSearcher.ts:33 findZones: 6.971923828125 ms
14:25:05.506 LogSearcher.ts:33 findZones: 8.9921875 ms
14:25:05.691 LogSearcher.ts:33 findZones: 6.871826171875 ms"""

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
