import os
import json

# Path to the screenshots directory
screenshots_folder = './screenshots'

# Create the screenshots-json folder if it doesn't exist
os.makedirs(os.path.join('resources', 'screenshots-json'), exist_ok=True)

# Function to create the screenshots JSON for each project
def create_screenshots_json():
    # Loop through each project folder in the screenshots directory
    for project_name in os.listdir(screenshots_folder):
        project_path = os.path.join(screenshots_folder, project_name)

        # Check if it is a directory (a project folder)
        if os.path.isdir(project_path):
            # Get all image files (png, jpg, jpeg, gif) in the project folder
            image_files = [f for f in os.listdir(project_path) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif'))]

            if image_files:
                # Prepare the data to be written to the JSON file
                screenshots_data = {
                    'screenshots': image_files
                }

                # Path to the new JSON file
                json_file_path = os.path.join("resources", "screenshots-json", f'{project_name}-screenshots.json')

                try:
                    # Write the data to the JSON file
                    with open(json_file_path, 'w') as json_file:
                        json.dump(screenshots_data, json_file, indent=4)
                    print(f'Created {json_file_path} with {len(image_files)} images.')
                except Exception as e:
                    print(f"Error creating {json_file_path}: {e}")
            else:
                print(f'No image files found in {project_name}.')

# Run the script
if __name__ == "__main__":
    create_screenshots_json()
