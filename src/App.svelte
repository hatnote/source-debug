<script>
	import {querystring, push} from 'svelte-spa-router'
	import {parse} from 'qs'
	import Table from './Table.svelte'
	import {get_template_keys, get_citation, get_template_map} from './utils.js'
	import {supported_languages} from './languages.js'
	let source = parse($querystring).source || ''
	let language = parse($querystring).lang || 'en'
	let template
	let template_map
	
	$: template_map_promise = get_template_map(language).then(data => {
		template_map = data
		return data
	})
	$: source_promise = get_citation(source).then(data => {
		if (data[0]) {
			var item_type = data[0].itemType
			template = template_map[item_type]

		}
		return data
	})

	$: template_promise = get_template_keys(language, 'Template:' + template)

	$: push('/?lang=' + language + '&source=' + source)

</script>

<style>
	:global(body) {
		line-height: 1.5em;
		
	}
	:global(a, a:visited) {
		color: #181b1f;
		text-decoration: none;
    background-image: linear-gradient(to bottom, #03a9f4 50%, #03a9f4 50%);
    background-repeat: repeat-x;
    background-size: 1px 2px;
    background-position: 0 100%;
    transition: color 1s ease;
	}
	:global(a:hover) {
		text-decoration: none;
		color: #03a9f4;
		transition: color 1s ease;
	}
	input {
		width: 100%;
	}
	label {
		font-weight: bold
	}
	li {
		margin-bottom: 0.2em;
	}
	h2 {
		padding: 1em 0 0 0;
		border-top: 7px solid #181b1f;
	}
	.body {
		max-width: 600px;
		margin: 5em auto;
		border-radius: 5px;
		border: 1px solid #c4cdd4;
		padding: 1em;
	}
	.loading {
		padding: 5em;
		text-align: center;
		border-top: 7px solid #181b1f;
	}
</style>

<svelte:head>
  <title>Wikipedia Source Debug Tool</title>
  <meta name="description" content="A validation tool for Wikipedia sources" />
</svelte:head>

<div class="body">
<h1>
	Wikipedia Source Debug Tool
</h1>

<p>Use this debug tool to see what information <a href="https://www.mediawiki.org/wiki/Citoid">Citoid</a> can detect when generating a Wikipedia citation. Provide your URL, DOI, ISBN, PMC/PMID, QID, title, or citation.</p>
<div class="search">
	<label>Source</label>
	<input bind:value={source} >	
	<label>Wikipedia Langauge:</label>
	<select bind:value={language}>
		{#each supported_languages as supported_language}
		<option value="{supported_language.code}">{supported_language.name}</option>
		{/each}
	</select>
</div>

{#await template_map_promise}
<p class="loading">
	...loading template_map for {language}
</p>
{:then d_template_map}
	{#await source_promise}
		<p class="loading">
			...loading source data for {source}
		</p>
		{:then data}
			{#if source}
				{#await template_promise}
				<p class="loading">
					...loading template data for {template}
				</p>
				{:then keys}
						<h2>Detected: {data[0].itemType} / Template:{template}</h2>
						<h3>Available data</h3>
						<Table data={data[0]} {keys}/>

						<h3>Missing data</h3>
						<p>Supporting more, relevant fields will produce better citations on Wikipedia. Fields supported by <a href="https://{language}.wikipedia.org/wiki/Template:{template}">{template}</a> ({language}) and missing from this source:
	</p>
						<ul>
						{#each keys as key}
								{#if data && !Object.keys(data[0]).includes(key)}
										<li>{key}</li>
								{/if}
						{/each}
						</ul>
				<h2>How can I improve this source on Wikipedia?</h2>
	<p>Did you notice something wrong? Are there relevant fields that aren't included?</p>
	<ul>
		<li>Make the source Zotero-compatible: <a href="https://www.zotero.org/support/dev/exposing_metadata">learn more about adding or fixing Zotero metadata</a>.</li>
		<li>Improve the Zotero translator for this source: <a href="https://github.com/wikimedia/mediawiki-services-zotero-translators">see the source code for Wikipedia's Zotero service</a>, and see Wikimedia's <a href="https://www.mediawiki.org/wiki/Citoid/Creating_Zotero_translators">guide for creating Zotero translators</a>.</li>
	</ul>
				{:catch error}
					{error}
				{/await}
			{/if}
	{:catch error}
		{error}
	{/await}
{:catch error}
	{error}
{/await}
<h2>
	About
</h2>
<p>
	The source code is available on github. This tool was built by <a href="https://github.com/slaporte">Stephen LaPorte</a> at <a href="https://wikiconference.org/wiki/2019/Main_Page">WikiConference North America 2019</a>. Thanks to <a href="https://twitter.com/fuzheado">@fuzheado</a> for the idea.
</p>
	</div>