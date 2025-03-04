# hnn-front-website
Code for the new "front"-facing HNN website

Current GitHub Pages rendered website can be found here: <https://github-at-brown.github.io/hnn-front-website/homepage.html>.

Note that the rendered website is currently built off of the `main` branch, NOT the `gh-pages` branch. This is because the website will be under heavy development for the time being. Eventually, this will be reversed, and the branch used for building the proper website will be changed to the `gh-pages` branch.

### Running scripts:

Any scripts inside `scripts` can be run using the conda environment built for the HNN Textbook website here https://github.com/dylansdaniels/website_redesign , unless said otherwise in the script.

To run the "prettify" script, once you have activated your environment and you are at the top-level directory of this repository on your local machine, run the following:

```{bash}
$ python scripts/prettify_all_html_files.py
```
