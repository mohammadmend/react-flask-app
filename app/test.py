# from app import create_app, db
# from app.models import User

# app=create_app()
# with app.app_context():
#     if not User.query.filter_by(username="admin").first():
#         u=User(username="admin")
#         u.set_password("admin")
#         db.session.add(u)
#     client = app.test_client()
#     res=client.post("/api/login", json={"username": "admin", "password": "admin"})
#     print(res.status_code, res.get_json())
from app import create_app, db
from app.models import User, Requests
import os
from flask import session, redirect, url_for, render_template, request, flash
os.environ['MAIL_PASSWORD'] = "mtugxljarrehohwf"
print("he",os.getenv("MAIL_PASSWORD"))
app = create_app()
with app.app_context():
    # if not User.query.filter_by(id=1).first():
    #     u=User(username="admin")
    #     u.set_password("admin")
    #     db.session.add(u)
    client=app.test_client()
    

    res=client.post("/api/login", json={"username": "admin", "password": "admin"})
    #print(res.status_code, res.get_json())
    print(Requests.query.all())
    res2=client.get("/api/profile")
    print(res2.status_code, res2.get_json())