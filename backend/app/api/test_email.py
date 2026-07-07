from app.api import api
import socket


@api.route("/test-email", methods=["GET"])
def test_email():

    print("=" * 60)
    print("TEST EMAIL STARTED")
    print("=" * 60)

    try:

        print("Creating socket...")

        sock = socket.create_connection(
            ("smtp.gmail.com", 587),
            timeout=10
        )

        print("SOCKET CONNECTED SUCCESSFULLY")

        sock.close()

        return {
            "success": True,
            "message": "Socket connection successful"
        }

    except Exception as e:

        print("SOCKET ERROR")
        print(type(e))
        print(e)

        return {
            "success": False,
            "error": str(e)
        }, 500