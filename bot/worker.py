import aiohttp
import json


class APIWorker:
    _session = None
    _api = "http://backend:8000/api/v1"

    def __init__(self) -> None:
        if not self._session:
            self._session = aiohttp.ClientSession()

    async def cleanup(self):
        await self._session.close()

    async def req(self, endpoint: str, params: list = None):
        async with self._session.get(f"{self._api}{endpoint}", params=params) as resp:
            data = await resp.json()

        return data

    async def post_req(self, endpoint: str, data: dict | None = {}):
        async with self._session.post(
            f"{self._api}{endpoint}", data=json.dumps(data)
        ) as resp:
            data = await resp.json()

        return data

    async def createUser(self, id: int, name: str, ref: str = None) -> dict:
        data = {"id": id, "name": name}

        if ref:
            data["ref"] = ref

        return await self.post_req(endpoint="/users/", data=data)
