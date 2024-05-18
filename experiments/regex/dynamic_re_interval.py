import re

# The idea is to use the negation of inclusive over with the upper_bound get the result froms that matching the string,
# then using inclusive over with the lower_bound to get the result from the previous string.


# Todo handle negative numbers and floats 💀
# For negative numbers one could use the inclusive over for larger negative values, simply put - in front of re
# created from the absolute value of the number (lower/upper bound).

def generate_regex_from_lower_bound(lower_bound):
    pattern = "(("
    current_factor = 0
    num_len = len(str(lower_bound))
    lower_bound_str = str(lower_bound)
    round_numbers_pattern = "|("
    overflow = True if lower_bound_str[0] == "9" else False
    sum = int(lower_bound_str[0]) if overflow else int(lower_bound_str[0]) + 1
    round_numbers_pattern += "[1-9][0-9]" if overflow else "[{}-9]".format(sum) 

    for digit in lower_bound_str:
        digit = int(digit)
        digit_diff = 9 - int(digit)
        upper_range_in_factor = (digit+digit_diff)
        if current_factor == 0:
            pattern += "[{}-{}]".format(digit, upper_range_in_factor)
        else:
            pattern += "[{}-9]".format(digit, upper_range_in_factor)
            round_numbers_pattern += "[0-9]"
        current_factor += 1
    round_numbers_pattern += ")"
    pattern += ")"

    larger_part = ""
    for i in range(num_len):
        if i == 0:
            larger_part += "|([1-9]"
        larger_part += "[0-9]"
    larger_part += "+"
    larger_part += "))(\.\d+)?"

    full_pattern = f"{"(?<!\.)" + pattern + round_numbers_pattern + larger_part}"

    
    full_pattern = r'' + full_pattern
    return full_pattern


def generate_interval_regex(lower_bound, upper_bound):
    upper_bound_str = r"(?!(" + generate_regex_from_lower_bound(upper_bound) + "))"
    lower_bound_str = r"" + generate_regex_from_lower_bound(lower_bound)
    combined_regex = upper_bound_str + "" + lower_bound_str
    return combined_regex
# Test cases

#Inclusive over for the lower bound up to the upper bound. [lower_bound - upper_bound)
def find_matches_in_interval(lower_bound, upper_bound, logfile):
    #What we want
    # Speed=(?!((?<!\.)(([1-9][9-9][9-9])|([2-9][0-9][0-9])|([1-9][0-9][0-9][0-9]+))(\.\d+)?))
    #       (?<!\.)(([1-9][0-9][0-9])|([2-9][0-9][0-9])|([1-9][0-9][0-9][0-9]+))(\.\d+)?

    # Speed=(?!((?<!\.)(([1-9][9-9][9-9])|([2-9][0-9][0-9])|([1-9][0-9][0-9][0-9]+))(\.\d+)?))(?<!\.)(([1-9][0-9][0-9])|([2-9][0-9][0-9])|([1-9][0-9][0-9][0-9]+))(\.\d\+)?)
    
    upper_bound_str = r"(?!(" + generate_regex_from_lower_bound(upper_bound) + "))"
    under_regex = re.compile(upper_bound_str)
    matches = []

    for line in logfile:
        match = under_regex.match(line)
        if match:
            matches.append(line)

    lower_bound_str = r"" + generate_regex_from_lower_bound(lower_bound)
    above_regex = re.compile(lower_bound_str)

    final_matches = []
    for i in range(len(matches)):
        match = above_regex.match(matches[i])
        if match:
            final_matches.append(matches[i])


    combined_regex = upper_bound_str + "" + lower_bound_str
    combined_re = re.compile(combined_regex)
    combined_matches = []
    for line in logfile:
        match = combined_re.match(line)
        if match:
            combined_matches.append(line)
    return final_matches

def test_generate_regex_from_interval():
    # logfile = ("1.5")
    # regex_1_2 = find_matches_in_interval(1, 2, logfile)
    # Test with interval 100-199
    logfile = ["101", "101.1232", "100.123", "99.23", "100", "200", "300", "301", "299",  "199", "999", "99", "0", "15", "1000", "-1", "-100", "-1000", "-10000", "10000", "75.5234", "10.52"]
    regex_100_199 = find_matches_in_interval(100, 199, logfile)
    assert "101" in regex_100_199
    assert "100" in regex_100_199

    logfile = ["1001", "1400", "1500", "1000", "1000.12323", "999.23", "10.2", "-123.23", "-123",  "2000"]
    regex_1000_2000 = find_matches_in_interval(1000, 2000, logfile)
    assert "1001" in regex_1000_2000
    assert "1000.12323" in regex_1000_2000
    assert "1400" in regex_1000_2000
    assert "1500" in regex_1000_2000
    assert not "2000" in regex_1000_2000
    assert not "10.2" in regex_1000_2000
    assert not "-123.23" in regex_1000_2000
    assert not "-123" in regex_1000_2000
    assert "1000" in regex_1000_2000
    
    # Test with interval 5000-5999
    print("All tests passed successfully.")

# Run the tests
test_generate_regex_from_interval()
