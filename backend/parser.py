import json
from datetime import datetime

def parse_json_data(data):
    parsed_data = []
    
    for item in data:
        timestamp = item['timestamp']
        
        # Parse the timestamp into a datetime object
        date_time_obj = datetime.strptime(timestamp, "%m/%d/%y %H:%M")
        
        # Extract the date and time as separate strings
        date = date_time_obj.strftime("%Y-%m-%d")  # e.g., "2024-09-15"
        time = date_time_obj.strftime("%H:%M")     # e.g., "21:23"
        
        # Create a new dictionary with date and time split, keeping other fields
        parsed_item = {
            'date': date,
            'time': time,
            'cost': item['cost'],
            'itemList': item['itemList']
            
            # "subtotal": item["subtotal"],
            # "menuItems": item["menuItems"],
            # "tip": item["tip"],
            # "server": item["server"],
        }
        
        # Add to the list of parsed items
        parsed_data.append(parsed_item)
    
    return parsed_data

# Example usage
if __name__ == "__main__":
    # Load your JSON data from the file
    with open('inventoryDB.json', 'r') as file:
        data = json.load(file)
    
    # Parse the data
    parsed_data = parse_json_data(data)
    
    # Print the parsed data
    print(json.dumps(parsed_data, indent=4))
