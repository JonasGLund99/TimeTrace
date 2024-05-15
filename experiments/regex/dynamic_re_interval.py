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
    for digit in lower_bound_str:
        digit = int(digit)
        digit_diff = 9 - int(digit)
        upper_range_in_factor = (digit+digit_diff)
        if current_factor == 0:
            pattern += "[{}-{}]".format(digit, upper_range_in_factor)
        else:
            if current_factor == num_len -1:
                pattern += "[{}-9]".format(digit if digit == 9 else digit+1, upper_range_in_factor)
            else:
                pattern += "[{}-9]".format(digit, upper_range_in_factor)
        current_factor += 1
    pattern += ")"

    larger_part = ""
    for i in range(num_len):
        if i == 0:
            larger_part += "|([1-9]"
        larger_part += "[0-9]"
    larger_part += "+"
    larger_part += "))(\.\d\+)?"

    full_pattern = f"{pattern + larger_part}$"

    full_pattern = r'' + full_pattern
    
    # Creating the regex object
    regex = re.compile(full_pattern)

    return regex


def generate_regex_from_interval(lower_bound, upper_bound):
    upper_bound_str = generate_regex_from_lower_bound(upper_bound)

    return regex

# Test cases
def test_generate_regex_from_interval():
    # Test with interval 100-199
    regex_100_199 = generate_regex_from_interval(100, 199)
    assert regex_100_199.match("100")
    assert regex_100_199.match("101")
    assert regex_100_199.match("199")
    assert not regex_100_199.match("99")
    assert not regex_100_199.match("1999")
    assert not regex_100_199.match("200")
    
    # Test with interval 5000-5999
    regex_5000_5999 = generate_regex_from_interval(5000, 5999)
    assert regex_5000_5999.match("5000")
    assert regex_5000_5999.match("5001")
    assert regex_5000_5999.match("5999")
    assert not regex_5000_5999.match("4999")
    assert not regex_5000_5999.match("6000")
    
    print("All tests passed successfully.")

# Run the tests
test_generate_regex_from_interval()
