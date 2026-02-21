import hashlib

def generate_new_url(url: str) -> str:
    encoded_url = hashlib.md5(url.encode()).hexdigest()
    short_url = encoded_url[:6]

    prefix = "buff.st/"

    return prefix + short_url

