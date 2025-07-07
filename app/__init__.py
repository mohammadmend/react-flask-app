from flask           import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate    import Migrate
from flask_mail import Mail
from flask_cors import CORS
import os
os.environ['MAIL_PASSWORD']="mtugxljarrehohwf"
os.environ['MAIL_USERNAME']="mohammadmend@gmail.com"

db      = SQLAlchemy()
migrate = Migrate()
mail = Mail()
def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = (
        "mysql+mysqlconnector://portal_user:portal_pw@127.0.0.1:3306/it_portal"
    )
    app.config.update(
    MAIL_SERVER= 'smtp.gmail.com',
    MAIL_PORT = 587,
    MAIL_USE_TLS = True,
    MAIL_USE_SSL = False,
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME'),
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD'),
    ADMINS=['mohammadmend@gmail.com']
    )
    mail.init_app(app)
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-fallback-key')
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)
    from app.routes import main_bp
    app.register_blueprint(main_bp, url_prefix='/api')

    return app
