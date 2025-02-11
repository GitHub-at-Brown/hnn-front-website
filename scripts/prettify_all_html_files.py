#!/usr/bin/env python

from pathlib import Path

import bs4

path_repo_root = Path(__file__).parents[1]
paths_html_files = list(path_repo_root.glob('**/*.html'))

# Taken from https://stackoverflow.com/a/72746676
formatter = bs4.formatter.HTMLFormatter(indent=4)

for path_html in paths_html_files:
    with open(path_html, 'r+') as file:
        content = file.read()
        soup = bs4.BeautifulSoup(content, 'html.parser')
        content_prettified = str(soup.prettify(formatter=formatter))
        file.seek(0)
        file.truncate(0)
        file.write(content_prettified)

