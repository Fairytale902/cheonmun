"""Check real local asset/navigation targets across Vercel clean URL variants."""
import re
import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = "https://cheonmun.test"

class References(HTMLParser):
    def __init__(self):
        super().__init__()
        self.assets = []
        self.links = []
        self.base = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "base":
            self.base = attrs.get("href")
        if tag == "script" and attrs.get("src"):
            self.assets.append(attrs["src"])
        if tag == "link" and "stylesheet" in attrs.get("rel", "").split():
            self.assets.append(attrs["href"])
        if tag == "meta" and attrs.get("property") == "og:image":
            self.assets.append(attrs["content"])
        if tag == "img" and attrs.get("src"):
            self.assets.append(attrs["src"])
        if tag == "a" and attrs.get("href"):
            self.links.append(attrs["href"])

def variants(directory, name):
    stem = (directory + "/" if directory else "") + name.removesuffix(".html")
    return ["/" + stem, "/" + stem + "/", "/" + stem + ".html"]

def documents():
    for service, alias in [("1", "saju"), ("2", "tarot")]:
        yield service + "/index.html", [
            "/" + service, "/" + service + "/", "/" + service + "/index.html",
            "/" + alias, "/" + alias + "/", "/" + alias + "/index.html",
        ]
        for name in ["terms.html", "privacy.html", "refund.html"]:
            yield service + "/" + name, variants(service, name)
    for name in ["terms.html", "privacy.html", "refund.html"]:
        yield name, variants("", name)

def missing_target(reference, page_url, asset=True):
    if not reference or reference.startswith(("#", "javascript:", "mailto:", "tel:", "data:")):
        return None
    resolved = urlsplit(urljoin(page_url, reference))
    if resolved.netloc != urlsplit(ORIGIN).netloc:
        return None
    path = ROOT / unquote(resolved.path).lstrip("/")
    candidates = [path] if asset else [path, Path(str(path) + ".html"), path / "index.html"]
    if not any(candidate.is_file() for candidate in candidates):
        return resolved.path
    return None

class AssetPathTests(unittest.TestCase):
    def test_document_assets_resolve_on_direct_clean_and_slash_urls(self):
        missing = []
        for relative, routes in documents():
            parser = References()
            parser.feed((ROOT / relative).read_text(encoding="utf-8"))
            for route in routes:
                page_url = urljoin(ORIGIN + route, parser.base) if parser.base else ORIGIN + route
                for ref in parser.assets:
                    target = missing_target(ref, page_url)
                    if target:
                        missing.append((route, ref, target))
        self.assertEqual(len(missing), 0, f"{len(missing)} missing document assets; examples: {missing[:6]}")

    def test_local_navigation_resolves_on_direct_clean_and_slash_urls(self):
        missing = []
        for relative, routes in documents():
            parser = References()
            parser.feed((ROOT / relative).read_text(encoding="utf-8"))
            for route in routes:
                page_url = urljoin(ORIGIN + route, parser.base) if parser.base else ORIGIN + route
                for ref in parser.links:
                    target = missing_target(ref, page_url, asset=False)
                    if target:
                        missing.append((route, ref, target))
        self.assertEqual(len(missing), 0, f"{len(missing)} missing navigation targets; examples: {missing[:6]}")

    def test_dynamic_tarot_card_images_resolve_on_every_entry_url(self):
        refs = set()
        for path in list((ROOT / "2/lib").glob("tarot-data-*.js")) + [ROOT / "2/app.js"]:
            refs.update(re.findall(r"['\"]([^'\"]*assets/cards/[^'\"]+)['\"]", path.read_text(encoding="utf-8")))
        self.assertGreaterEqual(len(refs), 79)
        parser = References()
        parser.feed((ROOT / "2/index.html").read_text(encoding="utf-8"))
        missing = []
        for route in ["/2", "/2/", "/2/index.html", "/tarot", "/tarot/"]:
            page_url = urljoin(ORIGIN + route, parser.base) if parser.base else ORIGIN + route
            for ref in refs:
                target = missing_target(ref, page_url)
                if target:
                    missing.append((route, ref, target))
        self.assertEqual(len(missing), 0, f"{len(missing)} missing card images; examples: {missing[:6]}")

    def test_css_assets_resolve_relative_to_the_stylesheet(self):
        missing = []
        for service in ["1", "2"]:
            path = ROOT / service / "style.css"
            refs = re.findall(r"url\(\s*['\"]?([^)'\"]+)['\"]?\s*\)", path.read_text(encoding="utf-8"))
            for ref in refs:
                target = missing_target(ref, ORIGIN + "/" + service + "/style.css")
                if target:
                    missing.append(target)
        self.assertEqual(len(missing), 0, f"Missing CSS assets: {missing}")

if __name__ == "__main__":
    unittest.main()
