from flask import render_template, request, redirect, url_for, flash, session
from app.models import User, Requests
from flask import Blueprint
from flask_mail import Message
from app import  db, mail
from flask import jsonify
import os
import json
admin="mohammadmend@hotmail.com"
main_bp = Blueprint("main", __name__)

@main_bp.route('/ping', methods=['GET'])
def ping():
    return jsonify({"success": True, "message": "pong"}), 200


@main_bp.route('/create', methods=['POST'])
def create():
    data= request.get_json() or {}
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    print(email)
    role = data.get('role', 'user') 
    if not username or not password:
        return jsonify({"success": False, "error": "Username and password required"}), 400
    user = User.query.filter_by(username=username).first()
    if user:
        return jsonify({"success": False, "error": "User already exists"}), 400
    new_user = User(username=username, email=email)
    new_user.set_password(password)
    new_user.role = role
    session['user_id'] = new_user.id
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"success": True, "message": "User created successfully"}), 201



@main_bp.route('/')
def hello():
    return "Hello, World!", 200


@main_bp.route('/profile', methods=['GET'])
def profile():
    if 'user_id' not in session:
        return redirect(url_for('main.login'))
    user = User.query.filter_by(id=session['user_id']).first()
    if not user:
        return jsonify({"success": False, "error": "User not found"}), 404
    if user.role != 'admin':
        try:
            req= Requests.query.filter_by(user_id=user.id).all()
            return jsonify({"success": True, "requests":[{"title":q.title, "status":q.status, "user_id":q.user_id} for q in req]}), 200
        except Exception as e:
            return jsonify({"success": True, "requests":[{"title":None, "status":None, "user_id":None}]}), 200        
        return jsonify({"success": True, "requests":[{"title":q.title, "status":q.status, "user_id":q.user_id} for q in query]}), 200
    else:
        try:
            req= Requests.query.all()
            return jsonify({"success": True, "requests":[{"title":q.title, "status":q.status, "user_id":q.user_id} for q in req]}), 200
        except Exception as e:
            return jsonify({"success": True, "requests":[{"title":None, "status":None, "user_id":None}]}), 200        


        req=Requests.query.all()
    
    return jsonify({"success": True, "requests":[{"title":q.title, "status":q.status, "user_id":q.user_id} for q in req]}), 200

@main_bp.route('/login', methods=['POST'])
def login():
    data=request.get_json() or {}
    print("hello",data)
    username=data.get('username')
    password=data.get('password')
    if not username or not password:
        print("here")
        return jsonify({"success":False, "error":"Username and password required"}),400
    user=User.query.filter_by(username=username).first()
    if not user and not user.check_password(password):
        return jsonify({"success":False, "error":"Invalid username or password"}),400

    session['user_id']= user.id
    session['username'] = user.username
    return jsonify({"success":True, "Username":user.username}),200

@main_bp.route('/logout')
def logout():
    session.pop('user_id', None)
    session.pop('username', None)
    return jsonify({"success":True, "message":"Logged out successfully"}),200


@main_bp.route('/manage', methods=['GET'])
def manage_requests():
    id=User.query.filter_by(username='admin').first()
    if 'user_id' not in session:
        return jsonify({"success":False, "error":"Unauthorized access"}),401
    if User.query.filter_by(id=session['user_id']).first().role != 'admin':
        return jsonify({"success":False, "error":"Unauthorized access"}),403
    query=Requests.query.all()
    for q in query:
        print(q.title, q.status, q.user_id)
        return jsonify({"success":True, "requests":[{"title":q.title, "status":q.status, "user_id":q.user_id} for q in query]}),200



@main_bp.route('manage/<int:request_id>/update', methods=['PUT'])
def update_request(request_id):
    print("bro")
    if 'user_id' not in session:
        return jsonify({"success":False, "error":"Unauthorized access"}),401
    if User.query.filter_by(id=session['user_id']).first().role != 'admin':
        return jsonify({"success":False, "error":"Unauthorized access"}),403
    
    query = Requests.query.filter_by(id=request_id).first()
    qu=query.user_id
    email=User.query.filter_by(id=qu).first().email
    
    if not query:
        return jsonify({"success":False, "error":"Request not found"}),404
    
    query.status = "in progress"
    User_id=Requests.query.filter_by(id=request_id).first().user_id

    msg=   Message(subject="Request Update",
                    sender="mohammadmend@gmail.com",
                    recipients=[email],
                    body=f"Your request with ID {request_id} is now in progress.")
    try:
        mail.send(msg)
    except Exception as e:
        print("Error sending email:", e)
        return jsonify({"success":False, "error":"Failed to send email notification"}),500
    db.session.commit()
    
    return jsonify({"success":True, "message":"Request updated successfully"}),200

@main_bp.route('/manage/<int:request_id>/DELETE', methods=['DELETE'])
def manageDelete(request_id):
    if 'user_id' not in session:
        return jsonify({"success":False, "error":"Unauthorized access"}),401
    if User.query.filter_by(id=session['user_id']).first().role != 'admin':
        return jsonify({"success":False, "error":"Unauthorized access"}),403
    
    query = Requests.query.filter_by(id=request_id).first()
    qu=query.user_id
    email=User.query.filter_by(id=qu).first().email
    if not query:
        return jsonify({"success":False, "error":"Request not found"}),404
    msg=   Message(subject="Request Update",
                    sender=os.environ.get('MAIL_USERNAME'),
                    recipients=[email],
                    body=f"Your request with ID {request_id} is now in progress.")
    try:
        mail.send(msg)
    except Exception as e:
        return jsonify({"success":False, "error":"Failed to send email notification"}),500
    db.session.delete(query)
    db.session.commit()
    
    return jsonify({"success":True, "message":"Request deleted successfully"}),200


@main_bp.route('/request', methods=['POST'])
def submit_request():
    data= request.get_json() or {}
    user_id=session.get('user_id')
    title= data.get('title')
    description= data.get('description')
    requestss = Requests(user_id=user_id, title=title, description=description, createdate=db.func.current_timestamp())
    db.session.add(requestss)
    db.session.commit()
    return jsonify({"success": True, "message": "Request submitted successfully"}), 201


