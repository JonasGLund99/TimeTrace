import re

# The idea is to use the negation of inclusive over with the upper_bound get the result froms that matching the string,
# then using inclusive over with the lower_bound to get the result from the previous string.


# Todo handle negative numbers and floats 💀
# For negative numbers one could use the inclusive over for larger negative values, simply put - in front of re
# created from the absolute value of the number (lower/upper bound).


def generate_regex_from_interval(lower_bound, upper_bound):
    # Convert bounds to strings
    lower_bound_str = str(lower_bound)
    upper_bound_str = str(upper_bound)
    
    # Ensure the upper bound has the same number of digits as the lower bound
    if len(upper_bound_str) != len(lower_bound_str):
        raise ValueError("Upper bound must have the same number of digits as the lower bound.")
    
    # Initialize pattern
    pattern = "^"
    
    # Iterate over each digit position
    for lower_digit, upper_digit in zip(lower_bound_str, upper_bound_str):
        # If digits are the same, add them to pattern
        if lower_digit == upper_digit:
            pattern += lower_digit
        else:
            # If digits are different, create a range
            pattern += f"[{lower_digit}-{upper_digit}]"
    
    # Add optional digits and decimal part
    pattern += r"\d*\.?\d*$"
    
    # Compile regex
    regex = re.compile(pattern)
    
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
