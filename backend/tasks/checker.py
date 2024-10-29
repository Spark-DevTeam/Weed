from urllib import request
from urllib.error import HTTPError
import json
from django.conf import settings


class Checker:
    _uri = f"{settings.TELEGRAM_ENDPOINT}/getChatMember"

    def prepare_data(self, data: dict | None):
        _json = json.dumps(data)
        _bytes = str(_json).encode()

        return _bytes

    def req(self, data: dict | None = {}):
        _data = self.prepare_data(data=data)

        _request = request.Request(self._uri, data=_data, method="POST")
        _request.add_header("Content-Type", "application/json")

        try:
            _response = request.urlopen(_request)
        except HTTPError as e:
            return e.read()

        return {"response": _response.read()}

    def check_member(self, id: int, channel: str):
        data = {"chat_id": channel, "user_id": id}

        return self.req(data=data)
