from app.repositories.master_repository import get_all_master_data


def fetch_master_data():
    records = get_all_master_data()

    return [record.to_dict() for record in records]