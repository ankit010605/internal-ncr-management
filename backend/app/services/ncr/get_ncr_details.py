from app.repositories.ncr.get_ncr_repository import get_ncr_by_id


def fetch_ncr_details(ncr_id):
    ncr = get_ncr_by_id(ncr_id)

    if not ncr:
        return None

    return ncr.to_dict()