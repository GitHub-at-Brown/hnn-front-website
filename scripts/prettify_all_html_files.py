#!/usr/bin/env python

from pathlib import Path

from bs4 import BeautifulSoup

path_repo_root = Path(__file__).parents[1]
paths_html_files = list(path_repo_root.glob('**/*.html'))

for path_html in paths_html_files:
    with open(path_html, 'r+') as file:
        content = file.read()
        soup = BeautifulSoup(content, 'html.parser')
        content_prettified = str(soup.prettify())
        file.seek(0)
        file.truncate(0)
        file.write(content_prettified)

