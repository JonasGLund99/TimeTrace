import re


def generate_larger_part(lower_bound):
    larger_part = ""
    for i in range(len(str(lower_bound))):
        if i == 0:
            larger_part += "|([1-9]"
        larger_part += "[0-9]"
    larger_part += "+"
    larger_part += "))(\.\d+)?"
    return larger_part


#Matches the lower_bound and upwards.
def generate_regex_from_lower_bound(lower_bound):
    pattern = "(("
    current_factor = 0
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

    larger_part = generate_larger_part(lower_bound)

    full_pattern = f"{f"(?!{lower_bound_str}(\.0*)?$)" + "(?<!\.)" + pattern + round_numbers_pattern + larger_part}"

    full_pattern = r'' + full_pattern
    
    # Creating the regex object
    regex = re.compile(full_pattern)

    return regex

# Log file tests:
def test_generate_regex_from_lower_bound_log_file():
    logfile = ["""
    This is a logfile
Velocity 100 adrenaline 50
Velocity 120 adrenaline 60
Velocity 110 adrenaline 55
Velocity 130 adrenaline 70
Velocity 115 adrenaline 65
Velocity 140 adrenaline 75
Velocity 125 adrenaline 68
Velocity 135 adrenaline 72
Velocity 145 adrenaline 80
Velocity 150 adrenaline 85
Velocity 155 adrenaline 90
Velocity 160 adrenaline 95
Velocity 165 adrenaline 100
Velocity 170 adrenaline 105
Velocity 175 adrenaline 110
Velocity 180 adrenaline 115
Velocity 185 adrenaline 120
Velocity 190 adrenaline 125
Velocity 195 adrenaline 130
Velocity 200 adrenaline 135
"""]
    regex_over_100 = generate_regex_from_lower_bound(100)


# Test cases
def test_generate_regex_from_lower_bound():
    # Test with lower bound 100
    regex_100 = generate_regex_from_lower_bound(100)
    assert not regex_100.match("100.")
    assert not regex_100.match("100.000")
    assert regex_100.match("901.12234")
    assert regex_100.match("900")
    assert not regex_100.match("100")
    assert regex_100.match("101")
    assert regex_100.match("102")
    assert regex_100.match("121")
    assert regex_100.match("123")
    assert regex_100.match("201")
    assert regex_100.match("110")
    assert regex_100.match("120")
    assert regex_100.match("130")
    assert regex_100.match("140")
    assert regex_100.match("150")
    assert regex_100.match("160")
    assert regex_100.match("170")
    assert regex_100.match("180")
    assert regex_100.match("190")
    assert regex_100.match("199")
    assert regex_100.match("999")
    assert regex_100.match("990.12234")
    assert not regex_100.match("99")
    assert not regex_100.match("0")
    assert not regex_100.match("15")
    assert regex_100.match("1000")

    regex_199 = generate_regex_from_lower_bound(198)
    assert not regex_199.match("100")
    assert regex_199.match("300")
    assert regex_199.match("200")
    assert regex_199.match("301")

    regex_188 = generate_regex_from_lower_bound(188)
    assert not regex_188.match("100")
    assert regex_188.match("198")
    assert regex_188.match("199")
    assert regex_188.match("189")
    assert regex_188.match("201")
    assert regex_188.match("201")

    # Test with lower bound 5000
    regex_5000 = generate_regex_from_lower_bound(5000)
    assert regex_5000.match("5001")
    assert regex_5000.match("5999")
    assert regex_5000.match("9999")
    assert not regex_5000.match("4999")
    assert not regex_5000.match("4")
    assert not regex_5000.match("440")
    assert regex_5000.match("10000")

    # Test with lower bound 1
    regex_1 = generate_regex_from_lower_bound(1)
    assert regex_1.match("2")
    assert regex_1.match("9")
    assert regex_1.match("99")
    assert not regex_1.match("0")
    assert regex_1.match("100")
    
    # Test with lower bound 1
    regex_9 = generate_regex_from_lower_bound(9)
    assert not regex_9.match("9")
    assert regex_9.match("10")
    assert regex_9.match("11")
    assert regex_9.match("12")
    assert regex_9.match("13")

    regex_0 = generate_regex_from_lower_bound(0)
    assert regex_0.match("1")
    assert not regex_0.match("0")
    assert regex_0.match("0.232323")
    assert regex_0.match("9")
    assert regex_0.match("99")
    assert not regex_0.match("-1")
    assert not regex_0.match("-1.232")
    assert regex_0.match("100")

    # Test with lower bound 999
    regex_999 = generate_regex_from_lower_bound(999)
    assert regex_999.match("1000")
    assert regex_999.match("1099")
    assert regex_999.match("1999")
    assert not regex_999.match("998")
    assert not regex_999.match("1")
    assert not regex_999.match("88")
    assert not regex_999.match("999")
    assert regex_999.match("9999")

    # Test with lower bound 100000
    regex_100000 = generate_regex_from_lower_bound(100000)
    assert regex_100000.match("100001")
    assert regex_100000.match("100999")
    assert regex_100000.match("199999")
    assert not regex_100000.match("99999")
    assert regex_100000.match("1000000")

    print("All tests passed successfully.")

# Run the tests
test_generate_regex_from_lower_bound()
test_generate_regex_from_lower_bound_log_file()