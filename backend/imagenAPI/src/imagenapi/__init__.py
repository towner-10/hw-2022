from quart import Quart, g, request
import asyncio

from pathlib import Path
from sqlite3 import dbapi2 as sqlite3

app = Quart(__name__)

app.config.update({
    "DATABASE": app.root_path / "imagen.sqlite",
})


def _connect_db():
    engine = sqlite3.connect(app.config["DATABASE"])
    engine.row_factory = sqlite3.Row
    return engine


def init_db():
    db = _connect_db()
    with open(app.root_path / "schema.sql", mode="r") as file_:
        db.cursor().executescript(file_.read())
    db.commit()


def _get_db():
    if not hasattr(g, "sqlite_db"):
        g.sqlite_db = _connect_db()
    return g.sqlite_db


@app.route("/jobs/", methods=["GET", "POST"])
async def jobs():
    if request.method == "POST":
        db = _get_db()
        json_data = await request.get_json()

        print("adding new job ", json_data['title'])
        cur = db.execute(
            "INSERT INTO jobs (title) VALUES (?)",
            [json_data['title']]
        )
        db.commit()

        print("new ID: ", cur.lastrowid)


        return 'bruh'

    else:  # GET
        return 'broge'


def run() -> None:
    app.run()
