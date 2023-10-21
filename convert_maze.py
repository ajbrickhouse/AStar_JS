from PIL import Image, ImageDraw

def convert_maze(image_path):
    # Load the image
    image = Image.open(image_path)
    draw = ImageDraw.Draw(image)
    
    # Get image dimensions
    img_width, img_height = image.size
    
    # Calculate grid square dimensions
    column_count = 29
    row_count = column_count
    grid_width = img_width // column_count
    grid_height = img_height // row_count
    
    # Initialize JavaScript list
    js_list = []

    for row in range(row_count):
        row_list = []
        for col in range(column_count):
            # Calculate the top-left corner of the grid square
            x1 = col * grid_width
            y1 = row * grid_height
            
            # Calculate the bottom-right corner of the grid square
            x2 = x1 + grid_width - 1
            y2 = y1 + grid_height - 1
            
            # Make sure we are within the image boundaries
            x2 = min(x2, img_width - 1)
            y2 = min(y2, img_height - 1)
            
            # Calculate the center of the grid square
            center_x = (x1 + x2) // 2
            center_y = (y1 + y2) // 2
            
            # Get the color of the center pixel
            center_pixel = image.getpixel((center_x, center_y))
            
            # Check if the center pixel is white
            is_white = ((center_pixel[0] + center_pixel[1] + center_pixel[2])/3) >= 200

            # Add 1 for white and 0 for non-white to the row list
            row_list.append(1 if is_white else 0)
            
            # Draw the number at the center of the grid square
            text_color = "black" if is_white else "white"

            if is_white:
                draw.text((center_x-1, center_y-5), str(1), fill=text_color)
            else:
                draw.text((center_x-1, center_y-5), str(0), fill=text_color)

        # Add the row list to the JavaScript list
        js_list.append(row_list)

    js_list.insert(0, "var mazeData = [")
    js_list.append("];")

    # Save the annotated image
    labeled_maze = "mazes/labeled_maze.png"
    image.save(labeled_maze)

    return js_list, labeled_maze, column_count

if "__main__" == __name__:
    js_list, maze_image_path, column_count = convert_maze("mazes/maze4.png")

    print("-" * 33, " <-- Maze data --> ", "-" * 33, "\n")

    for row in js_list:
        if len(row) >= column_count:
            print(f"{row},")
        else:
            print(row)

    print("-" * 33, " <-- Maze data --> ", "-" * 33, "\n")

    