from flask import Flask, render_template, jsonify
import ctypes
import os

app = Flask(__name__)

lib_path = os.path.join(os.path.dirname(__file__), "native", "libgame.so")

game_lib = None
if os.path.exists(lib_path):
    game_lib = ctypes.CDLL(lib_path)
    game_lib.increase_score.restype = None
    game_lib.get_score.restype = ctypes.c_int

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/increase_score")
def increase_score():
    if game_lib:
        game_lib.increase_score()
        return jsonify(score=game_lib.get_score())
    return jsonify(score=0)

@app.route("/api/get_score")
def get_score():
    if game_lib:
        return jsonify(score=game_lib.get_score())
    return jsonify(score=0)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
