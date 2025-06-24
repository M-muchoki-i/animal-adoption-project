from flask_restful import Resource
from models import Staff
from flask import request


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
                return {"message": "Staff not found"}, 401
            return staff.to_dict()