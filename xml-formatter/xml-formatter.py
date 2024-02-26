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
        root = ET.Element("log")
        for event in self.log.events:
            event_elem = ET.SubElement(root, "event")
            timestamp_elem = ET.SubElement(event_elem, "timestamp")
            timestamp_elem.text = str(event.timestamp)
            event_text_elem = ET.SubElement(event_elem, "event_text")
            event_text_elem.text = event.event_text
        tree = ET.ElementTree(root)
        return tree
    
    def write_to_file(self, file_path):
        xml_tree = self.format_xml()
        xml_tree.write(file_path)


if __name__ == "__main__":
    log = Log()
    with open(LOGFILEPATH, "r") as file:
        # Read the log file line by line and add the events to the Log object.
        for line in file:
            timestamp, event_text = line.strip().split("-")
            log.events.append(LogEvent(timestamp.strip(), event_text.strip()))

    # Create an XMLFormatter object and use it to write the log to an XML file.
    formatter = XMLFormatter(log)
    formatter.write_to_file("xml-formatter/formattedXML/log.xml")

