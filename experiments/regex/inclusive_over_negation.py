import re

# Original pattern
original_pattern = r'(([1-9][9-9][9-9])|([1-9][0-9][0-9][0-9]+))(\.\d+)?$'

# Negated pattern
negated_pattern = r'^(?!(([1-9][9-9][9-9])|([1-9][0-9][0-9][0-9]+))(\.\d+)?$).*'
              #  '^(?!(([1-9][9-9][9-9])|([1-9][0-9][0-9][0-9]+))(\\.\\d\\+)?$).*'
# Creating the regex object

negated_regex = re.compile(negated_pattern)

# Example usage:
print(negated_regex.match("123"))  # Should match
print(negated_regex.match("999"))  # Should match
print(negated_regex.match("1234"))  # Should match
print(negated_regex.match("9999"))  # Should match
print(negated_regex.match("123.45"))  # Should match
assert not negated_regex.match("999.99")  # Should not match
print(negated_regex.match("999.99"))  # Should match

# Examples that should not match
print(negated_regex.match("9999.99"))  # Should not match
print(negated_regex.match("123.45"))  # Should not match
print(negated_regex.match("12345"))  # Should not match

negated_failing_pattern = '^(?!(([1-9][9-9][9-9])|([1-9][0-9][0-9][0-9]+))(\.\d+)?$).*'
negated_failing_regex = re.compile(negated_failing_pattern)

# Example usage:
assert negated_failing_regex.match("123")  # Should match
assert not negated_failing_regex.match("999")  # Should not match
assert not negated_failing_regex.match("1234")  # Should not match
assert not negated_failing_regex.match("9999")  # Should not match
assert negated_failing_regex.match("123.45")  # Should match
assert not negated_failing_regex.match("999.99")  # Should not match

# Examples that should not match
assert not negated_failing_regex.match("9999.99")  # Should not match
assert negated_failing_regex.match("123.45")  # Should match
assert not negated_failing_regex.match("12345")  # Should not match