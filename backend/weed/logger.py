from django.core.handlers.wsgi import WSGIRequest
from django.core.handlers.asgi import ASGIRequest
from django.http import HttpResponse
import logging

logging.basicConfig(
    filename="./logs.txt", filemode="a+", format="%(asctime)s %(message)s"
)


class LogsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request: WSGIRequest | ASGIRequest):
        response: HttpResponse = self.get_response(request)

        try:
            logging.error(
                f"{request.get_full_path()} {response.status_code} | {request.headers} | {request.body} | {response.content}"
            )
        except:  # noqa
            logging.error(
                f"{request.get_full_path()} {response.status_code} | {request.headers} | {response.content}"
            )

        return response
