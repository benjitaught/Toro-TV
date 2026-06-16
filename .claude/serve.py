import http.server
import functools
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
Handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=ROOT)
server = http.server.ThreadingHTTPServer(("0.0.0.0", 8000), Handler)
print(f"Serving {ROOT} on port 8000")
server.serve_forever()
