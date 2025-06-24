from flask_restful import Resource
from models import Staff, db
from flask import request


# CRUD methods to handle our staffs
# Class resource to get all the staffs in the database and by their Id
class StaffResource(Resource):
    def get(self, id=None):
        if id is None:
            staffs = Staff.query.all()  # Query all staffs from the database
            return [
                staff.to_dict() for staff in staffs
            ], 200  # Returns list of staffs with a 200 status code
        else:
            staff = Staff.query.filter_by(id=id).first()

            if staff is None:
                return {
                    "message": "Staff not found"
                }, 404  # ie if the staff member is not found
            return (
                staff.to_dict(),
                200,
            )  # Return staff members details with 200 code status

    def patch(self, id):
        staff = Staff.query.filter_by(id=id).first()  # Searches the staff by the ID
        if staff is None:
            return {
                "error message": "Staff not found"
            }, 404  # Error 404 if the staff is not found

        # Then we get the JSON data from the request body
        data = request.get_json()

        # Validate our request body

        if "name" in data and not isinstance(data["name"], str):
            return {"error": ["Validation error: 'name' must be a string"]}, 400
        if "email" in data and not isinstance(data["email"], str):
            return {"error": ["Validation error: 'email' must be a string"]}, 400
        if "contact_info" in data and not isinstance(data["contact_info"], str):
            return {"error": ["Validation error: 'contact_info' must be a string"]}, 400

        # Update the staff member's attributes if they are provided in our request

        if "name" in data:
            staff.name = data["name"]
        if "email" in data:
            staff.email = data["email"]
        if "contact_info" in data:
            staff.contact_info = data["contact_info"]

        # Commit the changes to our daabase

        db.session.commit()

        # Finally return the updated staff member details

        return {
            "id":staff.id,
            "name":staff.name,
            "email": staff.email,
            "contact_info": staff.contact_info,
        }, 200
