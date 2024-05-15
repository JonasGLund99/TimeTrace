import re

def test_regex():
    pattern = re.compile(r'^([9][4-9]|[1-9][0-9][0-9]+)(.[0-9]([0-9]*)?)?$')

    # Test numbers smaller or equal to 93
    assert not pattern.match("93")
    assert not pattern.match("93.01")
    assert not pattern.match("93.0")
    assert not pattern.match("50")
    assert not pattern.match("1")
    assert not pattern.match("0")
    assert not pattern.match("-10")

    # Test numbers larger than 93
    assert pattern.match("94")
    assert pattern.match("94.00")
    assert pattern.match("94.01")
    assert pattern.match("94.01111")
    assert pattern.match("95")
    assert pattern.match("96")
    assert pattern.match("97")
    assert pattern.match("98")
    assert pattern.match("99")
    assert pattern.match("100")
    assert pattern.match("123")
    assert pattern.match("999")
    assert pattern.match("1000")

    print("All tests passed!")

test_regex()
