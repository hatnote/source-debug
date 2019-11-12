# Wikipedia Source Debug Tool
*A validation tool for Wikipedia sources.*

The Wikipedia Source Debug Tool provides information about the Wikipedia citation data for a specific source. Information is gathered via Zotero translators and integrated into Wikipedia via Citoid. Sources are a key part of Wikipedia's integrity and reliability, so it's valuable to get this right.

This was a project from [WikiConference North America 2019](https://wikiconference.org/wiki/2019/Main_Page). Thanks to [Andrew Lih](https://twitter.com/fuzheado) for the idea!

## Setup

This is a single page app built with [svelte](https://svelte.dev/).

### Get started

Install the dependencies:

```bash
cd source-debug
npm install
```

Then start Rollup:

```bash
npm run dev
```

## How does it work?

The tool is built on the APIs that power [Citoid](https://www.mediawiki.org/wiki/Citoid):

It fetches citation data from the [getCitation query](https://en.wikipedia.org/api/rest_v1/#/Citation/getCitation) in Wikimedia's REST API. This service uses Zotero translators to parse the source and identify the right template on Wikipedia.  

Then, the tool fetches the template's information from the [templatedata query](https://en.wikipedia.org/w/api.php?action=templatedata&titles=Template:Cite%20web&format=jsonfm) in the Wikipedia API.

## TODOs & ideas
 - [ ] Provide a simple score for a source's coverage (what does an A+ source look like?)
 - [ ] Include all supported languages
 - [ ] Put fields in more logical order (title first?)
 - [ ] Show metadata available from Citoid that isn't included in the template
 - [ ] Generate a citation, for illustration purposes? (there's no convenient API for this, unfortunately)
