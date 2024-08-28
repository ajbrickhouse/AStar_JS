from flask import Flask, send_from_directory, render_template

app = Flask(__name__, static_folder=r'.')  # Replace 'path_to_your_folder' with the directory where your HTML and JS files are located

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:filename>')
def serve_file(filename):
    return send_from_directory(app.static_folder, filename)

if __name__ == '__main__':
    app.run(debug=True) 