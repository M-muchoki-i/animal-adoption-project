from flask_restful import Resource
from flask import request, jsonify
from models import User, db
from flask_bcrypt import generate_password_hash  # ensure Bcrypt is initialized in your app

class StaffSignupResource(Resource):
    def post(self):
        data = request.get_json()
        required_fields = ["name", "email", "password", "contact_info"]

        # Validate required fields
        for field in required_fields:
            if field not in data:
                return {"error": f"'{field}' is required"}, 400

        # Check for existing email
        if User.query.filter_by(email=data["email"]).first():
            return {"error": "Email already exists"}, 409

        hashed_password = generate_password_hash(data["password"]).decode("utf-8")

        new_user = User(
            name=data["name"],
            email=data["email"],
            password=hashed_password,
            contact_info=data["contact_info"],
            role="staff"
        )

        db.session.add(new_user)
        db.session.commit()

        return {
            "message": "Staff account created successfully",
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
            "role": new_user.role
        }, 201
