from app.repositories.ncr.list_ncr_repository import get_all_ncrs


def fetch_all_ncrs():
    ncrs = get_all_ncrs()

    return [ncr.to_dict() for ncr in ncrs]