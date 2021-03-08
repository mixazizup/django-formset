import pytest
from playwright.sync_api import sync_playwright


class BrowserPage:
    def __init__(self, live_server):
        print(live_server)
        self.live_server = live_server

    def __enter__(self):
        def print_args(msg):
            for arg in msg.args:
                print(arg.json_value())

        self.playwright = sync_playwright().start()
        self.browser = self.playwright.chromium.launch()
        page = self.browser.new_page()
        page.goto(self.live_server.url)
        page.on('console', print_args)
        return page

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.browser.close()
        self.playwright.stop()


@pytest.fixture
def page(live_server):
    with BrowserPage(live_server) as page:
        yield page
