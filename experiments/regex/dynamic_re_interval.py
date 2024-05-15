import re

def generate_regex_from_lower_bound(lower_bound):
    # Constructing the regex pattern dynamically based on the interval
    pattern = "(("
    current_factor = 0
    num_len = len(str(lower_bound))
    lower_bound_str = str(lower_bound)
    for digit in lower_bound_str:
        digit = int(digit)
        digit_diff = 9 - int(digit)
        upper_range_in_factor = (digit+digit_diff)
        if current_factor == 0:
            pattern += "[{}-{}]".format(digit, upper_range_in_factor)
        else:
            if current_factor == num_len -1:
                pattern += "[{}-9]".format(digit+1, upper_range_in_factor)
            else:
                pattern += "[{}-9]".format(digit, upper_range_in_factor)
        current_factor += 1
    pattern += ")"

    larger_part = ""
    for i in range(num_len):
        if i == 0:
            larger_part += "|([1-9]"
        larger_part += "[0-9]"
    larger_part += "))(\.\d+)?"

    full_pattern = f"{pattern + larger_part}$"

    full_pattern = r'^' + full_pattern
    
    # Creating the regex object
    regex = re.compile(full_pattern)

    return regex

# Example usage:
regex = generate_regex_from_lower_bound(83)

# Test the regex
test_number = "85"
if regex.match(test_number):
    print(f"{test_number} is larger and thus allowed")
else:
    print(f"{test_number} is not larger and thus allowed")
