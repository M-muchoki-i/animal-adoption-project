from flask_restful import Resource, reqparse
from models import AdoptionRequest, db

class AdoptionResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('request_date', required = False, help="Request date is required")
    parser.add_argument('status', required=True, help="Status is required")
    parser.add_argument('user_id', required=False)
    parser.add_argument('animal_id', required=False)
    parser.add_argument('created_at', required=False, help ="Created time is required")

    def get(self, id=None):
        if id is None:
            adoption_request = AdoptionRequest.query.all()
            return [adoption_req.to_dict() for adoption_req in adoption_request], 200  
        else:
            adoption_request = AdoptionRequest.query.filter_by(id=id).first()
            if adoption_request:
                return adoption_request.to_dict(), 200
            return {"error": "Adoption request not found"}, 404
    def post(self):
        data = self.parser.parse_args()
        adoption_data = AdoptionRequest(**data)

        db.session.add(adoption_data)
        db.session.commit()
        return {"message": "Adoption request successfuly created"}, 201
    
    def patch(self, id):
        adoption_request = AdoptionRequest.query.filter_by(id=id).first()
        if not adoption_request:
            return {"message": "Animal adoption request not found"}, 404

        data = self.parser.parse_args()
        
        if data['request_date'] is not None:
            adoption_request.request_date = data['request_date']
        if data['status'] is not None:
            adoption_request.status = data['status']
        if data['user_id'] is not None:
            adoption_request.user_id= data['user_id']
        if data['animal_id'] is not None:
            adoption_request.animal_id = data['animal_id']

        db.session.commit()

        return {"message": "Update is successful",
                "adoption request": adoption_request.to_dict()
                }, 201
    def delete(self, id):
        adoption_request = AdoptionRequest.query.filter_by(id=id).first()
        if adoption_request is None:
            return {"message":"Adoption request deleted successfully"}, 404

        db.session.delete(adoption_request)
        db.session.commit()
        return {"message": "Deleted successfully"}, 201