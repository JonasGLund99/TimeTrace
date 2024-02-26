import xml.etree.ElementTree as ET

LOGFILEPATH = "logfiles/logUniqueEventAlias.txt"

class Log:
    def __init__(self):
        self.events = []

class LogEvent:
    def __init__(self, timestamp, event_text):
        self.timestamp = timestamp
        self.event_text = event_text


class XMLFormatter:
    def __init__(self, log):
        self.log = log

    def format_xml(self):
        self.root = ET.Element("nta")
        declaration = ET.SubElement(self.root, "declaration")
        declaration.text = f"{self.format_array([event.timestamp for event in self.log.events], 'int', 'TIMESTAMPS')} {self.format_array([event.event_text for event in self.log.events], 'string', 'EVENTS')}"
        self.tree = ET.ElementTree(self.root)
    
    def format_array(self, arr, type, name):
        return f"const {type} {name}[{arr.__len__()}] = {{{', '.join(arr)}}};\n\n"

    
    def write_to_file(self, file_path):
        self.format_xml()
        xml_string = ET.tostring(self.root, encoding="utf-8")
        # Manually add DOCTYPE declaration
        xml_with_doctype = b"<?xml version='1.0' encoding='utf-8'?>\n<!DOCTYPE nta PUBLIC '-//Uppaal Team//DTD Flat System 1.6//EN' 'http://www.it.uu.se/research/group/darts/uppaal/flat-1_6.dtd'>" + xml_string
        # Write to file
        with open(file_path, "wb") as file:
            file.write(xml_with_doctype)


if __name__ == "__main__":
    log = Log()
    with open(LOGFILEPATH, "r") as file:
        # Read the log file line by line and add the events to the Log object.
        for line in file:
            timestamp, event_text = line.strip().split("-")
            log.events.append(LogEvent(timestamp.strip(), event_text.strip()))

    # Create an XMLFormatter object and use it to write the log to an XML file.
    formatter = XMLFormatter(log)
    formatter.write_to_file("xml-formatter/formattedXML/log1.xml")

